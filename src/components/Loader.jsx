/**
 * @file Loader.jsx
 * @description Handles the pre-intro brand presence.
 * It ensures the "VI" logo is visible immediately, then seamlessly
 * integrates the mask image once it's loaded.
 */

import React from 'react';

const Loader = ({ isImageReady }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">
      {/* 
          SVG CONFIGURATION:
          - viewBox='0 0 800 600': Defines the internal coordinate system.
          - preserveAspectRatio='xMidYMid slice': Ensures the SVG fills the 
            container like 'object-cover', preventing distortion on different screens.
          - w-full h-full: Makes the SVG occupy the entire viewport.
      */}
      <svg viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice' className="w-full h-full">
        <defs>
          {/* 
              SVG MASKING LOGIC:
              A mask works like a stencil. White areas are "holes" where the image shows 
              through, and black areas are "solid" and hide everything behind them.
          */}
          <mask id='loaderMask'>
            {/* Base layer: Black rectangle hides everything in the viewport */}
            <rect width='100%' height='100%' fill='black' />
            {/* Stencil: The white "VI" text creates the hole we see through */}
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
        
        {/* 
            DYNAMIC RENDERING:
            If isImageReady is true, we render the image with the mask applied.
            This allows the logo to transition from a solid white color to 
            containing the actual image without a flickering effect.
        */}
        {isImageReady && (
          <image href='./bg1.png' width='100%' height='100%' preserveAspectRatio='xMidYMid slice' mask="url(#loaderMask)" />
        )}
        
        {/* 
            FALLBACK STATE:
            Renders a simple white "VI" text if the image is still downloading.
        */}
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