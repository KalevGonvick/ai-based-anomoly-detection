'''
@arthur: Okwudili Ezeme
@date: 2020-03-06
'''
from __future__ import print_function
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, LSTM, Dense, Add, Concatenate
import os
import numpy as np
import json
import h5py
from util import load_data
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.optimizers import Adam
from tensorflow.keras import regularizers

# load the settings file
kernel_regularizer = regularizers.l1_l2(l1=0.01, l2=0.01)
params = 'config.json'
if os.path.isfile(params):
    params = json.load(open(params, mode='r'))
batch_size = params['batch-size']  # Batch size for training.
epochs = params['epochs']  # Number of epochs to train for.
num_cells_input = params['input-num-units']
timesteps = params['x-window']
n_features = params['y-window']
optimizer = Adam(lr=0.0001)
train_test_split = params["train-size"]
batch_size = params['batch-size']
file_name = params['exp-name']['normal']
input_name = params['input-name']


def fit_model(X, Y):
    """Fit the models using this convenient function"""
    earlystopping = EarlyStopping(
        monitor='val_accuracy', min_delta=0, patience=30, verbose=0, mode='auto')
    model = rnn_model()
    history = model.fit(x=X, y=Y, epochs=epochs, verbose=2,
                        shuffle=True, batch_size=batch_size, callbacks=[earlystopping],
                        validation_split=0.1)
    model_file = params['model-weights']
    model.save(model_file)
    print(f'>>> model saved in: {model_file} <<<')
    return model, history


def rnn_model():
    """Build the model architecture"""
    input_1 = Input(shape=(timesteps, n_features), name='input_1')
    input_lstm_1 = LSTM(num_cells_input, return_sequences=False, recurrent_dropout=0,
                        activation='relu', kernel_regularizer=kernel_regularizer,
                        go_backwards=True, name='input_lstm_1')
    lstm_1_output = input_lstm_1(input_1)
    input_lstm_2 = LSTM(num_cells_input, return_sequences=False, recurrent_dropout=0,
                        activation='relu', kernel_regularizer=kernel_regularizer, name='input_lstm_2')
    lstm_2_output = input_lstm_2(input_1)
    dense_input = Concatenate(axis=-1)([lstm_1_output, lstm_2_output])
    dense = Dense(n_features, kernel_regularizer=kernel_regularizer,
                  name='dense_output_1')
    dense_output_1 = dense(dense_input)
    model = Model(input_1, dense_output_1)
    # plot the model
    # plot_model(model, to_file='model.png', show_shapes=True)
    model.compile(optimizer=optimizer,
                  loss='mse', metrics=['accuracy'])
    return model
