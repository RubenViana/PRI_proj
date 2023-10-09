import pandas as pd
import matplotlib.pyplot as plt

dataset = pd.read_csv('src/updated_dataset.csv')

def bar_graph(ds, title, xlabel, ylabel):

    graph = ds.plot(kind='bar')

    # Add number to the top of the bar
    bars = graph.patches
    for bar, num in zip(bars, ds):
        graph.text(bar.get_x() + bar.get_width()/2, bar.get_height()+5, num, ha='center')

    plt.title(title)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.savefig('stats/' + title.replace(' ', '_')  + '.png', bbox_inches='tight')
    plt.clf()
    print('Saved ' + title)

# 1. Number of wines per type/region/winery
wine_count_by_type = dataset.groupby('type_and_color')['name'].count()
wine_count_by_region = dataset.groupby('region')['name'].count()
wine_count_by_winery = dataset.groupby('winery')['name'].count()
price_ranges = [0, 50, 100, 150, 200, 250, 300, float('inf')]
dataset['price_range'] = pd.cut(dataset['price'].str.replace('$', '').str.replace(',', '').astype(float), bins=price_ranges)
wines_per_price_range = dataset.groupby('price_range')['name'].count()
wines_per_score = dataset.groupby('score')['name'].count()

# 2. Average score per type/region/winery
avg_score_per_type = dataset.groupby('type_and_color')['score'].mean()
avg_score_per_region = dataset.groupby('region')['score'].mean()
avg_score_per_winery = dataset.groupby('winery')['score'].mean()


# 3. Average price per type/region/winery
dataset['price'] = dataset['price'].str.replace('$', '').str.replace(',', '').astype(float)
avg_price_per_type = dataset.groupby('type_and_color')['price'].mean()
avg_price_per_region = dataset.groupby('region')['price'].mean()
avg_price_per_winery = dataset.groupby('winery')['price'].mean()

# 4. Number of reviewers per number of reviews
reviewers_per_number_of_reviews = dataset.groupby('reviewer')['reviewer_info'].count()

# Print the results
print("\n1. Number of wines per type:")
print(wine_count_by_type)
print("\n1. Number of wines per region:")
print(wine_count_by_region)
print("\n1. Number of wines per winery:")
print(wine_count_by_winery)
print("\n1. Number of wines per price range:")
print(wines_per_price_range)
print("\n1. Number of wines per score:")
print(wines_per_score)

print("2. Average score per type:")
print(avg_score_per_type)
print("\n2. Average score per region:")
print(avg_score_per_region)
print("\n2. Average score per winery:")
print(avg_score_per_winery)

print("\n3. Average price per type:")
print(avg_price_per_type)
print("\n3. Average price per region:")
print(avg_price_per_region)
print("\n3. Average price per winery:")
print(avg_price_per_winery)

print("\n4. Reviewers per number of reviews:")
print(reviewers_per_number_of_reviews)

# Plot the results
bar_graph(wine_count_by_type, 'Number of wines per type', 'Type', 'Number')
bar_graph(wine_count_by_region, 'Number of wines per region', 'Region', 'Number')
bar_graph(wine_count_by_winery, 'Number of wines per winery', 'Winery', 'Number')
bar_graph(wines_per_price_range, 'Number of wines per price range', 'Price', 'Number')
bar_graph(wines_per_score, 'Number of wines per score', 'Score', 'Number')

bar_graph(avg_score_per_type, 'Average score per type', 'Type', 'Score')
bar_graph(avg_score_per_region, 'Average score per region', 'Region', 'Score')
bar_graph(avg_score_per_winery, 'Average score per winery', 'Winery', 'Score')

bar_graph(avg_price_per_type, 'Average price per type', 'Type', 'Price')
bar_graph(avg_price_per_region, 'Average price per region', 'Region', 'Price')
bar_graph(avg_price_per_winery, 'Average price per winery', 'Winery', 'Price')

bar_graph(reviewers_per_number_of_reviews, 'Reviewers per number of reviews', 'Number of reviews', 'Number of reviewers')

