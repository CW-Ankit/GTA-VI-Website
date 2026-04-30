/**
 * @file Hero.jsx
 * @description High-impact visual section of the landing page.
 * Features layered images and parallax-like mouse tracking effects for desktop
 * and Gyro-based parallax effects for mobile devices.
 */

import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Hero Component.
 * 
 * Implements entrance animations and a dual-system parallax effect.
 * Uses a clipping wrapper for the character image to ensure perfect 
 * responsiveness across all device types (Virtual Cropping).
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

    // Character Entrance: we animate the image inside the wrapper
    const girlBottomValue = window.innerWidth < 768 ? "-10%" : "-20%";
    
    gsap.to(".girl", {
      scale: 0.9,
      x: "-50%",
      bottom: girlBottomValue,
      rotate: 0,
      duration: 1.8,
      delay: -0.9,
      ease: "easeInOut"
    })

    /**
     * Parallax Application Logic
     */
    const applyParallax = (xOffset, yOffset) => {
      gsap.to(".imagesdiv .text", {
        x: xOffset * 0.5,
        y: yOffset * 0.5,
        duration: 0.3,
        ease: "power2.out"
      })
      gsap.to(".sky", {
        x: xOffset * 0.8,
        y: yOffset * 0.8,
        duration: 0.3,
        ease: "power2.out"
      })
      gsap.to(".bg", {
        x: xOffset * 1.5,
        y: yOffset * 1.5,
        duration: 0.3,
        ease: "power2.out"
      })
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
      const clampedX = Math.max(Math.min(xMove, 30), -30);
      const clampedY = Math.max(Math.min(yMove, 30), -30);
      applyParallax(clampedX, clampedY);
    }

    const requestGyroPermission = async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && 
          typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            window.addEventListener("deviceorientation", handleDeviceOrientation);
          }
        } catch (error) {
          console.error("Gyro permission denied:", error);
        }
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
    <div className="imagesdiv relative w-full h-screen overflow-hidden">
      <img className='sky rotate-[-5deg] w-full h-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 scale-[1.5]' src="./sky.png" />
      <img className='bg w-full h-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-2 scale-[1.2]' src="./bg.png" />
      
      {/* 
          RADIAL FADE OVERLAY
          Creates a soft, expanding black blur from the bottom center.
          z-3 ensures it is above the backgrounds but behind the character.
      */}
      <div className="radial-fade absolute bottom-0 left-0 w-full h-full z-3 pointer-events-none bg-[radial-gradient(circle_at_bottom,_black_0%,_transparent_75%)]" />
      
      <div className="text flex flex-col gap-1 text-5xl md:text-8xl text-white absolute z-3 -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2 text-center px-4">
        <h3 className='-ml-5 md:-ml-15'>Grand</h3>
        <h3 className='ml-5 md:ml-15'>Theft</h3>
        <h3 className='-ml-5 md:-ml-15'>Auto</h3>
      </div>
      
      {/* 
          VIRTUAL CROP WRAPPER 
          This div acts as a window. Anything outside its bounds is cropped.
          - h-[70vh] on mobile ensures the image doesn't push the whole page down.
          - overflow-hidden performs the 'crop'.
      */}
      <div className="girl-wrapper absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[70vh] md:h-full overflow-hidden z-4 pointer-events-none">
        <img 
          className='girl scale-[0.7] md:scale-[0.75] object-cover absolute left-1/2 -translate-x-1/2 bottom-[-100%] md:bottom-[-150%] rotate-45' 
          src="./girlbg.png" 
          alt="Character"
        />
      </div>
    </div>
  );
};

export default Hero;