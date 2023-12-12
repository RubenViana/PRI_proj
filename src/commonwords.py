import pandas as pd
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from collections import Counter


df = pd.read_csv('src/updated_dataset.csv')

nltk.download('stopwords')
nltk.download('punkt')

# Step 3: Preprocess the text data
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    words = word_tokenize(text.lower())
    words = [word for word in words if word.isalpha() and word not in stop_words]
    return words

df['cleaned_reviews'] = df['review'].apply(preprocess_text)

# Step 4: Count the words
all_words = [word for review_words in df['cleaned_reviews'] for word in review_words]
word_counts = Counter(all_words)

# Step 5: Get the most common words
common_words = word_counts.most_common(50)  # You can adjust the number as per your preference

# Step 6: Print or visualize the results
for word, count in common_words:
    print(f'{word}: {count}')