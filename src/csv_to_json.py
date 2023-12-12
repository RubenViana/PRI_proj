import csv
import json

csv_file_path = 'updated_dataset.csv'
json_file_path = '../data/wines.json'

# Read CSV and convert to JSON with explicit encoding
csv_data = []
with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        csv_data.append(row)

# Write JSON file with explicit encoding
with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(csv_data, json_file, indent=2, ensure_ascii=False)

print(f'Conversion complete. JSON file saved at: {json_file_path}')