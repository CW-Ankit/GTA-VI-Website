/**
 * @file LandingPage.jsx
 * @description The main layout shell for the website's content.
 * Orchestrates the transition from the "Entrance Zoom" to the static page.
 */

import "remixicon/fonts/remixicon.css";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Navbar from './Navbar';
import Hero from './Hero';
import BottomBar from './BottomBar';
import ContentSection from './ContentSection';

const LandingPage = () => {
  useGSAP(() => {
    /**
     * ENTRANCE ZOOM LOGIC:
     * To create a "seamless zoom" from the IntroAnimation, the main wrapper
     * starts with a scale of 1.4 and a -5deg rotation.
     * This GSAP call brings it back to scale 1 and rotation 0, completing the 
     * effect of "landing" into the website.
     */
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
      {/* 
          FIRST VIEWPORT: The Hero Section
          - overflow-hidden: Prevents the zoomed-in background layers from creating scrollbars.
          - h-screen: Locks the first view to exactly one viewport height.
      */}
      <div className="landing overflow-hidden relative w-full h-screen bg-black">
        <Navbar />
        <Hero />
        <BottomBar />
      </div>
      
      {/* 
          SECOND VIEWPORT: The Info Section
          - Appears immediately after the Hero section as the user scrolls.
      */}
      <ContentSection />
    </div>
  )
}

export default LandingPage;