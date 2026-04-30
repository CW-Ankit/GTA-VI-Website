import React from 'react';

const BottomBar = () => {
  return (
    <div className="bottom-bar flex justify-between items-center absolute z-10 bottom-0 left-0 w-full py-8 px-7 bg-linear-to-t from-black to-transparent">
      <div className="flex gap-2 items-center text-zinc-300">
        <i className='ri-arrow-down-line text-xl'></i>
        <h3 className='font-[Helvetica_Now_Display]'>Scroll</h3>
      </div>
      <img className='h-10' src="./ps5.png" alt="PS5" />
    </div>
  );
};

export default BottomBar;