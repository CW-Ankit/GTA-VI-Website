/**
 * @file Loader.jsx
 * @description Initial loading screen that displays the brand identity 
 * while the browser fetches essential assets like fonts and images.
 */

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Loader Component.
 * 
 * Displays the "VI" logo using the exact same SVG structure as the IntroAnimation
 * to ensure a seamless visual transition.
 * 
 * @component
 * @returns {JSX.Element} The loading screen.
 */
const Loader = () => {
  useGSAP(() => {
    // Slow cinematic fade out of the VI logo to lead into the intro animation
    gsap.to(".loader-vi", {
      opacity: 0,
      duration: 2,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });
  });

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black">
      <svg viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice' className="w-full h-full">
        <text 
          className="loader-vi"
          x="50%" 
          y="50%" 
          fontSize="250" 
          textAnchor='middle' 
          fill='white' 
          dominantBaseline='middle' 
          fontFamily='Arial Black'
        >
          VI
        </text>
      </svg>
    </div>
  );
};

export default Loader;