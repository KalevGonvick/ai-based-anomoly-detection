# The Docker image contains the following code in app.py
from flask import Flask
import os
import socket
import numpy as np
import csv
import pandas as pd
import h5py
import json

app = Flask(__name__)


@app.route("/")
def hello():
    html = "<h3>Hello, World!</h3>"
    return html

# get the configuration file so as to have access to the parameters
params = 'config.json'  # change to appropriate directory
if os.path.isfile(params):
    params = json.load(open(params, mode='r'))
data_path = params['data-path']  # directory to load data from

def vectorize_data():
    """A function to store the data in the format we want"""
    x_window = params['x-window']  # input timesteps
    y_window = params['y-window']  # output timesteps
    # get a list of the file-names containing the dataset
    file_names = params['file-names']
    assert x_window >= 1, "Input timesteps X window must be >= 1"
    assert y_window >= 1, "Prediction steps Y window must be >= 1"
    # fetch the name of the databases to store the vectorized data
    # this assumes multiple experiments in with same order as filenames to be stored as used in this demo
    db_name = list(params['exp-name'].values())
    # iterate through each experiment or profile. No need for a loop if a single experiment is being analyzed
    for idx, item in enumerate(file_names):
        in_var = os.path.join(data_path, item)
        # read the instruction count column
        input_df = pd.read_csv(in_var, dtype='float64', header=0, usecols=[0])
        input_list = input_df.values.tolist()
        # check the dimensions
        num_rows = np.array(input_list).shape[0]
        input_data = []
        target_data = []
        index = 0
        while (index + x_window + y_window) <= num_rows:
            input_window_data = input_list[index:(index + x_window)]
            target_window_data = input_list[(
                index + x_window): (index + x_window + y_window)]
            input_data.append(input_window_data)
            target_data.append(target_window_data)
            index += y_window  # move one output timestep ahead
        print(f'>>> Done vectorizing: {item} <<<')
        input_data = np.array(input_data)
        target_data = np.array(target_data)
        print(
            f'>>> sample input:{input_data[0:2]}\n>>> Sample target: {target_data[0:2]}')
        n_features = params['num-features']
        input_data = np.reshape(
            input_data, (input_data.shape[0], x_window, n_features))
        target_data = np.reshape(
            target_data, (target_data.shape[0], target_data.shape[1]))
        print(f'>>> Done reshaping: {item}. About to store in database')
        print(
            f'>>> Input shape: {input_data.shape} <<<\n>>> Target data shape:{target_data.shape} <<<')
        with h5py.File(db_name[idx], 'w') as db:
            x_input = db.create_dataset(
                "input", shape=input_data.shape, dtype=np.int32)
            x_input[:] = input_data
            y_target = db.create_dataset(
                "target", shape=target_data.shape, dtype=np.int32)
            y_target[:] = target_data
            print(
                f'>>> {item} data stored successfully in: {db_name[idx]} <<<')
            print(
                f'>>> stored sample: {input_data[0]}<<<\n>>>{target_data[0]} <<<')
    return


def load_data(exp_name):
    """Load data from the database"""
    # change path accordingly
    # retrieve the name of specific database required
    xy_db = params['exp-name'][exp_name]
    input_name = params['input-name']
    target_name = params['target-name']
    #n_features = params['num-features']
    with h5py.File(xy_db, 'r') as db:
        #index = start_index
        input_data = db[input_name][:]
        target_data = db[target_name][:]
        return (input_data, target_data)


def regression_error(prediction, target, window):
    n_data = len(target)
    count = 0
    errors = []
    while count + window <= n_data:
        error = [abs(y_pred-y_truth) for y_pred, y_truth in zip(
            prediction[count:count+window], target[count:count+window])]
        errors.append(np.mean(error))
        count += window
    return errors

def chebyshev_probability(average,varianse,error_val):
    probability = []
    for val in error_val:
        if val-average >= 1:
            prob = varianse/((val-average)**2)
            probability.append(prob)
    return probability
# % run to make sure nothing breaks
#vectorize_data()


if __name__ == "__main__":
  app.run(host='0.0.0.0', port=80)
