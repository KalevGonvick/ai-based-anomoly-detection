'''
@arthur: Okwudili Ezeme
@date: 2020-03-06
'''
#%%
from __future__ import print_function
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, LSTM, Dense, Add, Concatenate
import os
import numpy as np
import pandas as pd
import json
import h5py
import tensorflow as tf
from util import Utils_Teachable_AI
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.optimizers import Adam
from tensorflow.keras import regularizers
from sklearn.model_selection import train_test_split


class Teachable_AI(object):
    def __init__(self, config_filename, train=False):
        # load the settings file and initialize parameters
        self.kernel_regularizer = regularizers.l1_l2(l1=0.01, l2=0.01)
        if os.path.isfile(config_filename):
            self.params = json.load(open(config_filename, mode='r'))
        self.batch_size = self.params['batch-size']  # Batch size for training.
        self.epochs = self.params['epochs']  # Number of epochs to train for.
        self.num_cells_input = self.params['input-num-units']
        self.timesteps = self.params['x-window']
        self.n_features = self.params['y-window']
        self.optimizer = Adam(lr=0.0001)
        self.train_size = self.params["train-size"]
        self.file_name = self.params['exp-name']['normal']
        self.input_name = self.params['input-name']
        self.history = None
        self.train = train
        # load the dataset path
        self.utils = Utils_Teachable_AI(self.params, 'data-path')
        # load the model
        self.model = self.rnn_model()
        if self.train == False:
            # load our previously trainined model weights
            self.model.load_weights(self.params['model-weights'])

    def fit_model(self, X, Y):
        """Fit the models using this convenient function"""
        earlystopping = EarlyStopping(
            monitor='val_accuracy', min_delta=0, patience=30, verbose=0, mode='auto')
        history = self.model.fit(x=X, y=Y, epochs=self.epochs, verbose=2,
                                 shuffle=True, batch_size=self.batch_size, callbacks=[earlystopping],
                                 validation_split=0.1)
        model_filename = self.params['model']
        self.model.save(model_filename)
        # print(f'>>> model saved in: {model_filename} <<<')
        return history

    def rnn_model(self):
        """Build the model architecture"""
        input_1 = Input(
            shape=(self.timesteps, self.n_features), name='input_1')
        input_lstm_1 = LSTM(self.num_cells_input, return_sequences=False, recurrent_dropout=0,
                            activation='relu', kernel_regularizer=self.kernel_regularizer,
                            go_backwards=True, name='input_lstm_1')
        lstm_1_output = input_lstm_1(input_1)
        input_lstm_2 = LSTM(self.num_cells_input, return_sequences=False, recurrent_dropout=0,
                            activation='relu', kernel_regularizer=self.kernel_regularizer, name='input_lstm_2')
        lstm_2_output = input_lstm_2(input_1)
        dense_input = Concatenate(axis=-1)([lstm_1_output, lstm_2_output])
        dense = Dense(self.n_features, kernel_regularizer=self.kernel_regularizer,
                      name='dense_output_1')
        dense_output_1 = dense(dense_input)
        model = Model(input_1, dense_output_1)
        # plot the model
        # plot_model(model, to_file='model.png', show_shapes=True)
        model.compile(optimizer=self.optimizer,
                      loss='mse', metrics=['accuracy'])
        return model

    def run(self):
        print("---------Running--------")
        # load the normal data
        X, Y = self.utils.load_data("normal")
        X_train, X_test, Y_train, Y_test = train_test_split(
            X, Y, train_size=self.train_size, random_state=50)
        X_train, X_test = tf.cast(X_train,tf.float32), tf.cast(X_test, tf.float32)
        """
        I read this data here so that I can divide it into chunks and process them
        seperately. This allows us to return chunks of results at a time to
        generate a "live" graph of the neural network
        """
        # the data from delay.csv and random.csv seperated into input and target
        X_d, Y_d = self.utils.load_data('delay')
        X_r, Y_r = self.utils.load_data('random')
        print(Y_d)
        # number of chunks we split our data into
        num_chunk = 10
        # arrays that hold the chunks of data
        X_test_split = np.array_split(X_test, num_chunk)
        Y_test_split = np.array_split(Y_test, num_chunk)
        X_d_split = np.array_split(X_d, num_chunk)
        Y_d_split = np.array_split(Y_d, num_chunk)
        X_r_split = np.array_split(X_r, num_chunk)
        Y_r_split = np.array_split(Y_r, num_chunk)

        # array that holds dictionaries with each chunk needed for the neural net
        chunked_data = []
        for i in range(num_chunk):
            chunked_data.append({
                'X_test': tf.cast(X_test_split[i],tf.float32),
                'Y_test': Y_test_split[i],
                'X_d': X_d_split[i],
                'Y_d': Y_d_split[i],
                'X_r': X_r_split[i],
                'Y_r': Y_r_split[i]
            })

        if self.train:  # train the model if the user selected to train
            print("---------Training--------")
            history = self.fit_model(X_train, Y_train)
            # we are done training. The model is saved. Lets visualize results
            history_dataframe = pd.DataFrame.from_dict(history.history)
            # please refer to cell 6 of the jupyter notebook for the plot
            # or you can stream the values in your own module which yuu have been creating.
            print("--------Training Done---------")
        else:  # we are testing and not training
            test_chunk = chunked_data[0]
            graph_data = {}
            print("---------Testing----------")
            # test our model on the normal test data
            n_predictions = self.model.predict(test_chunk['X_test'])
            # flatten the predictions
            n_predictions = n_predictions.flatten()
            # round the output to integers
            n_predicted = [round(val) for val in n_predictions]
            n_target = test_chunk['Y_test'].flatten()  # flatten target to single array too
            # refer to cell 10 of the jupyter notebook for plotting or you can stream
            # the values using your own visualization tool we talked about before
            graph_data['n_predicted'] = n_predicted
            graph_data['n_target'] = n_target

            # test for the delay profile
            # d_predicted, d_target = self.test('delay')
            d_predicted, d_target = self.test(test_chunk['X_d'], test_chunk['Y_d'])
            # again, refer to cell 13 of the jupyter notebook for plotting or stream the values
            graph_data['d_predicted'] = d_predicted
            graph_data['d_target'] = d_target

            # test for random profile
            # r_predicted, r_target = self.test('random')
            r_predicted, r_target = self.test(test_chunk['X_r'], test_chunk['Y_r'])
            # again, refer to cell 16 of the jupyter notebook for plotting or stream the values
            graph_data['r_predicted'] = r_predicted
            graph_data['r_target'] = r_target

            # compute the normal profile errors
            n_errors = self.utils.regression_error(n_predicted, n_target)
            graph_data['n_errors'] = n_errors
            # compute delay profile error
            d_errors = self.utils.regression_error(d_predicted, d_target)
            graph_data['d_errors'] = d_errors
            # compute random profile error
            r_errors = self.utils.regression_error(r_predicted, r_target)
            graph_data['r_errors'] = r_errors
            # refer to cell 18 for the plot of this outputs or stream using your module

            # compute chebyshev probability
            # from normal profile validation data
            mu, variance = np.mean(n_errors), np.var(n_errors)
            # compute the probability for the random and delay profile
            r_prob = self.utils.chebyshev_probability(mu, variance, r_errors)
            graph_data['r_prob'] = r_prob
            d_prob = self.utils.chebyshev_probability(mu, variance, d_errors)
            graph_data['d_prob'] = d_prob
            # refer to cell 20 of the jupyter notebook
            # for the plot or stream using your module
            return graph_data

    # def test(self, experiment_name):
    #     # a handy function for testing any of the profile
    #     X, Y = self.utils.load_data(experiment_name)
    #     X = tf.cast(X, tf.float32)
    #     predicted = self.model.predict(X, verbose=0).flatten()
    #     # round to integers
    #     predicted = [round(val) for val in predicted]
    #     target = Y.flatten()
    #     return predicted, target

    """
    This is a modified version of the above test function. I removed the
    load_data call to make the function more concise and allow
    me too process chunks of the data instead of the whole set all at once
    """
    def test(self, X, Y):
        X = tf.cast(X, tf.float32)
        predicted = self.model.predict(X, verbose=0).flatten()
        # round to integers
        predicted = [round(val) for val in predicted]
        target = Y.flatten()
        return predicted, target

# test the run function
# model = Teachable_AI('config.json')
# model.run()
