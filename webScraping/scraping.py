#possible upgrades: awards and details about the grapes
#website to read csv: https://www.convertcsv.com/csv-viewer-editor.htm?utm_content=cmp-true
import time
import csv
import threading
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


driver = webdriver.Chrome()
driver.get("https://www.winespectator.com/")
time.sleep(1)


#info lists
wine_names = [] #done
wine_reviewers = [] #done
wine_producers = [] #done
wine_dates = [] #done
wine_prices = [] #done
wine_ratings = [] #done
wine_reviews = [] #done
wine_regions = [] #done
wine_type_color = [] #done
wine_reviewers_info = [] #done
wine_grapes = [] #done

#sign in
profile_button = driver.find_element(By.CSS_SELECTOR, "button.dropdown-container__button")
profile_button.click()

sign_in_element = driver.find_element(By.CSS_SELECTOR, ".js-user-link.last-of-type")
login_url = sign_in_element.get_attribute("href")
driver.get(login_url)
#time.sleep(1)

email_field = driver.find_element(By.ID, "userid")
email_field.send_keys("rafa.aires.13@gmail.com")

password_field = driver.find_element(By.ID, "passwd")
password_field.send_keys("ProjectoMaryWitch")

submit_signin_button = driver.find_element(By.ID, "target")
submit_signin_button.click()
#time.sleep(3)


#accessing reviews
ratings_button = driver.find_element(By.CSS_SELECTOR,".js-mm-show.main-navbar-ratings")
ratings_button.click()
#time.sleep(1)

search_button = driver.find_element(By.CSS_SELECTOR, "button[data-cyd='ratings-search-button']")
search_button.click()
#time.sleep(5)

advanced_search_dropdown = driver.find_element(By.CSS_SELECTOR, "h4.mod-heading.mb-0 a")
advanced_search_dropdown.click()
time.sleep(5)

bottles_per_page_dropdown = driver.execute_script("return document.querySelector('select.form-control.input-sm[id=\"size\"]');")
bottles_per_page_dropdown.click()
bottles_per_page = bottles_per_page_dropdown.find_element(By.XPATH, ".//option[text()='50']")
bottles_per_page.click()

wine_type_dropdown = driver.execute_script("return document.querySelector('select.form-control.input-sm[name=\"varietal[]\"]');")
wine_type = wine_type_dropdown.find_element(By.XPATH, ".//option[text()='All Red Wines']")
wine_type.click()

search_advanced_button = driver.find_element(By.CSS_SELECTOR, "input.btn.btn-primary.btn-lg.px-64")
search_advanced_button.click()

time.sleep(5)

for i in range(2):
    j = 0
    while j < 60:
        table = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, "table.table.results.hidden-xs tbody")))
        elements = table.find_elements(By.TAG_NAME, "a")
        #table = driver.find_element(By.CSS_SELECTOR, "table.table.results.hidden-xs tbody")
        #elements = table.find_elements(By.TAG_NAME, "a")

        for element in elements:
            try:
                href = element.get_attribute("href")
                current_url = driver.current_url
                
                load_thread = threading.Thread(target=driver.get, args=(href, ))
                load_thread.start()
                load_thread.join(timeout=6)
                if load_thread.is_alive():
                    print(f"Page for {href} didn't load within 6 seconds. Skipping to the next element.")
                    driver.back()
                    continue

                if ("https://www.winespectator.com/wine/wine-detail" in href):
                    score_element = driver.find_element(By.CLASS_NAME, "ws2-dd-score").text
                    
                    price_element = driver.find_element(By.CLASS_NAME, "ws2-dd-price").text
                    
                    review_element = driver.find_element(By.CSS_SELECTOR, "p.ws2-dd-wine-note").text
                    
                    producer_element = driver.execute_script("return document.querySelector('span.ws2-wineTitle__winery a').textContent.trim();")
                    
                    name_date_element = driver.execute_script("return document.querySelector('span.ws2-wineTitle__wine.ws2-fs-deka').textContent.trim();")
                    words = name_date_element.split()
                    name_element = ' '.join(words[:-1])
                    date_element = words[-1]

                    region_element = driver.execute_script("return document.querySelector('a.ws2-region__link strong').textContent.trim();")

                    type_color_element = driver.find_element(By.CSS_SELECTOR, "div.ws2-taster.ws2-dd-detail-grid.ws2-dd-detail-align-top p.ws2-taster__role").text

                    try:
                        grape_element = driver.execute_script("return document.querySelector('div.ws2-dd-grape-grid h3').textContent.trim();")
                    except:
                        grape_element = "NA"


                    try:
                        reviewer_element = driver.execute_script("return document.querySelector('p.ws2-taster__name').textContent.trim();")
                    except:
                        reviewer_element = "NA"


                    if (reviewer_element != "NA"):
                        print("Current_URL: ", driver.current_url)

                        if ("guest" in driver.current_url):
                            continue

                        href_reviewer_aux = driver.find_element(By.XPATH, "//div[@class='ws2-taster']//a")
                        href_reviewer = href_reviewer_aux.get_attribute("href")
                        driver.get(href_reviewer)
                        reviewer_info_element = driver.find_element(By.CSS_SELECTOR, "div.author__bio-content").text
                        driver.back()

                    wine_ratings.append(score_element)
                    wine_prices.append(price_element)
                    wine_reviews.append(review_element)
                    wine_producers.append(producer_element)
                    wine_names.append(name_element)
                    wine_dates.append(date_element)
                    wine_regions.append(region_element)
                    wine_reviewers.append(reviewer_element)
                    wine_reviewers_info.append(reviewer_info_element)
                    wine_type_color.append(type_color_element)
                    wine_grapes.append(grape_element)

                    driver.back()
            except StaleElementReferenceException:
                print("Stale element reference, retrying...")
                driver.get(current_url)
                table = driver.find_element(By.CSS_SELECTOR, "table.table.results.hidden-xs tbody")
                elements = table.find_elements(By.TAG_NAME, "a")
                continue

        try:
            next_button = driver.find_element(By.XPATH, "//a[contains(text(), 'Next')]")
            next_button.click()
            j += 1
            print("j value: ", j)
            time.sleep(3)
        except NoSuchElementException:
            clear_all_button = driver.execute_script("return document.querySelector('li.vanhookFilterClear.list-inline-item.mt-2');")
            clear_all_button.click()

            advanced_search_dropdown = driver.find_element(By.CSS_SELECTOR, "h4.mod-heading.mb-0 a")
            advanced_search_dropdown.click()
            time.sleep(5)

            bottles_per_page_dropdown = driver.execute_script("return document.querySelector('select.form-control.input-sm[id=\"size\"]');")
            bottles_per_page_dropdown.click()
            bottles_per_page = bottles_per_page_dropdown.find_element(By.XPATH, ".//option[text()='50']")
            bottles_per_page.click()

            wine_type_dropdown = driver.execute_script("return document.querySelector('select.form-control.input-sm[name=\"varietal[]\"]');")
            wine_type = wine_type_dropdown.find_element(By.XPATH, ".//option[text()='All White Wines']")
            wine_type.click()

            search_advanced_button = driver.find_element(By.CSS_SELECTOR, "input.btn.btn-primary.btn-lg.px-64")
            search_advanced_button.click()
            break

driver.close()

for i in range(len(wine_producers)):
    print("Name: ", wine_names[i])
    print("Producer: ", wine_producers[i])
    print("Price: ", wine_prices[i])
    print("Rating: ", wine_ratings[i])
    print("Review: ", wine_reviews[i])
    print("Date: ", wine_dates[i])
    print("Region: ", wine_regions[i])
    print("Reviewer: ", wine_reviewers[i])
    print("Reviewer Info: ", wine_reviewers_info[i])
    print("Type and Color: ", wine_type_color[i])
    print("Grape: ", wine_grapes[i])


data = list(zip(wine_names, wine_dates, wine_producers, wine_regions, wine_type_color, wine_grapes, wine_prices, wine_ratings, wine_reviews, wine_reviewers, wine_reviewers_info))

csv_file = "wine_data.csv"

with open(csv_file, "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["name", "date", "producer", "region", "type_and_color", "grapes", "price", "ratings", "review", "reviewer", "reviewer_info"])
    writer.writerows(data)

print("Data has been saved to", csv_file)