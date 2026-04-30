/**
 * @file Hero.jsx
 * @description High-impact visual section of the landing page.
 * Features layered images and parallax-like mouse tracking effects.
 */

import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Hero Component.
 * 
 * Implements entrance animations for background elements and a mouse-tracking 
 * system that shifts layers (sky, background, text) at different speeds to 
 * create a 3D parallax effect.
 * 
 * @component
 * @returns {JSX.Element} The Hero section with parallax images and text.
 */
const Hero = () => {
  useGSAP(() => {
    // Initial entrance animations for atmospheric elements
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

    /**
     * Handles mouse movement to apply parallax shifts to elements.
     * @param {MouseEvent} e - The mouse event object.
     */
    const handleMouseMove = (e) => {
      // Calculate offset from center (-0.5 to 0.5) scaled by 30px
      const xMove = (e.clientX / window.innerWidth - 0.5) * 30
      
      // Shift text slightly
      gsap.to(".imagesdiv .text", {
        x: `${xMove * 0.8}%`
      })
      // Shift sky layer
      gsap.to(".sky", {
        x: xMove
      })
      // Shift background layer more aggressively for depth
      gsap.to(".bg", {
        x: (xMove * 1.9)
      })
    }

    window.addEventListener("mousemove", handleMouseMove);
    
    // Cleanup listener on component unmount
    return () => window.removeEventListener("mousemove", handleMouseMove);
  })

  return (
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
  );
};

export default Hero;