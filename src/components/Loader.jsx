/**
 * @file Loader.jsx
 * @description Initial loading screen that displays the brand identity 
 * while the browser fetches essential assets like fonts and images.
 */

import React from 'react';

/**
 * Loader Component.
 * 
 * Displays a static version of the reveal mask. 
 * Once the critical image is loaded, the image is placed behind the mask
 * but the animation remains static until the App component triggers the IntroAnimation.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isImageReady - Indicates if the reveal image has finished loading.
 * @returns {JSX.Element} The loading screen.
 */
const Loader = ({ isImageReady }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">
      <svg viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice' className="w-full h-full">
        <defs>
          <mask id='loaderMask'>
            <rect width='100%' height='100%' fill='black' />
            <text 
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
          </mask>
        </defs>
        {/* Only show the image once it's actually loaded to avoid white flashes */}
        {isImageReady && (
          <image href='./bg1.png' width='100%' height='100%' preserveAspectRatio='xMidYMid slice' mask="url(#loaderMask)" />
        )}
        {/* Fallback text if image isn't ready yet */}
        {!isImageReady && (
          <text 
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
        )}
      </svg>
    </div>
  );
};

export default Loader;