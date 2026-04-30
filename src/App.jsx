/**
 * @file App.jsx
 * @description Root component of the GTA VI Website. 
 * Manages the high-level application state, specifically the transition 
 * from the intro animation to the main landing page content.
 */

import { useState } from 'react';
import LandingPage from './components/LandingPage';
import IntroAnimation from './components/IntroAnimation';

/**
 * Main Application Component.
 * 
 * @component
 * @returns {JSX.Element} The rendered application.
 */
const App = () => {
  /** 
   * State to track if the intro animation has completed.
   * @type {[boolean, function]} 
   */
  let [showContent, setShowContent] = useState(false)

  return (
    <>
      {!showContent && <IntroAnimation onComplete={() => setShowContent(true)} />}
      {showContent && <LandingPage />}
    </>
  )
}

export default App