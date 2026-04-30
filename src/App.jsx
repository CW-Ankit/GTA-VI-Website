/**
 * @file App.jsx
 * @description Root component of the GTA VI Website. 
 * Manages a precise sequence: Asset Loading -> Static Brand State -> Intro Reveal -> Landing Page.
 */

import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import IntroAnimation from './components/IntroAnimation';
import Loader from './components/Loader';

/**
 * Main Application Component.
 * 
 * Handles the asset-aware lifecycle of the application.
 * 
 * @component
 * @returns {JSX.Element} The rendered application.
 */
const App = () => {
  /** State to track if the critical image for the intro has loaded */
  const [imageLoaded, setImageLoaded] = useState(false);
  /** State to track if the intro animation sequence should start */
  const [triggerIntro, setTriggerIntro] = useState(false);
  /** State to track if the final content should be revealed */
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Pre-load the critical image for the reveal animation
    const img = new Image();
    img.src = './bg1.png';
    img.onload = () => {
      setImageLoaded(true);
      // Give the user a moment to see the static brand logo before starting the animation
      setTimeout(() => {
        setTriggerIntro(true);
      }, 800);
    };
    img.onerror = () => {
      console.error("Failed to load critical asset: bg1.png");
      setImageLoaded(true); // Proceed anyway to avoid hanging
      setTriggerIntro(true);
    };
  }, []);

  return (
    <>
      {/* Stage 1: Static Brand Loader (visible until image is ready) */}
      {!triggerIntro && <Loader isImageReady={imageLoaded} />}
      
      {/* Stage 2: Dynamic Brand Reveal (triggered after image load) */}
      {triggerIntro && !showContent && (
        <IntroAnimation onComplete={() => {
          setShowContent(true);
        }} />
      )}
      
      {/* Stage 3: Main Content */}
      {showContent && <LandingPage />}
    </>
  )
}

export default App