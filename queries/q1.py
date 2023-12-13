from evaluation import EvaluateQuery
import requests
import os

QRELS_FILE = "./q1/qrels.txt"

query = {
    "sys1" : "http://localhost:8983/solr/wines_subset/select?defType=lucene&indent=true&q.op=AND&q=(type_and_color%3A%20red%20AND%20type_and_color%3A%20still)%20((review%3A%20elegant%20OR%20review%3A%20powerful)%20AND%20NOT%20(review%3A%20elegant%20AND%20review%3A%20powerful))&rows=10&useParams=",
    "sys2" : "http://localhost:8983/solr/wines_subset/select?defType=lucene&indent=true&q.op=AND&q=(type_and_color%3A%20red%20AND%20type_and_color%3A%20still)%20((review%3A%20elegant%5E4%20OR%20review%3A%20powerful)%5E4%20AND%20NOT%20(review%3A%20elegant%5E4%20AND%20review%3A%20powerful)%5E4)&rows=10&useParams=",
    "sys3" : "http://localhost:8983/solr/wines_simple_schema_subset/select?defType=lucene&indent=true&q.op=AND&q=(type_and_color%3A%20red%20AND%20type_and_color%3A%20still)%20((review%3A%20elegant%20OR%20review%3A%20powerful)%20AND%20NOT%20(review%3A%20elegant%20AND%20review%3A%20powerful))&rows=10&useParams=",
    "sys4" : "http://localhost:8983/solr/wines_simple_schema_subset/select?defType=lucene&indent=true&q.op=AND&q=(type_and_color%3A%20red%20AND%20type_and_color%3A%20still)%20((review%3A%20elegant%5E4%20OR%20review%3A%20powerful)%5E4%20AND%20NOT%20(review%3A%20elegant%5E4%20AND%20review%3A%20powerful)%5E4)&rows=10&useParams="
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