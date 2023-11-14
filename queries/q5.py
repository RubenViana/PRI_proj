from evaluation import EvaluateQuery
import requests
import os

QRELS_FILE = "./q5/qrels.txt"

query = {
    "sys1" : "http://localhost:8983/solr/wines/select?defType=lucene&indent=true&q.op=OR&q=(type_and_color%3A%20red%20AND%20type_and_color%3A%20still%20AND%20review%3A%20balanced)%20(type_and_color%3A%20white%20AND%20type_and_color%3A%20still%20AND%20review%3A%20dry)&rows=20",
    "sys2" : "http://localhost:8983/solr/wines/select?defType=lucene&indent=true&q.op=OR&q=(type_and_color%3A%20red%20AND%20type_and_color%3A%20still%20AND%20review%3A%20balanced%5E4)%20(type_and_color%3A%20white%20AND%20type_and_color%3A%20still%20AND%20review%3A%20dry)&rows=20"
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
    path = f'q5/{system}'

    if not os.path.isdir(path):
        os.makedirs(path)

    qe.export_metrics(path)
    qe.plot_precision_recall(path)