/**
 * @file Navbar.jsx
 * @description Navigation component for the website.
 * Displays the brand logo and primary navigation links.
 */

import React from 'react';

/**
 * Navbar Component.
 * 
 * Renders a sticky top navigation bar with a stylized logo (three lines) 
 * and links to Download, About, and More Games.
 * 
 * @component
 * @returns {JSX.Element} The navigation bar.
 */
const Navbar = () => {
  return (
    <div className='nav px-7 py-8 absolute z-10 top-0 left-0 w-full h-10 flex content-between justify-between'>
      <div className=' flex gap-4 logo items-center'>
        <div className="lines flex flex-col gap-1 text-shadow-zinc-900">
          <div className="rounded line w-9 h-1 bg-white"></div>
          <div className="rounded line w-7 h-1 bg-white"></div>
          <div className="rounded line w-5 h-1 bg-white"></div>
        </div>
        <div className=" text-2xl mb-0.75 text-white leading-none text-shadow-zinc-900">Rockstar Games</div>
      </div>
      <div className="links text-white gap-4 flex content-between items-center justify-around text-shadow-zinc-900">
        <a className='hover:underline' href="#download">Download</a>
        <a className='hover:underline' href="#about">About</a>
        <a className='hover:underline' href="#more">More Games</a>
      </div>
    </div>
  );
};

export default Navbar;