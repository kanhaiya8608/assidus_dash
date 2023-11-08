
import React from 'react'
import {HiMagnifyingGlass} from 'react-icons/hi2'
function SearchBar() {
  return (
    <div>    
      <div className="mx-6 md:relative hidden md:block">
    <input
      type="text"
      className="bg-slate-100 w-64 pl-10 pr-3 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
      placeholder=""
    />
    <div className="absolute left-3 top-3">
    <HiMagnifyingGlass size='20'/>
    </div>

    </div>
  </div>
  )
}

export default SearchBar