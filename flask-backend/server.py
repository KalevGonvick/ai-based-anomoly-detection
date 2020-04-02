from flask import Flask, jsonify, stream_with_context, Response
from flask_socketio import send, emit, SocketIO
import sys
sys.path.append('./temporal-profile/')
import models

app = Flask(__name__)
socketio = SocketIO(app)

@app.route("/")
def hello():
    html = "<h3>Hello, World!</h3>"
    return html

@app.route("/graphData")
def graphData():
    model = models.Teachable_AI('./temporal-profile/config.json')
    return Response(stream_with_context(model.run()))

@socketio.on('anomaly-get')
def getData(json):
    model = models.Teachable_AI('./temporal-profile/config.json')
    for chunk in model.run():
        emit('data chunk', chunk)


if __name__ == "__main__":
  socketio.run(app, host='0.0.0.0', port=80)
  # app.run(host='0.0.0.0', port=80)
