import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { AutoComplete } from 'antd'

export const HomePage = () => {
  const [searchContent, setSearchContent] = useState("")

  // autocomplete-suggester
  const [options, setOptions] = useState([]);
  
  return (
    <div>
        <header className="flex flex-col items-center h-screen bg-cover bg-center text-white text-center h-screen bg-[url('../public/wineryBackground.jpg')] bg-blend-overlay">
            <div className="mt-28">
              <img src="/logo1.png" alt="logo" className="w-5/6 mx-auto drop-shadow-xl shadow-cyan-900" />  {/* make this route to the home page */}
            </div>
            <form className="mx-auto w-1/2 rounded-full z-50 relative flex items-center" action={"/search/" + searchContent} onSubmit={(e) => {if (!searchContent) {e.preventDefault();}}}>
              <div className="flex-grow relative">
                <AutoComplete
                  className="w-full"
                  options={options}
                  value={searchContent}
                  onSelect={(text) => setSearchContent(text)}
                  onSearch={(text) => {(makeSolrSuggest('http://localhost:5000/api/suggest', 'wines_semantic', text).then((result) => {setOptions(result); setOptions(result)}))}}
                >
                  <input
                    className="w-full px-5 p-3 rounded-full text-lg text-black shadow-[0_2px_5px_1px] shadow-green-900 focus:outline-none"
                    placeholder="Search for a wine ..."
                    value={searchContent}
                    onChange={(e) => setSearchContent(e.target.value)}
                    autoFocus
                  />
                </AutoComplete>
                <SearchIcon className="absolute right-3 top-4 text-green-700" />
              </div>
            </form>
        </header> 
    </div>
  )
}

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

