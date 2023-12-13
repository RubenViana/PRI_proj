from flask import Flask, request, jsonify
# from sentence_transformers import SentenceTransformer
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# @app.route('/api/solr_knn_query', methods=['GET'])
# def solr_knn_query():
#     data = request.get_json()
#     endpoint = data['endpoint']
#     collection = data['collection']
#     text = data['text']

#     # Convert text to embedding
#     model = SentenceTransformer('all-MiniLM-L6-v2')
#     embedding = model.encode(text, convert_to_tensor=False).tolist()
#     embedding_str = "[" + ",".join(map(str, embedding)) + "]"

#     # Perform Solr KNN query
#     url = f"{endpoint}/{collection}/select"

#     solr_data = {
#         "q": f"{{!knn f=vector topK=10}}{embedding_str}",
#         "fl": "wine_id, name, score",
#         "wt": "json"
#     }

#     headers = {
#         "Content-Type": "application/x-www-form-urlencoded"
#     }

#     try:
#         response = requests.post(url, data=solr_data, headers=headers)
#         response.raise_for_status()
#         return jsonify(response.json())
#     except requests.HTTPError as e:
#         return jsonify({"error": f"Error {e.response.status_code}: {e.response.text}"}), 500


@app.route('/api/solr_query', methods=['POST'])
def solr_query():
    data = request.get_json()
    collection = data['collection']
    text = data['text']
    endpoint = "http://localhost:8983/solr"

    # Perform Solr query
    url = f"{endpoint}/{collection}/query"

    solr_data = {
        "q": "name:" + text,
        "wt": "json",
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

if __name__ == '__main__':
    app.run(debug=True)