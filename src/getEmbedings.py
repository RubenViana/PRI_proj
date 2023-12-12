import sys
import json
from sentence_transformers import SentenceTransformer

# Load the SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embedding(text):
    # The model.encode() method already returns a list of floats
    return model.encode(text, convert_to_tensor=False).tolist()

if __name__ == "__main__":
    # Read JSON from STDIN
    data = json.load(sys.stdin)

    # Update each document in the JSON data
    for document in data:
        # Extract fields if they exist, otherwise default to empty strings
        name = document.get("name", "")
        winery = document.get("winery", "")
        region = document.get("region", "")
        type_and_color = document.get("type_and_color", "")
        primary_grape = document.get("primary_grape", "")
        review = document.get("review", "")
        reviewer = document.get("reviewer", "")
        reviewer_info = document.get("reviewer_info", "")


        combined_text = name + " " + winery + " " + region + " " + type_and_color + " " + primary_grape + " " + review + " " + reviewer + " " + reviewer_info
        document["vector"] = get_embedding(combined_text)

    # Output updated JSON to STDOUT
    json.dump(data, sys.stdout, indent=4, ensure_ascii=False)
