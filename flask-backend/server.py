from flask import Flask, jsonify, stream_with_context, Response
import sys
sys.path.append('./temporal-profile/')
import models

app = Flask(__name__)

@app.route("/")
def hello():
    html = "<h3>Hello, World!</h3>"
    return html

@app.route("/graphData")
def graphData():
    model = models.Teachable_AI('./temporal-profile/config.json')
    return Response(stream_with_context(model.run()))

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8000)
