/**
 * @file ContentSection.jsx
 * @description Information section detailing game features and providing a CTA.
 */

import React from 'react';

/**
 * ContentSection Component.
 * 
 * Renders a responsive layout containing a game screenshot and 
 * descriptive marketing text. Switches from a side-by-side (desktop) 
 * to a stacked (mobile) layout.
 * 
 * @component
 * @returns {JSX.Element} The detailed content section.
 */
const ContentSection = () => {
  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center px-6 md:px-10 py-20">
      <div className="cntr flex flex-col md:flex-row w-full h-auto md:h-[90%] gap-10 items-center">
        <div className="limg relative w-full md:w-1/2 h-[50vh] md:h-full overflow-hidden">
          <img className='w-full h-full object-contain scale-[0.8]' src="./imag.png" alt="GTA VI" />
        </div>
        <div className="rg text-zinc-200 w-full md:w-[35%] text-center md:text-left">
          <h1 className='text-4xl md:text-6xl font-bold leading-tight'>Still Running</h1>
          <h1 className='text-4xl md:text-6xl font-bold leading-tight'>Not Hunting</h1>
          <p className='mt-6 md:mt-10 font-[Helvetica_Now_Display] text-lg md:text-2xl text-wrap opacity-80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum molestias reprehenderit et animi architecto mollitia earum incidunt assumenda. Possimus, quae.</p>
          <p className='mt-4 font-[Helvetica_Now_Display] text-lg md:text-2xl text-wrap opacity-80'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, odio?</p>
          <button className='mt-8 text-xl md:text-3xl py-4 px-6 md:py-5 md:px-7 rounded-lg bg-amber-400 hover:bg-yellow-300 border-amber-900 pointer transition-colors'>Download Now</button>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;