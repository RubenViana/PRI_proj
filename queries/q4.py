from evaluation import EvaluateQuery
import requests
import os

QRELS_FILE = "./q4/qrels.txt"

query = {
    "sys1" : "http://localhost:8983/solr/wines/select?defType=lucene&indent=true&q.op=OR&q=region%3A%20rohne&rows=20",
    "sys2" : "http://localhost:8983/solr/wines/select?defType=lucene&indent=true&q.op=OR&q=region%3A%20rohne~1&rows=20"
}

relevant = list(map(lambda el: el.strip(), open(QRELS_FILE).readlines()))

results_dict = {}

# create 

for system, url in query.items():
    # Read qrels to extract relevant documents
    # Get query results from Solr instance
    results = requests.get(url).json()['response']['docs']

    results = [x['id'] for x in results]

    results_dict[system] = results

    qe = EvaluateQuery(results, relevant)
    path = f'q4/{system}'

    if not os.path.isdir(path):
        os.makedirs(path)

    qe.export_metrics(path)
    qe.plot_precision_recall(path)