from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
import requests
from flask_cors import CORS
import logging

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)


@app.route('/api/solr_knn_query', methods=['GET'])
def solr_knn_query():
    collection = request.args.get('collection')
    text = request.args.get('text')
    endpoint = "http://localhost:8983/solr"

    # Convert text to embedding
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embedding = model.encode(text, convert_to_tensor=False).tolist()
    embedding_str = "[" + ",".join(map(str, embedding)) + "]"

    # Perform Solr KNN query
    url = f"{endpoint}/{collection}/select"

    solr_data = {
        "q": f"{{!knn f=vector topK=100}}{embedding_str}",
        "wt": "json",
        "rows": 5000
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    try:
        response = requests.post(url, data=solr_data, headers=headers)
        response.raise_for_status()
        
        # logging.debug(response.json())

        return (response.json())
    except requests.HTTPError as e:
        return jsonify({"error": f"Error {e.response.status_code}: {e.response.text}"}), 500


@app.route('/api/solr_query', methods=['GET'])
def solr_query():
    collection = request.args.get('collection')
    text = request.args.get('text')
    endpoint = "http://localhost:8983/solr"

    # Perform Solr query
    url = f"{endpoint}/{collection}/query"

    solr_data = {
        "q": "name:" + text + " winery:" + text + " region:" + text + " type_and_color:" + text, #+ " price:" + [text] + " score:" + [text],
        "wt": "json",
        "q.op": "OR",
        "rows": 5000
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    try:
        response = requests.post(url, data=solr_data, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.HTTPError as e:
        return jsonify({"error": f"Error {e.response.status_code}: {e.response.text}"}), 500


@app.route('/api/suggest', methods=['GET'])
def suggest():
    collection = request.args.get('collection')
    text = request.args.get('text')
    endpoint = "http://localhost:8983/solr"

    # Perform Solr query
    url = f"{endpoint}/{collection}/suggest"

    solr_data = {
        "q": text,
        "rows": 5,
        "wt": "json",
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    try:
        response = requests.post(url, data=solr_data, headers=headers)

        result = [
            {
                "value": item["term"]
            }
            for item in response.json()["suggest"]["winesSuggester"][text]["suggestions"]
        ]

        response.raise_for_status()
        return result
    except requests.HTTPError as e:
        return jsonify({"error": f"Error {e.response.status_code}: {e.response.text}"}), 500



if __name__ == '__main__':
    app.run(debug=True) 

