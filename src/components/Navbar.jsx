/**
 * @file Navbar.jsx
 * @description Navigation component for the website.
 * Displays the brand logo and primary navigation links.
 */

import React from 'react';

/**
 * Navbar Component.
 * 
 * Renders a sticky top navigation bar. Optimized to remain a single row 
 * on mobile with scaled-down elements to maintain a professional look.
 * 
 * @component
 * @returns {JSX.Element} The navigation bar.
 */
const Navbar = () => {
  return (
    <div className='nav px-4 md:px-7 py-4 md:py-8 absolute z-10 top-0 left-0 w-full flex flex-row items-center justify-between gap-2'>
      <div className='flex gap-2 md:gap-4 logo items-center'>
        <div className="lines flex flex-col gap-0.5 md:gap-1 text-shadow-zinc-900">
          <div className="rounded line w-6 h-0.5 md:w-9 md:h-1 bg-white"></div>
          <div className="rounded line w-4 h-0.5 md:w-7 md:h-1 bg-white"></div>
          <div className="rounded line w-2 h-0.5 md:w-5 md:h-1 bg-white"></div>
        </div>
        <div className="text-sm md:text-2xl text-white leading-none text-shadow-zinc-900 font-bold whitespace-nowrap">Rockstar Games</div>
      </div>
      <div className="links text-white gap-3 md:gap-4 flex flex-row items-center justify-around text-shadow-zinc-900 text-[10px] md:text-base uppercase tracking-wider">
        <a className='hover:underline' href="#download">Download</a>
        <a className='hover:underline' href="#about">About</a>
        <a className='hover:underline' href="#more">More</a>
      </div>
    </div>
  );
};

export default Navbar;