

import React from 'react'
import Sidebar from '../Sidebar'
import Header from './Header'
import {Outlet} from 'react-router-dom'
function Layout() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen'>
    <div className='bg-white text-white'><Sidebar/></div>
    <div className='w-screen overflow-x-auto'>
    <div><Header/></div>    
    <div><Outlet/></div>
    </div>

    </div>
  )
}

export default Layout