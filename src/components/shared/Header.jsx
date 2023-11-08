import React from 'react'
import SearchBar from '../SearchBar'
import BellIcon from '../BellIcon'
import Dropdown from '../Dropdown'
function Header() {
  return (
  <div className='p-4 px-10 align-middle bg-white flex justify-between '>
    <div className='flex-grow'></div>
 <SearchBar/>
 <BellIcon/>
 <Dropdown/>
  </div>
  )
}

export default Header