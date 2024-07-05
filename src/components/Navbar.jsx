import React from 'react';
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <div style={{ backgroundColor: 'black' }} className='p-4 flex items-center justify-between'>
        <aside className='flex items-center gap-2'>
            <img 
                src={logo}
                alt='Globee Logo'
                width={35}
                height={35}
            />
            <span className='text-xl font-bold text-white'>Globee.</span>
        </aside>
        <nav>
            <ul className="flex items-center justify-center gap-8">
                <a href='#' className='text-white'>America</a>
                <a href='#' className='text-white'>Singapore</a>
                <a href='#' className='text-white'>China</a>
                <a href='#' className='text-white'>Indonesia</a>
            </ul>
        </nav>
        <aside className='flex gap-2 items-center'>
            <a href='/agency' className='bg-violet-500 text-white p-2 px-4 rounded-md hover:bg-violet-800'>
                Sign In
            </a>
        </aside>
    </div>
  );
}

export default Navbar;