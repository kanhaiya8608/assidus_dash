import React from 'react';
import { NavLink } from 'react-router-dom';
import { BiSolidDashboard } from 'react-icons/bi';
import { PiDiamondsFourFill, PiCubeFocusLight } from 'react-icons/pi';
import { BsFilePerson } from 'react-icons/bs';
import { BiWallet } from 'react-icons/bi';
import { TbDiscount2 } from 'react-icons/tb';
import { MdOutlineLiveHelp, MdArrowForwardIos } from 'react-icons/md';
import logo from '../assets/logo.png'
function Sidebar() {



  const menus = [
    { label: 'Dashboard', icon: BiSolidDashboard, route: '/' },
    { label: 'Accounts', icon: PiCubeFocusLight, route: '/' },
    { label: 'Payroll', icon: BsFilePerson, route: '/' },
    { label: 'Reports', icon: BiWallet, route: '/' },
    { label: 'Advisor', icon: TbDiscount2, route: '/' },
    { label: 'Contacts', icon: MdOutlineLiveHelp, route: '/' },
  ];


  return (
    <div className="relative hidden md:flex flex-col w-full h-full text-black">
      <div className='flex items-center m-4 p-4  pb-8'>
        <img src={logo} alt="" className='h-10'/>
        </div>
      <div className='flex-1'>
        <ul>
          {menus.map((menu, index) => (
            <li key={index} className='flex items-center justify-between hover:bg-green-600 hover:text-white p-4'>
              <NavLink to={menu.route}>
                <div className=' flex justify-between w-full '>
                  <div className='px-10 text-xl flex items-center'>
                    {menu.icon({ size: 26 })} <span className=' px-5'>{menu.label}</span>
                  </div>
                
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;