from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Dummy dictionary (for now)
dictionary = {
    "artificial": {
        "english": "made by humans, not natural",
        "hindi": "कृत्रिम"
    },
    "intelligence": {
        "english": "ability to learn and understand",
        "hindi": "बुद्धिमत्ता"
    },
    "learning": {
        "english": "gaining knowledge",
        "hindi": "सीखना"
    }
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/meaning', methods=['POST'])
def meaning():
    word = request.json['word'].lower()

    data = dictionary.get(word, {
        "english": "Not found",
        "hindi": "नहीं मिला"
    })

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)