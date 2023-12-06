import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

export const HomePage = () => {
  const [searchContent, setSearchContent] = useState("")
  

  return (
    <div>
        <header className="flex flex-col items-center h-screen bg-cover bg-center text-white text-center h-screen bg-[url('../public/wineryBackground.jpg')] bg-blend-overlay">
            <div className="mt-28">
              <img src="/logo1.png" alt="logo" className="w-5/6 mx-auto drop-shadow-xl shadow-cyan-900" />  {/* make this route to the home page */}
            </div>
            <form className="mx-auto w-1/2 rounded-full z-50 relative flex items-center" action={"/search/" + searchContent}>
                <SearchIcon className="absolute left-2 text-green-700" />
                <input
                type="text"
                className="w-full px-10 p-3 rounded-full text-black focus:outline-none shadow-[0_2px_5px_1px] shadow-green-900"
                placeholder="Search for a wine ..."
                id="search"
                name="search"
                onChange={(e) => setSearchContent(e.target.value)}
                />
            </form>
        </header> 
    </div>
  )
}

