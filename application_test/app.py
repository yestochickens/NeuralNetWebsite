from flask import Flask, request, jsonify, render_template

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

@app.route('/docs')
def docs():
    return render_template('docs.html')

@app.route('/howItWorks')
def howItWorks():
    return render_template('howItWorks.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)