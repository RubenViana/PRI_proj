import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { FilterButton } from "../components/FilterButton";
import { WineCard } from '../components/WineCard';
import { FilterSlider } from '../components/FilterSlider';
import { AutoComplete, Pagination } from 'antd';

import filters from '../data/filters.json';


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
  const { searchContent } = useParams();
  const [newSearchContent, setSearchContent] = useState(searchContent)
  const [data, setData] = useState([])
  const [results, setResults] = useState([])
  const [filtersList, setFiltersList] = useState([])


  const filterResults = React.useCallback(() => {
    // Implement the common filter logic here
    if (filtersList.length === 0) {
      setResults(data); // No filters applied, return original results
    } else {
      const filteredResults = data.filter((result) => {
        return filtersList.every((option) => {
          if (option.filterKey === 'type_and_color') {
            const selectedOptions = filtersList
              .filter((opt) => opt.filterKey === 'type_and_color')
              .flatMap((opt) => opt.selectedLabel);
            return selectedOptions.includes(result.type_and_color);
          }
          else if (option.filterKey === 'region') {
            const selectedOptions = filtersList
              .filter((opt) => opt.filterKey === 'region')
              .flatMap((opt) => opt.selectedLabel);
            return selectedOptions.includes(result.region.split(" / ")[0]);
          }
          else if (option.filterKey === 'date') {
            const selectedOptions = filtersList
              .filter((opt) => opt.filterKey === 'date')
              .flatMap((opt) => opt.selectedLabel);
            return selectedOptions.includes(result.date[0]);;
          }
          else if (option.filterKey === 'reviewer') {
            const selectedOptions = filtersList
              .filter((opt) => opt.filterKey === 'reviewer')
              .flatMap((opt) => opt.selectedLabel);
            return selectedOptions.includes(result.reviewer);;
          }
          else if (option.filterKey === 'score') {
            const selectedOptions = filtersList
              .filter((opt) => opt.filterKey === 'score')
              .flatMap((opt) => opt.values);
            return result.score >= selectedOptions[0] && result.score <= selectedOptions[1];
          }
          else if (option.filterKey === 'price') {
            const selectedOptions = filtersList
              .filter((opt) => opt.filterKey === 'price')
              .flatMap((opt) => opt.values);
            return result.price >= selectedOptions[0] && result.price <= selectedOptions[1];
          }
          else {
            return true;
          }
        });
      });
      setResults(filteredResults);
    }
  }, [filtersList, data]);

  React.useEffect(() => {
    filterResults()
  }, [filtersList])

  React.useEffect(() => {
    if (newSearchContent === "") {
        setResults([]);
        setData([]);
    }
    else {
      makeSolrQuery('http://localhost:5000/api/solr_knn_query', 'wines_semantic', newSearchContent)
         .then((result) => {
           setResults(result)
           setData(result)
         });
      // makeSolrQuery('http://localhost:5000/api/solr_query', 'wines_semantic', newSearchContent)
      //  .then((result) => {
      //    setResults(result.response.docs);
      //    setData(result.response.docs);
      //  });
    }
  }, [newSearchContent])


  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedResults = results.slice(startIndex, endIndex);

  // autocomplete-suggester
  const [options, setOptions] = useState([]);

  return (
    <div>
      <div className="bg-white border-b border-green-900/20">
        <div className="flex h-20">
          <div className="w-32">
            <Link to="/">
              <img src="/logo.png" alt="logo" />
            </Link>
          </div>
          <form className="mx-32 w-[60rem] rounded-full flex items-center" action={"/search/" + newSearchContent || searchContent} onSubmit={(e) => {if (!newSearchContent) {e.preventDefault();}}}>
            <div className="flex-grow relative">
              <AutoComplete
                className="w-full"
                options={options}
                value={newSearchContent}
                onSelect={(text) => setSearchContent(text)}
                onSearch={(text) => {(makeSolrSuggest('http://localhost:5000/api/suggest', 'wines_semantic', text).then((result) => {setOptions(result); setOptions(result)}))}}
              >
                <input
                  className="w-full px-5 p-3 rounded-full text-base text-black shadow-[0_2px_5px_1px] shadow-green-900/20 focus:outline-none"
                  placeholder="Search for a wine ..."
                  value={newSearchContent}
                  onChange={(e) => setSearchContent(e.target.value)}
                />
              </AutoComplete>
              <SearchIcon className="absolute right-3 top-4 text-green-700" />
            </div>
          </form>
        </div>
        <div id="filters" className="mx-32 md:ml-64 my-4 flex space-x-4 flex-wrap">
          {filters.map((filter) => (
            <FilterButton id={filter.name} name={filter.name} items={filter.values} filtersList={filtersList} setFiltersList={setFiltersList}/>
          ))}
          <FilterSlider name="Score" max={100} defaultValues={[0, 100]} formater="*" filtersList={filtersList} setFiltersList={setFiltersList}/>
          <FilterSlider name="Price" max={3000} defaultValues={[0, 3000]} formater="€" filtersList={filtersList} setFiltersList={setFiltersList}/>
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
              <form className="mx-32 w-[60rem] rounded-full relative flex items-center" action={"/search/" + newSearchContent || searchContent} onSubmit={(e) => {if (!newSearchContent) {e.preventDefault();}}}>
                <SearchIcon className="absolute left-2 text-green-700" />
                <input
                  type="text"
                  className="w-full px-10 p-2 rounded-full text-black focus:outline-none border border-green-900/20"
                  placeholder="Search for a wine ..."
                  value={newSearchContent}
                  onChange={(e) => setSearchContent(e.target.value)}
                />
              </form>
            </div>
          </div>
        </AppBar>
      </HideOnScroll>
      <div className="mt-3 ml-64 w-[46rem]">
        <div className='flex px-5'>
          <p className='text-green-900/50 text-start flex items-center aligh-middle w-fit'>Found {results.length} wines</p>
        </div>
        <ul className="divide-y divide-gray-100 mt-10">
          {paginatedResults.map((wine) => (
            <WineCard wine={wine} key={wine.wine_id}/>
          ))}
        </ul>
        <Pagination className='my-10' current={currentPage} total={results.length} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} showSizeChanger={false}/>
      </div>
    </div>
  );
}


// Solr query
const makeSolrQuery = async (endpoint, collection, text) => {
  try {
      // Construct the query parameters
      const queryParams = new URLSearchParams({
          collection: collection,
          text: text,
      });

      // Append the query parameters to the endpoint URL
      const urlWithParams = `${endpoint}?${queryParams.toString()}`;

      const response = await fetch(urlWithParams, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
  } catch (error) {
      console.error('Error:', error.message);
  }
};

// Solr suggest
const makeSolrSuggest = async (endpoint, collection, text) => {
  try {
      // Construct the query parameters
      const queryParams = new URLSearchParams({
          collection: collection,
          text: text,
      });

      // Append the query parameters to the endpoint URL
      const urlWithParams = `${endpoint}?${queryParams.toString()}`;

      const response = await fetch(urlWithParams, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
  } catch (error) {
      console.error('Error:', error.message);
  }
};

