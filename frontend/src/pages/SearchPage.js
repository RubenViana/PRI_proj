import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { FilterButton } from "../components/FilterButton";
import { WineCard } from '../components/WineCard';
import { FilterSlider } from '../components/FilterSlider';


function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
  });

  return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  );
}


export const SearchPage = (props) => {
  const [newSearchContent, setSearchContent] = useState("")
  const { searchContent } = useParams();
  const [results, setResults] = useState([])
  React.useEffect(() => {
    /* dar fetch do solr here */
    setResults([
      {
        "wine_id": "1",
        "name": "Barolo Ravera",
        "date": "2019",
        "winery": "Vietti",
        "region": "Italy / Piedmont / Barolo",
        "type_and_color": "Red Still",
        "primary_grape": "Nebbiolo",
        "price": "248",
        "score": "97",
        "review": "A dark, brooding style, this red evokes hibiscus, raspberry, cherry and spice flavors, with an underlying iron note. It's dense, yet focused and vibrant, with ample fruit to stand up to its muscular structure. Balanced and expressive now, yet this needs time. Best from 2027 through 2048. 642 cases made, 193 cases imported.",
        "reviewer": "Bruce Sanderson",
        "reviewer_info": "Bruce Sanderson joined Wine Spectator in 1993 and has been a senior editor since 1999. He is lead taster for the wines of Burgundy in France and Piedmont and Tuscany in Italy.\nSanderson was born and raised in Canada. An early career as a model and actor took him to Germany, where he developed a passion for wine. He moved to New York City in 1990 and began working in the wine trade. After working at specialty retailer Burgundy Wine Company and as a sommelier at Windows on the World restaurant, he joined Wine Spectator’s tasting department.\nWhen not visiting wine regions, he enjoys listening to music (especially live jazz), cooking and dining out in New York and relaxing at the Jersey shore."
      },
      {
        "wine_id": "2",
        "name": "Gigondas Hominis Fides",
        "date": "2021",
        "winery": "Château de St.-Cosme",
        "region": "France / Southern Rhône / Gigondas",
        "type_and_color": "Red Still",
        "primary_grape": "Grenache",
        "price": "160",
        "score": "96",
        "review": "A showstopper, this is chewy, smoky and broad-shouldered in the best possible way. Reveals layers of blackberry and plum matched by pronounced charred iron, dried thyme and black pepper. Shows serious mineral intensity and refined yet muscular tannins, which provide the framework and energy, while forest floor, tobacco and an intriguing menthol note mark the long finish. Best from 2025 through 2040. 39 cases imported.",
        "reviewer": "Kristen Bieler",
        "reviewer_info": "Kristen Bieler joined Wine Spectator as a senior editor in 2021. An Arizona native, Kristen graduated from Cornell University with a degree in history, and moved to New York City to pursue a career in journalism. For the past two decades she has been writing professionally about wine, spirits and food, and has traveled to many wine regions around the world for her reporting. Prior to joining the Wine Spectator team, she was the editor in chief of SevenFifty Daily and Beverage Media Group, two leading trade publications for the wine and spirits industry.\nShe lives in New York City with her husband and their three children, and aside from wine, her passions include travel, theater, cooking, hiking in the mountains and long beach walks."
      },
      {
        "wine_id": "3",
        "name": "Barolo Aleste",
        "date": "2019",
        "winery": "Luciano Sandrone",
        "region": "Italy / Piedmont / Barolo",
        "type_and_color": "Red Still",
        "primary_grape": "Nebbiolo",
        "price": "202",
        "score": "96",
        "review": "This red leans more toward black cherry, blackberry and violet flavors, with tar, tea and autumn woods underbrush accents lurking underneath. It's firm, dense and persists on the sinewy finish. Combines elegance with power, but needs time. Best from 2027 through 2048. 800 cases made, 200 cases imported.",
        "reviewer": "Bruce Sanderson",
        "reviewer_info": "Bruce Sanderson joined Wine Spectator in 1993 and has been a senior editor since 1999. He is lead taster for the wines of Burgundy in France and Piedmont and Tuscany in Italy.\nSanderson was born and raised in Canada. An early career as a model and actor took him to Germany, where he developed a passion for wine. He moved to New York City in 1990 and began working in the wine trade. After working at specialty retailer Burgundy Wine Company and as a sommelier at Windows on the World restaurant, he joined Wine Spectator’s tasting department.\nWhen not visiting wine regions, he enjoys listening to music (especially live jazz), cooking and dining out in New York and relaxing at the Jersey shore."
      },
      {
        "wine_id": "4",
        "name": "Barolo Cannubi",
        "date": "2019",
        "winery": "Cascina Adelaide",
        "region": "Italy / Piedmont / Barolo",
        "type_and_color": "Red Still",
        "primary_grape": "Nebbiolo",
        "price": "125",
        "score": "95",
        "review": "Intense perfume of rose leads off, with flavors of cherry, raspberry, earth, mineral and tobacco. Though solidly built, with a base of dense tannins, there is a beam of fruit that lingers through the long aftertaste. Fine purity and overall balance. Best from 2027 through 2047. 300 cases made, 100 cases imported.",
        "reviewer": "Bruce Sanderson",
        "reviewer_info": "Bruce Sanderson joined Wine Spectator in 1993 and has been a senior editor since 1999. He is lead taster for the wines of Burgundy in France and Piedmont and Tuscany in Italy.\nSanderson was born and raised in Canada. An early career as a model and actor took him to Germany, where he developed a passion for wine. He moved to New York City in 1990 and began working in the wine trade. After working at specialty retailer Burgundy Wine Company and as a sommelier at Windows on the World restaurant, he joined Wine Spectator’s tasting department.\nWhen not visiting wine regions, he enjoys listening to music (especially live jazz), cooking and dining out in New York and relaxing at the Jersey shore."
      },
      {
        "wine_id": "5",
        "name": "Gigondas Le Claux",
        "date": "2021",
        "winery": "Château de St.-Cosme",
        "region": "France / Southern Rhône / Gigondas",
        "type_and_color": "Red Still",
        "primary_grape": "Grenache",
        "price": "160",
        "score": "95",
        "review": "Opulent and broad, with a generous cascade of ripe plum and winey cassis notes wrapped in talc-fine yet sturdy tannins. Chewy, with strappy black licorice and cast iron moving in. A seductive, concentrated Gigondas, with impressive harmony as every element hums along toward the seemingly endless finish. Outstanding. Best from 2025 through 2040. 105 cases imported.",
        "reviewer": "Kristen Bieler",
        "reviewer_info": "Kristen Bieler joined Wine Spectator as a senior editor in 2021. An Arizona native, Kristen graduated from Cornell University with a degree in history, and moved to New York City to pursue a career in journalism. For the past two decades she has been writing professionally about wine, spirits and food, and has traveled to many wine regions around the world for her reporting. Prior to joining the Wine Spectator team, she was the editor in chief of SevenFifty Daily and Beverage Media Group, two leading trade publications for the wine and spirits industry.\nShe lives in New York City with her husband and their three children, and aside from wine, her passions include travel, theater, cooking, hiking in the mountains and long beach walks."
      },
      {
        "wine_id": "6",
        "name": "Gigondas Le Poste",
        "date": "2021",
        "winery": "Château de St.-Cosme",
        "region": "France / Southern Rhône / Gigondas",
        "type_and_color": "Red Still",
        "primary_grape": "Grenache",
        "price": "160",
        "score": "95",
        "review": "Densely packed and incredibly complex, with layers of sappy raspberry, dusty earth, black pepper, olive tapenade and singed rosemary. Shows tannins that are chalky-fine in feel, yet muscular enough to support a core of rich fruit, all grounded by cast iron underpinnings. Needs time to unfurl. Best from 2025 through 2040. 24 cases imported.",
        "reviewer": "Kristen Bieler",
        "reviewer_info": "Kristen Bieler joined Wine Spectator as a senior editor in 2021. An Arizona native, Kristen graduated from Cornell University with a degree in history, and moved to New York City to pursue a career in journalism. For the past two decades she has been writing professionally about wine, spirits and food, and has traveled to many wine regions around the world for her reporting. Prior to joining the Wine Spectator team, she was the editor in chief of SevenFifty Daily and Beverage Media Group, two leading trade publications for the wine and spirits industry.\nShe lives in New York City with her husband and their three children, and aside from wine, her passions include travel, theater, cooking, hiking in the mountains and long beach walks."
      },
      {
        "wine_id": "7",
        "name": "Barolo Liste",
        "date": "2018",
        "winery": "Damilano",
        "region": "Italy / Piedmont / Barolo",
        "type_and_color": "Red Still",
        "primary_grape": "Nebbiolo",
        "price": "87",
        "score": "95",
        "review": "Freshly mown hay, eucalyptus and mint aromas segue to raspberry, kirsch and rose flavors in this dense, yet eloquent red. It's supple and fruity, with terrific cut and a long, aftertaste based on the red fruit profile. Its tannins are beautifully integrated. Best from 2026 through 2043. 580 cases made, 300 cases imported.",
        "reviewer": "Bruce Sanderson",
        "reviewer_info": "Bruce Sanderson joined Wine Spectator in 1993 and has been a senior editor since 1999. He is lead taster for the wines of Burgundy in France and Piedmont and Tuscany in Italy.\nSanderson was born and raised in Canada. An early career as a model and actor took him to Germany, where he developed a passion for wine. He moved to New York City in 1990 and began working in the wine trade. After working at specialty retailer Burgundy Wine Company and as a sommelier at Windows on the World restaurant, he joined Wine Spectator’s tasting department.\nWhen not visiting wine regions, he enjoys listening to music (especially live jazz), cooking and dining out in New York and relaxing at the Jersey shore."
      },
      {
        "wine_id": "8",
        "name": "Gigondas Le Regard Loin...",
        "date": "2021",
        "winery": "Domaine des Bosquets",
        "region": "France / Southern Rhône / Gigondas",
        "type_and_color": "Red Still",
        "primary_grape": "Grenache",
        "price": "310",
        "score": "95",
        "review": "Luxurious in feel, oozing with ripe black currant, blackberry coulis and spiced fig cake, invigorated by orange peel acidity and cooling minerality. Pure and smooth through the lush, powerful finish, with generous savory garrigue and smoke accents cruising through. Elegant and modern, with a long future ahead in the cellar. Best from 2025 through 2040. 74 cases made, 7 cases imported.",
        "reviewer": "Kristen Bieler",
        "reviewer_info": "Kristen Bieler joined Wine Spectator as a senior editor in 2021. An Arizona native, Kristen graduated from Cornell University with a degree in history, and moved to New York City to pursue a career in journalism. For the past two decades she has been writing professionally about wine, spirits and food, and has traveled to many wine regions around the world for her reporting. Prior to joining the Wine Spectator team, she was the editor in chief of SevenFifty Daily and Beverage Media Group, two leading trade publications for the wine and spirits industry.\nShe lives in New York City with her husband and their three children, and aside from wine, her passions include travel, theater, cooking, hiking in the mountains and long beach walks."
      },
      {
        "wine_id": "9",
        "name": "Barolo Brunate",
        "date": "2018",
        "winery": "Giuseppe Rinaldi",
        "region": "Italy / Piedmont / Barolo",
        "type_and_color": "Red Still",
        "primary_grape": "Nebbiolo",
        "price": "399",
        "score": "95",
        "review": "Rose hip, strawberry, cherry, menthol and sweet, spicy oak aromas and flavors mark this incisive, elegant red. It's supported by a swath of chalky tannins and this is long and spicy in the end, with a core of sweet fruit. Best from 2026 through 2043. 600 cases made, 110 cases imported.",
        "reviewer": "Bruce Sanderson",
        "reviewer_info": "Bruce Sanderson joined Wine Spectator in 1993 and has been a senior editor since 1999. He is lead taster for the wines of Burgundy in France and Piedmont and Tuscany in Italy.\nSanderson was born and raised in Canada. An early career as a model and actor took him to Germany, where he developed a passion for wine. He moved to New York City in 1990 and began working in the wine trade. After working at specialty retailer Burgundy Wine Company and as a sommelier at Windows on the World restaurant, he joined Wine Spectator’s tasting department.\nWhen not visiting wine regions, he enjoys listening to music (especially live jazz), cooking and dining out in New York and relaxing at the Jersey shore."
      },
      {
        "wine_id": "10",
        "name": "Barolo Le Vigne",
        "date": "2019",
        "winery": "Luciano Sandrone",
        "region": "Italy / Piedmont / Barolo",
        "type_and_color": "Red Still",
        "primary_grape": "Nebbiolo",
        "price": "175",
        "score": "95",
        "review": "Here's a tightly wound red, with floral, cherry, iron, earth and underbrush aromas and flavors. It's beefy, with the vintage's characteristic austerity and a strong grip on the finish. The tannins lend a compact feel in the end, yet this stretches out on the finish with a core of pure fruit. Best from 2027 through 2047. 1,500 cases made, 350 cases imported.",
        "reviewer": "Bruce Sanderson",
        "reviewer_info": "Bruce Sanderson joined Wine Spectator in 1993 and has been a senior editor since 1999. He is lead taster for the wines of Burgundy in France and Piedmont and Tuscany in Italy.\nSanderson was born and raised in Canada. An early career as a model and actor took him to Germany, where he developed a passion for wine. He moved to New York City in 1990 and began working in the wine trade. After working at specialty retailer Burgundy Wine Company and as a sommelier at Windows on the World restaurant, he joined Wine Spectator’s tasting department.\nWhen not visiting wine regions, he enjoys listening to music (especially live jazz), cooking and dining out in New York and relaxing at the Jersey shore."
      },
    ])
  }, [])

  let filters = [
    {
      name: 'Type / Color',
      values : [
        {
          label: 'Red Sparkling',
          key: '0',
        },
        {
          label: 'Red Dessert',
          key: '1',
        },
        {
          label: 'Red Still',
          key: '2',
        },
        {
          label: 'White Sparkling',
          key: '3',
        },
        {
          label: 'White Dessert',
          key: '4',
        },
        {
          label: 'White Still',
          key: '5',
        }
      ]
    },
    {name: 'Country', values: [{'label': 'Greece', 'key': '1'}, {'label': 'South Africa', 'key': '2'}, {'label': 'Austria', 'key': '3'}, {'label': 'Italy', 'key': '4'}, {'label': 'Portugal', 'key': '5'}, {'label': 'Spain', 'key': '6'}, {'label': 'Germany', 'key': '7'}, {'label': 'New Zealand', 'key': '8'}, {'label': 'American', 'key': '9'}, {'label': 'Israel', 'key': '10'}, {'label': 'Hungary', 'key': '11'}, {'label': 'Cyprus', 'key': '12'}, {'label': 'France', 'key': '13'}, {'label': 'Chile', 'key': '14'}, {'label': 'Uruguay', 'key': '15'}, {'label': 'Argentina', 'key': '16'}, {'label': 'Canada', 'key': '17'}, {'label': 'United States', 'key': '18'}, {'label': 'Australia', 'key': '19'}, {'label': 'New York', 'key': '20'}]},
    {name: 'Year', values: [{'label': '2023', 'key': '12'}, {'label': '2022', 'key': '17'}, {'label': '2021', 'key': '15'}, {'label': '2020', 'key': '8'}, {'label': '2019', 'key': '11'}, {'label': '2018', 'key': '5'}, {'label': '2017', 'key': '9'}, {'label': '2016', 'key': '4'}, {'label': '2015', 'key': '7'}, {'label': '2014', 'key': '3'}, {'label': '2013', 'key': '10'}, {'label': '2012', 'key': '2'}, {'label': '2011', 'key': '6'}, {'label': '2010', 'key': '18'}, {'label': '2009', 'key': '13'}, {'label': '2008', 'key': '1'}, {'label': '2006', 'key': '16'}, {'label': '1975', 'key': '14'}]},
  ]


  return (
    <div>
      <div className="bg-white border-b border-green-900/20">
        <div className="h-20 flex">
          <div className="flex w-32 items-center">
            <Link to="/">
              <img src="/logo.png" alt="logo" />
            </Link>
          </div>
          <form className="ml-32 w-1/2 rounded-full relative flex items-center" action={"/search/" + newSearchContent===null ? searchContent : newSearchContent}>
            <SearchIcon className="absolute left-2 text-green-700" />
            <input
              type="text"
              className="w-full px-10 p-3 rounded-full text-black focus:outline-none shadow-[0_2px_5px_1px] shadow-green-900/20"
              placeholder="Search for a wine ..."
              defaultValue={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
            />
          </form>
        </div>
        <div id="filters" className="ml-64 h-16 flex space-x-6">
          {filters.map((filter) => (
            <FilterButton id={filter.name} name={filter.name} items={filter.values} setResults={setResults}/>
          ))}
          <FilterSlider name="Score" max={100} defaultValues={[0, 100]} formater="*" />
          <FilterSlider name="Price" max={5000} defaultValues={[0, 5000]} formater="€" />
        </div>
      </div>
      <HideOnScroll {...props}>
        <AppBar>
          <div className="bg-white shadow-[0_1px_6px_0] shadow-green-900/20">
            <div className="h-16 flex">
              <div className="flex w-32 items-center">
                <Link to="/">
                  <img src="/logo.png" alt="logo" />
                </Link>
              </div>
              <form className="ml-32 w-1/2 rounded-full relative flex items-center" action={"/search/" + newSearchContent===null ? searchContent : newSearchContent}>
                <SearchIcon className="absolute left-2 text-green-700" />
                <input
                  type="text"
                  className="w-full px-10 p-2 rounded-full text-black focus:outline-none border border-green-900/20"
                  placeholder="Search for a wine ..."
                  defaultValue={searchContent}
                  onChange={(e) => setSearchContent(e.target.value)}
                />
              </form>
            </div>
          </div>
        </AppBar>
      </HideOnScroll>
      <div className="mt-10">
        <ul className="divide-y divide-gray-100 ml-64 w-2/3 mt-20">
          {results.map((wine) => (
            <WineCard wine={wine} />
          ))}
        </ul>
      </div>
    </div>
  );
}
