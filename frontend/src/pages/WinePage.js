import React from 'react'
import { useParams } from 'react-router-dom'
import winesData from '../data/wines.json';

export const WinePage = () => {
    const { wineId } = useParams();
 
    const wine = winesData.find((wine) => wine.wine_id === wineId);

    return (
        <div className="bg-white">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{wine.name}</h2>
              <p className="mt-4 text-gray-500">
                {wine.review}
              </p>
    
              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                <div key={wine.name} className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Type</dt>
                    <dd className="mt-2 text-sm text-gray-500">{wine.type_and_color}</dd>
                </div>
                <div key={wine.name} className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Winery</dt>
                    <dd className="mt-2 text-sm text-gray-500">{wine.winery}</dd>
                </div>
                <div key={wine.name} className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Region</dt>
                    <dd className="mt-2 text-sm text-gray-500">{wine.region}</dd>
                </div>
                <div key={wine.name} className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Primary Grape</dt>
                    <dd className="mt-2 text-sm text-gray-500">{wine.primary_grape}</dd>
                </div>
                <div key={wine.name} className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Date</dt>
                    <dd className="mt-2 text-sm text-gray-500">{wine.date}</dd>
                </div>
                <div key={wine.name} className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Reviewer</dt>
                    <dd className="mt-2 text-sm text-gray-500">{wine.reviewer}</dd>
                </div>
              </dl>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                <img
                    src="/pexels-dalila-dalprat-1889634.jpg"
                    alt=""
                    className="rounded-lg bg-gray-100"
                />
                <img
                    src="/pexels-grape-things-2954924.jpg"
                    alt=""
                    className="rounded-lg bg-gray-100"
                />
                <img
                    src="/pexels-pixabay-36741.jpg"
                    alt=""
                    className="rounded-lg bg-gray-100"
                />
                <img
                    src="/pexels-pixabay-45209.jpg"
                    alt=""
                    className="rounded-lg bg-gray-100"
                />
            </div>
          </div>
        </div>
      )
}