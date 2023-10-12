import pandas as pd
import matplotlib.pyplot as plt

dataset = pd.read_csv('src/updated_dataset.csv')

def bar_graph(ds, title, xlabel, ylabel, sort):
    
    if sort:
        ds_top20 = ds.sort_values(ascending=False).head(20)
    else:
        ds_top20 = ds.head(20)

    # Create the bar graph
    graph = ds_top20.plot(kind='bar')

    # Add number to the top of the bar
    bars = graph.patches
    for bar, num in zip(bars, ds_top20):
        graph.text(bar.get_x() + bar.get_width()/2, bar.get_height()+1, round(num), ha='center')

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
score_ranges = [0, 50, 60, 70, 80, 90, 100]
dataset['score_range'] = pd.cut(dataset['score'], bins=score_ranges)
wines_per_score_range = dataset.groupby('score_range')['name'].count()

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
print("\n1. Number of wines per score range:")
print(wines_per_score_range)

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
bar_graph(wine_count_by_type, 'Number of wines per type', 'Type', 'Number', False)
bar_graph(wine_count_by_region, 'Number of wines per region', 'Region', 'Number', True)
bar_graph(wine_count_by_winery, 'Number of wines per winery', 'Winery', 'Number', True)
bar_graph(wines_per_price_range, 'Number of wines per price range', 'Price', 'Number', False)
bar_graph(wines_per_score_range, 'Number of wines per score', 'Score', 'Number', False)

bar_graph(avg_score_per_type, 'Average score per type', 'Type', 'Score', False)
bar_graph(avg_score_per_region, 'Average score per region', 'Region', 'Score', True)
bar_graph(avg_score_per_winery, 'Average score per winery', 'Winery', 'Score', True)

bar_graph(avg_price_per_type, 'Average price per type', 'Type', 'Price', False)
bar_graph(avg_price_per_region, 'Average price per region', 'Region', 'Price', True)
bar_graph(avg_price_per_winery, 'Average price per winery', 'Winery', 'Price', True)

bar_graph(reviewers_per_number_of_reviews, 'Number of reviews per reviewer', 'Reviewers', 'Number of reviews', False)


# New stats

# 1. Top 10 best rated wines
top_10_best_rated = dataset.nlargest(10, 'score')

# 2. Top 10 worst rated wines
top_10_worst_rated = dataset.nsmallest(10, 'score')

# 3. Top 10 most expensive wines
top_10_most_expensive = dataset.nlargest(10, 'price')

# 4. Top 10 least expensive wines
top_10_least_expensive = dataset.nsmallest(10, 'price')


# bar_graph(top_10_best_rated['score'], 'Top 10 best rated wines', 'Wine', 'Score', False)
# bar_graph(top_10_worst_rated['score'], 'Top 10 worst rated wines', 'Wine', 'Score', False)
# bar_graph(top_10_most_expensive['price'], 'Top 10 most expensive wines', 'Wine', 'Price', False)
# bar_graph(top_10_least_expensive['price'], 'Top 10 least expensive wines', 'Wine', 'Price', False)
