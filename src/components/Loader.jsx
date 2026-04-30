/**
 * @file Loader.jsx
 * @description Initial loading screen that displays the brand identity 
 * while the browser fetches essential assets like fonts and images.
 */

import React, { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Loader Component.
 * 
 * Displays a centered "VI" logo on a black background. 
 * Immediately upon mounting, the logo begins a slow, atmospheric fade-out 
 * to create a cinematic transition.
 * 
 * @component
 * @returns {JSX.Element} The loading screen.
 */
const Loader = () => {
  useGSAP(() => {
    // Slow cinematic fade out of the VI logo
    gsap.to(".loader-text", {
      opacity: 0,
      duration: 2,
      ease: "power1.inOut",
      repeat: -1, // Loop the fade to keep the screen alive while loading
      yoyo: true
    });
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <h1 className="loader-text text-white text-8xl md:text-9xl font-bold tracking-tighter">
        VI
      </h1>
    </div>
  );
};

export default Loader;