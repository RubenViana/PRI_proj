from evaluation import EvaluateQuery
import requests
import os
from sentence_transformers import SentenceTransformer

def solr_knn_query(endpoint, collection, text):

    # Convert text to embedding
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embedding = model.encode(text, convert_to_tensor=False).tolist()
    embedding_str = "[" + ",".join(map(str, embedding)) + "]"

    search_query = "name:" + text + " winery:" + text + " region:" + text + " type_and_color:" + text + " review:" + text + " reviewer:" + text

    # Perform Solr KNN query
    url = f"{endpoint}/{collection}/select"

    semantic_search = "{!knn f=vector topK=100}" + embedding_str
    query = search_query + " " + semantic_search

    solr_data = {
        "q": query,
        "wt": "json",
        "q.op": "OR",
        "rows": 100
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    try:
        response = requests.post(url, data=solr_data, headers=headers)
        response.raise_for_status()

        return (response.json())
    except requests.HTTPError as e:
        return ({"error": f"Error {e.response.status_code}: {e.response.text}"}), 500



query = {
    "./q1/qrels.txt" : "sleeking finish",
    "./q2/qrels.txt" : "with cherry flavors",
    # "./q3/qrels.txt" : "http://localhost:8983/solr/wines_filterless/select?defType=lucene&indent=true&q.op=AND&q=review%3A%20%22sleeking%20finish%22&rows=20",
    # "./q4/qrels.txt" : "http://localhost:8983/solr/wines_filterless/select?defType=lucene&indent=true&q.op=OR&q=(review%3A%20%22sleeking%20finish%22~5)%5E4&rows=20",
    # "./q5/qrels.txt" :
}

results_dict = {}

# create 

for qrels, text in query.items():
    # Read qrels to extract relevant documents
    # Get query results from Solr instance
    results = solr_knn_query('http://localhost:8983/solr', 'wines_semantic', text)['response']['docs']

    results = [x['wine_id'] for x in results]

    results_dict[qrels[2:3]] = results

    relevant = list(map(lambda el: el.strip(), open(qrels).readlines()))

    qe = EvaluateQuery(results, relevant)
    path = f'semantic/{qrels[2:4]}'

    if not os.path.isdir(path):
        os.makedirs(path)

    qe.export_metrics(path)
    qe.plot_precision_recall(path)