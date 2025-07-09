
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/suggestions', methods=['POST'])
def suggest():
    data = request.json
    # Placeholder analysis
    return jsonify(["Try reducing Food spending.", "Travel increased by 40%."])

if __name__ == '__main__':
    app.run(debug=True)
