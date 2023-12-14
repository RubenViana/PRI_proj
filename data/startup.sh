#!/bin/bash

# This script expects a container started with the following command
# docker run -p 8983:8983 --name wines_solr -v ${PWD}:/data -d solr:9.3 solr-precreate wines_semantic

# Create Core
# docker exec -it wines_solr bin/solr create_core -c wines_semantic

# Allow time for the core to be created before proceeding
sleep 5

# Upload Synonyms
docker cp ./synonyms.txt wines_solr:/var/solr/data/wines_semantic/conf/synonyms.txt

# Upload Stopwords
docker cp ./stopwords.txt wines_solr:/var/solr/data/wines_semantic/conf/stopwords.txt

# Schema definition via API
curl -X POST -H 'Content-type:application/json' \
    --data-binary "@./semantic_schema.json" \
    http://localhost:8983/solr/wines_semantic/schema

# Populate collection
curl -X POST -H 'Content-type:application/json' \
    --data-binary "@./semantic_wines.json" \
    http://localhost:8983/solr/wines_semantic/update?commit=true 

# Add suggester component
curl -X POST -H 'Content-type:application/json'  -d '{
  "add-searchcomponent": {
    "name": "suggest",
    "class": "solr.SuggestComponent",
    "suggester": {
        "name": "winesSuggester",
        "lookupImpl": "FreeTextLookupFactory",
        "dictionaryImpl": "DocumentDictionaryFactory",
        "field": "name_suggest",
        "suggestFreeTextAnalyzerFieldType": "basicText",
        "exactMatchFirst": "true",
        "buildOnStartup": "true"
    }
  }
}' http://localhost:8983/solr/wines_semantic/config

# Add suggester request handler
curl -X POST -H 'Content-type:application/json'  -d '{
  "add-requesthandler": {
    "name": "/suggest",
    "class": "solr.SearchHandler",
    "startup": "lazy",
    "defaults": {
        "suggest": "true",
        "suggest.count": 10,
        "suggest.dictionary": "winesSuggester"
    },
    "components": [
        "suggest"
    ]
  }
}' http://localhost:8983/solr/wines_semantic/config
