from flask import Flask, request, jsonify
import numpy as np
import ast
import os

app = Flask(__name__)

# Your Python logic from the provided script
def load_params(root):
    weights = []
    biases = []
    with open(os.path.join(root, 'weights.txt'), 'r') as f:
        for line in f:
            weights.append(np.array(ast.literal_eval(line)))
    with open(os.path.join(root, 'biases.txt'), 'r') as f:
        for line in f:
            biases.append(np.array(ast.literal_eval(line)))
    return weights, biases

def lrelu(x):
    return np.maximum(0.1 * x, x)

def softmax(x):
    return np.exp(x) / np.sum(np.exp(x))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['image']
    w, b = load_params(os.path.dirname(__file__))

    a1 = lrelu(np.array([data]) @ w[0] + b[0])
    a2 = lrelu(a1 @ w[1] + b[1])
    a3 = lrelu(a2 @ w[2] + b[2])

    result = {'norm': a3.tolist(), 'pred': int(np.argmax(a3)), 'prob': softmax(a3).tolist()}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
