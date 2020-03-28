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

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=80)
