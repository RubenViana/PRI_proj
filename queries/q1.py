from evaluation import EvaluateQuery
import requests
import os

QRELS_FILE = "./q1/qrels.txt"

query = {
    "sys1" : "http://localhost:8983/solr/wines/select?defType=lucene&indent=true&q.op=AND&q=review%3A%20%22sleeking%20finish%22&rows=20",
    "sys2" : "http://localhost:8983/solr/wines/select?defType=lucene&indent=true&q.op=AND&q=review%3A%20%22sleeking%20finish%22~5&rows=20",
    "sys3" : "http://localhost:8983/solr/wines_schemaless/select?defType=lucene&indent=true&q.op=AND&q=review%3A%20%22sleeking%20finish%22&rows=20",
    "sys4" : "http://localhost:8983/solr/wines_schemaless/select?defType=lucene&indent=true&q.op=AND&q=review%3A%20%22sleeking%20finish%22~5&rows=20"
}

relevant = list(map(lambda el: el.strip(), open(QRELS_FILE).readlines()))

results_dict = {}

# create 

for system, url in query.items():
    # Read qrels to extract relevant documents
    # Get query results from Solr instance
    results = requests.get(url).json()['response']['docs']

    results = [x['wine_id'] for x in results]

    results_dict[system] = results

    qe = EvaluateQuery(results, relevant)
    path = f'q1/{system}'

    if not os.path.isdir(path):
        os.makedirs(path)

    qe.export_metrics(path)
    qe.plot_precision_recall(path)