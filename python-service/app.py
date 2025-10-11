from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "Python backend is running successfully!"})

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Test API working!"})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
