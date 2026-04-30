/**
 * @file Hero.jsx
 * @description High-impact visual section of the landing page.
 * Implements a professional-grade parallax system with sensor detection 
 * and user notifications for browsers that block motion data (e.g., Brave).
 */

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = () => {
  // State to manage the "Sensors Blocked" notification
  const [sensorAlert, setSensorAlert] = useState(false);
  
  // Refs to store current sensor values without triggering re-renders
  const gyroData = useRef({ x: 0, y: 0 });
  const mouseData = useRef({ x: 0, y: 0 });
  const isMobile = useRef(false);
  const hasReceivedData = useRef(false);

  useGSAP(() => {
    // Initial entrance animations
    gsap.to(".sky", {
      scale: 1.3,
      rotate: 0,
      duration: 1.7,
      delay: -0.9,
      ease: "easeInOut"
    })

    const girlTargetBottom = window.innerWidth < 768 ? "-15%" : "-25%";
    
    gsap.to(".girl", {
      scale: 0.9,
      bottom: girlTargetBottom,
      rotate: 0,
      duration: 1.8,
      delay: -0.9,
      ease: "easeInOut"
    })

    /**
     * HIGH-PERFORMANCE ANIMATION LOOP
     * Instead of updating CSS inside event listeners (which causes layout thrashing),
     * we use gsap.ticker (which is synchronized with requestAnimationFrame).
     */
    const updateParallax = () => {
      const data = isMobile.current ? gyroData.current : mouseData.current;
      
      // Apply movements with depth multipliers
      // We use gsap.to with a very short duration (0.1) to act as a smoothing filter (LERP)
      gsap.to(".imagesdiv .text", { x: data.x * 0.5, y: data.y * 0.5, duration: 0.1, overwrite: 'auto' })
      gsap.to(".sky", { x: data.x * 0.8, y: data.y * 0.8, duration: 0.1, overwrite: 'auto' })
      gsap.to(".bg", { x: data.x * 1.5, y: data.y * 1.5, duration: 0.1, overwrite: 'auto' })
    }

    // Start the 60fps loop
    gsap.ticker.add(updateParallax);

    /**
     * DESKTOP INPUT: Mouse Move
     */
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      mouseData.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 60,
        y: (e.clientY / window.innerHeight - 0.5) * 60
      };
    }

    /**
     * MOBILE INPUT: Gyroscope
     */
    const handleDeviceOrientation = (event) => {
      // Mark that we are actually receiving data from the sensor
      hasReceivedData.current = true;

      // Normalize beta (tilt) around 80 degrees (natural holding angle)
      const normalizedBeta = (event.beta || 0) - 80; 
      const normalizedGamma = (event.gamma || 0);
      
      // Store clamped values in the ref for the ticker to pick up
      gyroData.current = {
        x: Math.max(Math.min(normalizedGamma * 0.8, 30), -30),
        y: Math.max(Math.min(normalizedBeta * 0.8, 30), -30)
      };
    }

    const requestGyroPermission = async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            window.addEventListener("deviceorientation", handleDeviceOrientation);
          } else {
            setSensorAlert(true); // Explicitly denied
          }
        } catch (e) {
          setSensorAlert(true);
        }
      } else {
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    
    const interactionHandler = () => {
      if (window.innerWidth < 768) {
        isMobile.current = true;
        requestGyroPermission();
        
        /**
         * SILENT FAILURE DETECTION:
         * In browsers like Brave on Android, permission may be "granted" or 
         * not requested, but the browser still blocks the actual data stream.
         * We wait 3 seconds; if no data has arrived, we notify the user.
         */
        setTimeout(() => {
          if (!hasReceivedData.current) {
            setSensorAlert(true);
          }
        }, 3000);

        window.removeEventListener("click", interactionHandler);
        window.removeEventListener("touchstart", interactionHandler);
      }
    };
    
    window.addEventListener("click", interactionHandler);
    window.addEventListener("touchstart", interactionHandler);

    return () => {
      gsap.ticker.remove(updateParallax);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      window.removeEventListener("click", interactionHandler);
      window.removeEventListener("touchstart", interactionHandler);
    };
  })

  return (
    <div className="imagesdiv relative w-full h-screen overflow-hidden bg-black">
      {/* SENSOR ALERT NOTIFICATION */}
      {sensorAlert && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md bg-black/80 backdrop-blur-md border border-white/20 text-white p-4 rounded-2xl text-center text-sm animate-bounce shadow-2xl">
          <p className="font-bold mb-1">Motion Sensors Disabled</p>
          <p className="opacity-70">To enable the 3D effect, please enable "Motion Sensors" in your browser settings.</p>
          <button 
            onClick={() => setSensorAlert(false)}
            className="mt-3 px-4 py-1 bg-white text-black rounded-full text-xs font-bold uppercase"
          >
            Got it
          </button>
        </div>
      )}

      <img 
        className='sky absolute inset-0 w-full h-full object-cover z-1 scale-[1.5] rotate-[-5deg] will-change-transform' 
        style={{ backfaceVisibility: 'hidden' }}
        src="./sky.png" 
        alt="Sky" 
      />
      <img 
        className='bg absolute inset-0 w-full h-full object-cover z-2 scale-[1.2] will-change-transform' 
        style={{ backfaceVisibility: 'hidden' }}
        src="./bg.png" 
        alt="Background" 
      />
      
      <div className="radial-fade absolute inset-0 z-3 pointer-events-none bg-[radial-gradient(circle_at_bottom,black_0%,transparent_75%)]" />
      
      <div className="text flex flex-col gap-1 text-5xl md:text-8xl text-white absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2 text-center px-4 will-change-transform"
           style={{ backfaceVisibility: 'hidden' }}>
        <h3 className='-ml-5 md:-ml-15'>Grand</h3>
        <h3 className='ml-5 md:ml-15'>Theft</h3>
        <h3 className='-ml-5 md:-ml-15'>Auto</h3>
      </div>
      
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <img 
          className='girl absolute left-1/2 -translate-x-1/2 -bottom-full md:bottom-[-150%] rotate-45 scale-[0.7] md:scale-[0.75] object-contain' 
          src="./girlbg.png" 
          alt="Character"
        />
      </div>
    </div>
  );
};

export default Hero;