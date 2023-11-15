from evaluation import EvaluateQuery
import requests
import os

QRELS_FILE = "./q2/qrels.txt"

query = {
    "sys1" : "http://localhost:8983/solr/wines/select?defType=edismax&fq=(price%3A%5B*%20TO%2020%5D)&fq=(score%3A%5B90%20TO%20*%5D)&indent=true&q.op=AND&q=(reviewer_info%3Asenior)%20(reviewer_info%3Aeditor)&rows=20",
    "sys2" : "http://localhost:8983/solr/wines/select?bq=date%3A%20%5B2021%20TO%202023%5D&defType=edismax&fq=(price%3A%5B*%20TO%2020%5D)&fq=(score%3A%5B90%20TO%20*%5D)&indent=true&q.op=AND&q=(reviewer_info%3Asenior)%20(reviewer_info%3Aeditor)&rows=20",
    "sys3" : "http://localhost:8983/solr/wines_schemaless/select?defType=edismax&fq=(price%3A%5B*%20TO%2020%5D)&fq=(score%3A%5B90%20TO%20*%5D)&indent=true&q.op=AND&q=(reviewer_info%3Asenior)%20(reviewer_info%3Aeditor)&rows=20",
    "sys4" : "http://localhost:8983/solr/wines_schemaless/select?bq=date%3A%20%5B2021%20TO%202023%5D&defType=edismax&fq=(price%3A%5B*%20TO%2020%5D)&fq=(score%3A%5B90%20TO%20*%5D)&indent=true&q.op=AND&q=(reviewer_info%3Asenior)%20(reviewer_info%3Aeditor)&rows=20"
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
    path = f'q2/{system}'

    if not os.path.isdir(path):
        os.makedirs(path)

    qe.export_metrics(path)
    qe.plot_precision_recall(path)