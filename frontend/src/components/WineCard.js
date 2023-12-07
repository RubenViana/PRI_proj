import React from 'react'
import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'

export const WineCard = (props) => {
  return (
    <Link to={"/wine/" + props.wine.wine_id}>
      <li key={props.wine.wine_id} className="w-2/3 flex justify-between gap-x-6 p-5 rounded-lg hover:bg-green-50">
        <div className="flex min-w-0 gap-x-4">
          <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={props.wine.type_and_color.toLowerCase().includes('red') ? '/redWine.png' : '/whiteWine.png'} alt="" />
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-6 text-gray-900">{props.wine.name}</p>
            <p className="mt-1 float-left truncate text-xs leading-5 text-gray-500">{props.wine.type_and_color}</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm font-semibold leading-6 text-gray-900">{props.wine.price} €</p>
          <p class="mt-1 text-xs leading-5 text-gray-500"><Rating name="" precision="0.5" value={props.wine.score/20.0} readOnly /></p>
        </div>
      </li>
    </Link>
  )
}
