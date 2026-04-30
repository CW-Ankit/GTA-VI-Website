/**
 * @file App.jsx
 * @description Root component of the GTA VI Website. 
 * Manages the application lifecycle: Loader -> IntroAnimation -> LandingPage.
 */

import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import IntroAnimation from './components/IntroAnimation';
import Loader from './components/Loader';

/**
 * Main Application Component.
 * 
 * Coordinates the sequence of the site's entry:
 * 1. Loader: Shown while assets (fonts/images) are loading.
 * 2. IntroAnimation: Triggered once the browser's window.onload event fires.
 * 3. LandingPage: Triggered once the IntroAnimation sequence completes.
 * 
 * @component
 * @returns {JSX.Element} The rendered application.
 */
const App = () => {
  /** State to track if essential assets are still loading */
  const [isLoading, setIsLoading] = useState(true);
  /** State to track if the intro animation sequence should start */
  const [showIntro, setShowIntro] = useState(false);
  /** State to track if the final content should be revealed */
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Handle the transition from Loader to IntroAnimation
    const handleLoad = () => {
      // Small delay to ensure the "slow fade" of the loader is appreciated
      setTimeout(() => {
        setIsLoading(false);
        setShowIntro(true);
      }, 1000);
    };

    // If the window is already loaded (e.g., on hot reload), trigger immediately
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <>
      {/* Stage 1: Assets Loader */}
      {isLoading && <Loader />}
      
      {/* Stage 2: Brand Reveal Animation */}
      {!isLoading && showIntro && (
        <IntroAnimation onComplete={() => {
          setShowIntro(false);
          setShowContent(true);
        }} />
      )}
      
      {/* Stage 3: Main Content */}
      {showContent && <LandingPage />}
    </>
  )
}

export default App