import React from 'react'
import { NavLink } from 'react-router-dom'
function Navbar() {
  return (
    <div className='flex overflow-x-hidden w-screen'>
      <div className='flex flex-row border-2 border-black rounded-2xl w-screen m-1 p-2 items-center justify-around '>
        <div><h2 className='font-extrabold text-2xl'>DoseMaster</h2></div>
        <div className='flex flex-row space-x-4'>
          <NavLink to="/user/home" className='border-2 p-2 rounded-md'>Home</NavLink>
          <NavLink to="/user/Logs" className='border-2 p-2 rounded-md'>Logs</NavLink>
          <NavLink to="/user/stats" className='border-2 p-2 rounded-md'>Statistics</NavLink>
          <NavLink to="/user/chatbot" className='border-2 p-2 rounded-md'>ChatBot</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
