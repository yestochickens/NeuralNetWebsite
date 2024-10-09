from flask import Flask, request, jsonify, render_template
from preload_forward import main

app = Flask(__name__)

@app.route('/')
def default():
    return render_template('home.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/demo')
def demo():
    return render_template('demo.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/math')
def math():
    return render_template('math.html')

@app.route('/howItWorks')
def howItWorks():
    return render_template('howItWorks.html')

@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.json.get('pictureArr')
    returnPictureData = main(data)
    return jsonify(returnPictureData)

if __name__ == '__main__':
    app.run(app.run(host='45.63.57.237', port=5001))