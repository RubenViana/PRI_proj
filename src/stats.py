import pandas as pd
import matplotlib.pyplot as plt

dataset = pd.read_csv('src/updated_dataset.csv')

def bar_graph(ds, title, xlabel, ylabel, sort, sortType=False):
    
    if sort:
        ds_top20 = ds.sort_values(ascending=sortType).head(20)
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
top_10_best_rated = dataset[['name', 'score']].sort_values(by='score', ascending=False).head(10)
plt.bar(top_10_best_rated['name'], top_10_best_rated['score'])
plt.title('Top 10 Best Wines')
plt.xlabel('Wine Name')
plt.ylabel('Wine Rating')
plt.xticks(rotation=90, ha='right')
plt.savefig('stats/' + 'Top 10 Best Wines'  + '.png', bbox_inches='tight')
plt.clf()

# 2. Top 10 worst rated wines
top_10_worst_rated = dataset[['name', 'score']].sort_values(by='score', ascending=True).head(10)
plt.bar(top_10_worst_rated['name'], top_10_worst_rated['score'])
plt.title('Top 10 Worst Wines')
plt.xlabel('Wine Name')
plt.ylabel('Wine Rating')
plt.xticks(rotation=90, ha='right')
plt.savefig('stats/' + 'Top 10 Worst Wines'  + '.png', bbox_inches='tight')
plt.clf()

# 3. Top 10 most expensive wines
top_10_most_expensive = dataset[['name', 'price']].sort_values(by='price', ascending=False).head(10)
plt.bar(top_10_most_expensive['name'], top_10_most_expensive['price'])
plt.title('Top 10 Most Expensive Wines')
plt.xlabel('Wine Name')
plt.ylabel('Wine Price')
plt.xticks(rotation=90, ha='right')
plt.savefig('stats/' + 'Top 10 Most Expensive Wines'  + '.png', bbox_inches='tight')
plt.clf()

# 4. Top 10 cheapest wines
top_10_cheapest = dataset[['name', 'price']].sort_values(by='price', ascending=True).head(10)
plt.bar(top_10_cheapest['name'], top_10_cheapest['price'])
plt.title('Top 10 Cheapest Wines')
plt.xlabel('Wine Name')
plt.ylabel('Wine Price')
plt.xticks(rotation=90, ha='right')
plt.savefig('stats/' + 'Top 10 Cheapest Wines'  + '.png', bbox_inches='tight')
plt.clf()

# 5. Price distribution per score
price_distribution_per_score = dataset[['price', 'score']].sort_values(by='score', ascending=True)
plt.scatter(price_distribution_per_score['price'], price_distribution_per_score['score'])
plt.title('Price Distribution per Score')
plt.xlabel('Price')
plt.ylabel('Score')
plt.savefig('stats/' + 'Price Distribution per Score'  + '.png', bbox_inches='tight')
plt.clf()

