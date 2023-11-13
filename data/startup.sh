#!/bin/bash

# This script expects a container started with the following command
#docker run -p 8983:8983 --name wines_solr -v ${PWD}:/data -d solr:9.3 solr-precreate wines

# Schema definition via API
curl -X POST -H 'Content-type:application/json' \
    --data-binary "@./schema.json" \
    http://localhost:8983/solr/wines/schema

# Populate collection
curl -X POST -H 'Content-type:application/json' \
    --data-binary "@./wines.json" \
    http://localhost:8983/solr/wines/update?commit=true 
