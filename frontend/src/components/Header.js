import React from 'react'

export const Header = () => {
  return (
    <header className="bg-cover bg-center text-white text-center h-96 bg-[url('../public/wineryBackground.jpg')] bg-blend-overlay relative">
        <form className="mx-auto w-2/3 rounded-full absolute -bottom-6 inset-x-0 z-50 shadow-md shadow-green-800" action="#" method="get">
            <input
            type="text"
            className="w-full p-3 rounded-full text-green-700 focus:outline-none"
            placeholder="Search for a wine ..."
            />
        </form>
    </header>
  )
}
