/**
 * @file Hero.jsx
 * @description High-impact visual section of the landing page.
 * Focuses on perfect image placement and responsiveness across all devices.
 */

import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Hero Component.
 * 
 * Ensures that the three main visual layers (sky, bg, and character) 
 * are perfectly centered and positioned regardless of device screen size.
 * 
 * @component
 * @returns {JSX.Element} The Hero section.
 */
const Hero = () => {
  useGSAP(() => {
    // Initial entrance animations
    gsap.to(".sky", {
      scale: 1.3,
      rotate: 0,
      duration: 1.7,
      delay: -0.9,
      ease: "easeInOut"
    })

    // Character entrance: adjust based on device
    const girlTargetBottom = window.innerWidth < 768 ? "-15%" : "-25%";
    
    gsap.to(".girl", {
      scale: 0.9,
      bottom: girlTargetBottom,
      rotate: 0,
      duration: 1.8,
      delay: -0.9,
      ease: "easeInOut"
    })

    const applyParallax = (xOffset, yOffset) => {
      gsap.to(".imagesdiv .text", { x: xOffset * 0.5, y: yOffset * 0.5, duration: 0.3 })
      gsap.to(".sky", { x: xOffset * 0.8, y: yOffset * 0.8, duration: 0.3 })
      gsap.to(".bg", { x: xOffset * 1.5, y: yOffset * 1.5, duration: 0.3 })
    }

    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      const xMove = (e.clientX / window.innerWidth - 0.5) * 60
      const yMove = (e.clientY / window.innerHeight - 0.5) * 60
      applyParallax(xMove, yMove);
    }

    const handleDeviceOrientation = (event) => {
      const normalizedBeta = (event.beta || 0) - 80; 
      const normalizedGamma = (event.gamma || 0);
      const xMove = normalizedGamma * 0.8; 
      const yMove = normalizedBeta * 0.8;
      applyParallax(Math.max(Math.min(xMove, 30), -30), Math.max(Math.min(yMove, 30), -30));
    }

    const requestGyroPermission = async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') window.addEventListener("deviceorientation", handleDeviceOrientation);
        } catch (e) { console.error(e); }
      } else {
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    const interactionHandler = () => {
      if (window.innerWidth < 768) {
        requestGyroPermission();
        window.removeEventListener("click", interactionHandler);
        window.removeEventListener("touchstart", interactionHandler);
      }
    };
    window.addEventListener("click", interactionHandler);
    window.addEventListener("touchstart", interactionHandler);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      window.removeEventListener("click", interactionHandler);
      window.removeEventListener("touchstart", interactionHandler);
    };
  })

  return (
    <div className="imagesdiv relative w-full h-screen overflow-hidden bg-black">
      {/* 
          BACKGROUND LAYERS 
          Using absolute inset-0 with object-cover is the most stable way to 
          ensure images fill the screen and stay centered on all devices.
      */}
      <img 
        className='sky absolute inset-0 w-full h-full object-cover z-1 scale-[1.5] rotate-[-5deg]' 
        src="./sky.png" 
        alt="Sky" 
      />
      <img 
        className='bg absolute inset-0 w-full h-full object-cover z-2 scale-[1.2]' 
        src="./bg.png" 
        alt="Background" 
      />
      
      <div className="radial-fade absolute inset-0 z-3 pointer-events-none bg-[radial-gradient(circle_at_bottom,_black_0%,_transparent_75%)]" />
      
      <div className="text flex flex-col gap-1 text-5xl md:text-8xl text-white absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2 text-center px-4">
        <h3 className='-ml-5 md:-ml-15'>Grand</h3>
        <h3 className='ml-5 md:ml-15'>Theft</h3>
        <h3 className='-ml-5 md:-ml-15'>Auto</h3>
      </div>
      
      {/* 
          CHARACTER LAYER 
          The character is anchored to the bottom center. 
          Rotation is applied first, then translation to keep it centered.
      */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <img 
          className='girl absolute left-1/2 -translate-x-1/2 bottom-[-100%] md:bottom-[-150%] rotate-45 scale-[0.7] md:scale-[0.75] object-contain' 
          src="./girlbg.png" 
          alt="Character"
        />
      </div>
    </div>
  );
};

export default Hero;