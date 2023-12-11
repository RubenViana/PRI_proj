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
import  winesData from '../data/wines.json';


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

  // Function to select n random elements from the list
  const selectRandomElements = (list, n) => {
    const shuffledList = list.sort(() => Math.random() - 0.5);
    return shuffledList.slice(0, n);
  };

  const data = selectRandomElements(winesData, 100);


  React.useEffect(() => {
    /* dar fetch do solr here */
    setResults(data)
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
    {name: 'Country', values: 
      [{'label': 'Greece', 'key': '0'},
      {'label': 'South Africa', 'key': '1'},
      {'label': 'Austria', 'key': '2'},
      {'label': 'Italy', 'key': '3'},
      {'label': 'Portugal', 'key': '4'},
      {'label': 'Spain', 'key': '5'},
      {'label': 'Germany', 'key': '6'},
      {'label': 'New Zealand', 'key': '7'},
      {'label': 'American', 'key': '8'},
      {'label': 'Israel', 'key': '9'},
      {'label': 'Hungary', 'key': '10'},
      {'label': 'Cyprus', 'key': '11'},
      {'label': 'France', 'key': '12'},
      {'label': 'Chile', 'key': '13'},
      {'label': 'Uruguay', 'key': '14'},
      {'label': 'Argentina', 'key': '15'},
      {'label': 'Canada', 'key': '16'},
      {'label': 'United States', 'key': '17'},
      {'label': 'Australia', 'key': '18'},
      {'label': 'New York', 'key': '19'},
    ]},

    {name: 'Year', values: 
    [{'label': '2023', 'key': '0'},
    {'label': '2022', 'key': '1'},
    {'label': '2021', 'key': '2'},
    {'label': '2020', 'key': '3'},
    {'label': '2019', 'key': '4'},
    {'label': '2018', 'key': '5'},
    {'label': '2017', 'key': '6'},
    {'label': '2016', 'key': '7'},
    {'label': '2015', 'key': '8'},
    {'label': '2014', 'key': '9'},
    {'label': '2013', 'key': '10'},
    {'label': '2012', 'key': '11'},
    {'label': '2011', 'key': '12'},
    {'label': '2010', 'key': '13'},
    {'label': '2009', 'key': '14'},
    {'label': '2008', 'key': '15'},
    {'label': '2006', 'key': '16'},
    {'label': '1975', 'key': '17'},
    ]},
  ];


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
            <FilterButton id={filter.name} name={filter.name} items={filter.values} results={results} setResults={setResults} data={data}/>
          ))}
          <FilterSlider name="Score" max={100} defaultValues={[0, 100]} formater="*" results={results} setResults={setResults} data={data}/>
          <FilterSlider name="Price" max={3000} defaultValues={[0, 3000]} formater="€" results={results} setResults={setResults} data={data}/>
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
