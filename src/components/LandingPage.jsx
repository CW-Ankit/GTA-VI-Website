import react, { useState } from 'react'
import "remixicon/fonts/remixicon.css"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';

const LandingPage = () => {
  let [showContent, setShowContent] = useState(false)
  useGSAP(() => {

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 1.7,
      delay: -0.9,
      ease: "easeInOut"
    })
    gsap.to(".sky", {
      scale: 1.3,
      rotate: 0,
      duration: 1.7,
      delay: -0.9,
      ease: "easeInOut"
    })
    gsap.to(".girl", {
      scale: 0.9,
      x: "-50%",
      bottom: "-75%",
      rotate: 0,
      duration: 1.8,
      delay: -0.9,
      ease: "easeInOut"
    })

    const main = document.querySelector(".main")

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 30
      gsap.to(".imagesdiv .text", {
        x: `${xMove * 0.8}%`
      })
      gsap.to(".sky", {
        x: xMove
      })
      gsap.to(".bg", {
        x: (xMove * 1.9)
      })
      // gsap.to(".girl", {
      //   x: -xMove * 0.1
      // })
    })
  }, [showContent])
  return (
    <div className='main no-scrollbar w-full rotate-[-5deg] scale-[1.4] bg-blue-500'>
      <div className="landing overflow-hidden relative w-full h-screen bg-black">
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

        <div className="imagesdiv relative w-full h-screen overflow-hidden">
          <img className='sky rotate-[-5deg] w-full h-full object-cover absolute top-0 left-0 z-1 scale-[1.5]' src="./sky.png" />
          <img className='bg w-full h-full object-cover absolute top-0 left-0 z-2 scale-[1.2]' src="./bg.png" />
          <div className="text flex flex-col gap-1 text-8xl text-white absolute z-3 -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2">
            <h3 className='-ml-15'>Grand</h3>
            <h3 className='ml-15'>Theft</h3>
            <h3 className='-ml-15'>Auto</h3>
          </div>
          <img className='girl scale-[0.7] object-cover absolute rotate-45 left-1/2 -translate-x-1/2 bottom-[-150%] z-4' src="./girlbg.png" />
        </div>
        <div className="bottom-bar flex justify-between items-center absolute z-10 bottom-0 left-0 w-full py-8 px-7 bg-linear-to-t from-black to-transparent">
          <div className="flex gap-2 items-center text-zinc-300"><i className='ri-arrow-down-line text-xl'></i><h3 className='font-[Helvetica_Now_Display]'>Scroll</h3></div>
          <img className='h-10' src="./ps5.png" alt="" />
        </div>
      </div>
      <div className="w-full h-screen bg-black flex items-center justify-center px-10">
        <div className="cntr flex w-full h-[90%]">
          <div className="limg relative w-1/2 h-full overflow-hidden">
            <img className='absolute scale-[0.8] top-1/2 left-1/2 -translate-1/2' src="./imag.png" alt="" />
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
    </div>
  )
}

export default LandingPage