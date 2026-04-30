/**
 * @file LandingPage.jsx
 * @description Main content wrapper for the landing page.
 * Orchestrates the layout and entrance animations for the primary page sections.
 */

import React from 'react';
import "remixicon/fonts/remixicon.css";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Navbar from './Navbar';
import Hero from './Hero';
import BottomBar from './BottomBar';
import ContentSection from './ContentSection';

/**
 * LandingPage Component.
 * 
 * Provides the main layout structure. It applies an initial scale and rotation 
 * to the overall container on desktop, which is then animated back to normal.
 * On mobile, it remains flat to avoid clipping.
 * 
 * @component
 * @returns {JSX.Element} The complete landing page layout.
 */
const LandingPage = () => {
  useGSAP(() => {
    // Entrance animation for the main wrapper to create a "zoom-in" effect
    // We only animate if we are on a screen size where the rotation/scale was applied
    if (window.innerWidth >= 768) {
      gsap.to(".main", {
        scale: 1,
        rotate: 0,
        duration: 1.7,
        delay: -0.9,
        ease: "easeInOut"
      })
    }
  })

  return (
    <div className='main no-scrollbar w-full md:rotate-[-5deg] md:scale-[1.4] rotate-0 scale-100 bg-blue-500 transition-transform duration-500'>
      <div className="landing overflow-hidden relative w-full h-screen bg-black">
        <Navbar />
        <Hero />
        <BottomBar />
      </div>
      <ContentSection />
    </div>
  )
}

export default LandingPage;