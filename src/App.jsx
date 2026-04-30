/**
 * @file App.jsx
 * @description The Master Controller of the application.
 * This file manages the "Onboarding Sequence" of the site:
 * 1. LOAD: Wait for critical assets (like the reveal image) to download.
 * 2. STATIC: Show a static brand logo while assets settle.
 * 3. INTRO: Play the cinematic VI reveal animation.
 * 4. CONTENT: Finally reveal the interactive Landing Page.
 */

import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import IntroAnimation from './components/IntroAnimation';
import Loader from './components/Loader';

const App = () => {
  /** 
   * STATE MANAGEMENT
   * imageLoaded: True when bg1.png is in browser cache.
   * triggerIntro: True when we should stop showing the Loader and start the SVG animation.
   * showContent: True when the SVG animation is finished and we show the actual website.
   */
  const [imageLoaded, setImageLoaded] = useState(false);
  const [triggerIntro, setTriggerIntro] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    /**
     * ASSET PRE-LOADING LOGIC
     * To prevent the "white flash" or "popping" of images during the reveal,
     * we manually create an Image object and wait for its 'onload' event.
     */
    const img = new Image();
    img.src = './bg1.png'; // The critical image used in the reveal mask
    
    img.onload = () => {
      setImageLoaded(true);
      // We add a slight delay (800ms) so the user sees the static logo
      // for a moment before the animation starts, creating a cinematic feel.
      setTimeout(() => {
        setTriggerIntro(true);
      }, 800);
    };

    img.onerror = () => {
      console.error("Critical asset bg1.png failed to load.");
      setImageLoaded(true); 
      setTriggerIntro(true);
    };
  }, []);

  return (
    <>
      {/* 
          PHASE 1: THE LOADER
          Visible until the image is loaded and the timer expires.
      */}
      {!triggerIntro && <Loader isImageReady={imageLoaded} />}
      
      {/* 
          PHASE 2: THE INTRO REVEAL
          Only triggers after the loader is gone and before the content is shown.
      */}
      {triggerIntro && !showContent && (
        <IntroAnimation onComplete={() => setShowContent(true)} />
      )}
      
      {/* 
          PHASE 3: THE LANDING PAGE
          The final destination once the intro sequence is finished.
      */}
      {showContent && <LandingPage />}
    </>
  )
}

export default App