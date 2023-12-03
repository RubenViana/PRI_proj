import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import SearchIcon from '@mui/icons-material/Search';
import { ListWines } from "../components/ListWines";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { FilterButton } from "../components/FilterButton";


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
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        role: 'Co-Founder / CEO',
        imageUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
      },
      {
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        role: 'Co-Founder / CEO',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
      },
      {
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        role: 'Business Relations',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
      },
      {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        role: 'Front-end Developer',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
      },
      {
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        role: 'Designer',
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
      },
      {
        name: 'Tom Cook',
        email: 'tom.cook@example.com',
        role: 'Director of Product',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
      },
    ])
  }, [])

  let filters = [
    {
      name: 'Type',
      values : [
        {
          label: 'Red',
          key: '0',
        },
        {
          label: 'White',
          key: '1',
        },
        {
          label: 'Rose',
          key: '2',
        },
        {
          label: 'Sparkling',
          key: '3',
        }
      ]
    },
    {
      name : 'Winery',
      values : [
        {
          label: 'Cascina Adelaide',
          key: '0',
        },
        {
          label: 'Luciano Sandrone',
          key: '1',
        },
        {
          label: 'Château de St.-Cosme',
          key: '2',
        }
      ]
    }
  ]


  return (
    <div>
      <div className="bg-white border-b border-green-900/20">
        <div className="h-20 flex">
          <div className="flex w-32 items-center">
            <Link to="/">
              <img src="/logo.png" alt="logo" />  {/* make this route to the home page */}
            </Link>
          </div>
          <form className="ml-32 w-2/3 rounded-full relative flex items-center" action={"/search/" + newSearchContent}>
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
        <div id="filters" className="ml-64 h-16 flex space-x-4">
          {filters.map((filter) => (
            <FilterButton id={filter.name} name={filter.name} items={filter.values} setResults={setResults}/>
          ))}
        </div>
      </div>
      <HideOnScroll {...props}>
        <AppBar>
          <div className="bg-white shadow-[0_1px_6px_0] shadow-green-900/20">
            <div className="h-16 flex">
              <div className="flex w-32 items-center">
                <img src="/logo.png" alt="logo" />  {/* make this route to the home page */}
              </div>
              <form className="ml-32 w-2/3 rounded-full relative flex items-center" action="#" method="get">
                <SearchIcon className="absolute left-2 text-green-700" />
                <input
                  type="text"
                  className="w-full px-10 p-2 rounded-full text-black focus:outline-none border border-green-900/20"
                  placeholder="Search for a wine ..."
                />
              </form>
            </div>
          </div>
        </AppBar>
      </HideOnScroll>
      <div className="mt-10">
        <ul className="divide-y divide-gray-100 mx-auto w-2/3 mt-20">
          {results.map((person) => (
            <ListWines person={person} />
          ))}
        </ul>
      </div>
    </div>
  );
}
