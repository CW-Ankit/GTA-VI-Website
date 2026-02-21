import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LandingPage from './components/LandingPage';

const App = () => {
  let [showContent, setShowContent] = useState(false)
  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill;
        }
      }
    })
  })

  
  return (
    <>
      <div className='svg flex items-center justify-center fixed top-0 left-0 z-12 w-full h-screen overflow-hidden bg-black'>
        <svg viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice'>
          <defs>
            <mask id='viMask'>
              <rect width='100%' height='100%' fill='black' />
              <g className='vi-mask-group'>
                <text x="50%" y="50%" fontSize="250" textAnchor='middle' fill='white' dominantBaseline='middle' fontFamily='Arial Black'>
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image href='./bg1.png' width='100%' height='100%' preserveAspectRatio='xMidYMid slice' mask="url(#viMask)" />
        </svg>
      </div>
      {showContent &&
        <LandingPage />}
    </>
  )
}

export default App