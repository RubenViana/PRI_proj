import React, { useState } from 'react'
import { Header } from '../components/Header'
import { ListWines } from '../components/ListWines'

export const HomePage = () => {
  // State to manage the visibility of filter options
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div>
        <header className="flex items-center justify-center h-screen bg-cover bg-center text-white text-center h-screen bg-[url('../public/wineryBackground.jpg')] bg-blend-overlay">
            <form className="mx-auto w-2/3 rounded-full z-50 flex relative" action="#" method="get">
                <input
                type="text"
                className="w-full p-3 rounded-full text-green-700 focus:outline-none shadow-lg shadow-green-800 "
                placeholder="Search for a wine ..."
                />
                <button
                  type="button"
                  className="ml-5 bg-green-500 text-green-700 bg-white rounded-full shadow-lg shadow-green-800"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Filters
                </button>
                {showFilters && (
                  <div className="absolute -bottom-35 w-2/3 h-20 inset-x-0 shadow-lg rounded shadow-green-800 bg-white">
                    
                  </div>
                )}
            </form>

        </header> 
    </div>
  )
}

