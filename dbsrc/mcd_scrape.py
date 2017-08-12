from splinter import Browser
import json
from time import sleep
from bs4 import BeautifulSoup
from pathlib import Path

def scrape_mcds(output_to_file=False):
    url = 'http://www.mcdonalds.ca/ca/en/food/nutrition_centre.html#/'
    page = None
    with Browser('phantomjs') as browser:
        browser.visit(url)
        navs = browser.find_by_css('nav')
        print('Going through navs')
        for nav in navs:
            if nav.has_class('categories'):
                cats = nav.find_by_tag('a')
                for cat in cats:
                    cat.click()

                sleep(5) # Let the page load
                page = browser.html

                if output_to_file:
                    with open('site.html', 'w') as fp:
                        if page is not None:
                            fp.write(page)
                else:
                    parse_mcds(page)
                return


def open_mcds(filename='site.html'):
    with open('site.html', 'r') as fp:
        page = fp.read()
        parse_mcds(page)

def parse_mcds(file):
    bs = BeautifulSoup(file, 'html.parser')
    menu_coll = bs.find_all('div', attrs={'class': 'menu-collection'})
    food_list = []
    for menu_c in menu_coll:
        menu_entry = menu_c.find_all('article')
        for ent in menu_entry:
            name = ent.find('div', attrs={'class': 'menu-item-title'}).find('p').get_text().replace('\u00ae', '')
            calories = ent.find('div', attrs={'class': 'menu-item-calories'}).find('p').get_text()
            carbs = ent.find('div', attrs={'class': 'menu-item-carbohydrates'}).find('p').get_text()
            fats = ent.find('div', attrs={'class': 'menu-item-fat'}).find('p').get_text()
            proteins = ent.find('div', attrs={'class': 'menu-item-protein'}).find('p').get_text()

            if calories == '-' or carbs == '-' or fats == '-' or proteins == '-':
                continue

            food_list.append({
                'Name': name,
                'Restaurant': 'McDonald',
                'Info': {
                    'Calories': calories,
                    'Carbs': carbs,
                    'Fats': fats,
                    'Proteins': proteins
                }
            })

            # print("{}".format(name))
            # print("CAL: {:>4}, CARB: {:>4}, FAT: {:>4}, PROTEIN: {:>4}".format(calories, carbs, fats, proteins))
            # print("------------------------------------")
    with open('mcds.json', 'w') as fp:
        json.dump(food_list, fp, indent=4, sort_keys=True)


def main():
    my_file = Path("site.html")
    dl = input('Do you want to dl page? (y/n) ')
    if dl == 'y':
        scrape_mcds(True)
        open_mcds()
    elif dl == 'n':
        if my_file.is_file():
            open_mcds()
        else:
            scrape_mcds(False)


if __name__ == '__main__':
    main()