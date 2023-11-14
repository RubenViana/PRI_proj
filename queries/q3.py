from evaluation import EvaluateQuery
import requests
import os

QRELS_FILE = "./q3/qrels.txt"

query = {
    "sys1" : "http://localhost:8983/solr/wines/select?defType=lucene&indent=true&q.op=OR&q=(review%3A%20pinot%20AND%20review%3A%20noir)%20(primary_grape%3A%20pinot%20AND%20primary_grape%3A%20noir)%20(name%3A%20pinot%20AND%20name%3A%20noir)&rows=20",
    "sys2" : "http://localhost:8983/solr/wines/select?defType=lucene&indent=true&q.op=OR&q=(review%3A%20pinot%20AND%20review%3A%20noir)%20(primary_grape%3A%20pinot%20AND%20primary_grape%3A%20noir)%5E4%20(name%3A%20pinot%20AND%20name%3A%20noir)&rows=20"
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
    path = f'q3/{system}'

    if not os.path.isdir(path):
        os.makedirs(path)

    qe.export_metrics(path)
    qe.plot_precision_recall(path)