/**
 * @file ContentSection.jsx
 * @description Information section detailing game features and providing a CTA.
 */

import React from 'react';

/**
 * ContentSection Component.
 * 
 * Renders a two-column layout containing a game screenshot and 
 * descriptive marketing text with a "Download Now" call-to-action button.
 * 
 * @component
 * @returns {JSX.Element} The detailed content section.
 */
const ContentSection = () => {
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center px-10">
      <div className="cntr flex w-full h-[90%]">
        <div className="limg relative w-1/2 h-full overflow-hidden">
          <img className='absolute scale-[0.8] top-1/2 left-1/2 -translate-1/2' src="./imag.png" alt="GTA VI" />
        </div>
        <div className="rg mt-10 text-zinc-200 w-[35%]">
          <h1 className='text-6xl'>Still Running</h1>
          <h1 className='text-6xl'>Not Hunting</h1>
          <p className='mt-10 font-[Helvetica_Now_Display] text-2xl text-wrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum molestias reprehenderit et animi architecto mollitia earum incidunt assumenda. Possimus, quae.</p>
          <p className='mt-2 font-[Helvetica_Now_Display] text-2xl text-wrap'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, odio?</p>
          <button className='mt-4 text-3xl py-5 px-7 rounded-lg bg-amber-400 hover:bg-yellow-300 border-amber-900 pointer'>Download Now</button>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;