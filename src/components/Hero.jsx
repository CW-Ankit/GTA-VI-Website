/**
 * @file Hero.jsx
 * @description High-impact visual section of the landing page.
 * Features layered images and parallax-like mouse tracking effects for desktop
 * and Gyro-based parallax effects for mobile devices.
 */

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Hero Component.
 * 
 * Implements entrance animations and a dual-system parallax effect:
 * 1. Mouse-tracking for desktop users.
 * 2. Device Orientation (Gyroscope) for mobile users.
 * 
 * @component
 * @returns {JSX.Element} The Hero section with parallax images and text.
 */
const Hero = () => {
  useGSAP(() => {
    // Initial entrance animations for atmospheric elements
    gsap.to(".sky", {
      scale: 1.3,
      rotate: 0,
      duration: 1.7,
      delay: -0.9,
      ease: "easeInOut"
    })

    // Responsive animation for the girl image
    const girlBottomValue = window.innerWidth < 768 ? "-40%" : "-75%";
    
    gsap.to(".girl", {
      scale: 0.9,
      x: "-50%",
      bottom: girlBottomValue,
      rotate: 0,
      duration: 1.8,
      delay: -0.9,
      ease: "easeInOut"
    })

    /**
     * Parallax Application Logic
     * Applies movements to layers based on provided x and y offsets.
     * @param {number} xOffset - Horizontal shift value.
     * @param {number} yOffset - Vertical shift value.
     */
    const applyParallax = (xOffset, yOffset) => {
      // Use more visible multipliers and a shorter duration for a snappier feel
      gsap.to(".imagesdiv .text", {
        x: xOffset * 0.5,
        y: yOffset * 0.5,
        duration: 0.3,
        ease: "power2.out"
      })
      gsap.to(".sky", {
        x: xOffset * 0.8,
        y: yOffset * 0.8,
        duration: 0.3,
        ease: "power2.out"
      })
      gsap.to(".bg", {
        x: xOffset * 1.5,
        y: yOffset * 1.5,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    /**
     * Mouse Parallax Handler (Desktop)
     * @param {MouseEvent} e - The mouse event object.
     */
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;

      const xMove = (e.clientX / window.innerWidth - 0.5) * 60
      const yMove = (e.clientY / window.innerHeight - 0.5) * 60
      applyParallax(xMove, yMove);
    }

    /**
     * Gyro Parallax Handler (Mobile)
     * Maps device orientation angles to pixel offsets.
     * @param {DeviceOrientationEvent} event - The device orientation event.
     */
    const handleDeviceOrientation = (event) => {
      // gamma: left to right tilt [-90, 90]
      // beta: front to back tilt [-180, 180]
      
      // Normalizing beta: most users hold phone at ~80 degrees. 
      // We subtract 80 to make the "neutral" position a natural holding angle.
      const normalizedBeta = (event.beta || 0) - 80; 
      const normalizedGamma = (event.gamma || 0);
      
      // Sensitivity multipliers
      const xMove = normalizedGamma * 0.8; 
      const yMove = normalizedBeta * 0.8;
      
      // Limit the movement range to prevent the images from sliding off screen
      const clampedX = Math.max(Math.min(xMove, 30), -30);
      const clampedY = Math.max(Math.min(yMove, 30), -30);
      
      applyParallax(clampedX, clampedY);
    }

    /**
     * Permission Request for iOS Device Orientation
     */
    const requestGyroPermission = async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && 
          typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            window.addEventListener("deviceorientation", handleDeviceOrientation);
          }
        } catch (error) {
          console.error("Gyro permission denied:", error);
        }
      } else {
        // Android and other devices usually don't require requestPermission
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      }
    }

    // Add desktop listener
    window.addEventListener("mousemove", handleMouseMove);
    
    // Request permission on any user interaction (click or touch)
    const interactionHandler = () => {
      if (window.innerWidth < 768) {
        requestGyroPermission();
        // We can't just remove the listener immediately because requestPermission 
        // needs to be called inside the event loop of the interaction.
        window.removeEventListener("click", interactionHandler);
        window.removeEventListener("touchstart", interactionHandler);
      }
    };
    
    window.addEventListener("click", interactionHandler);
    window.addEventListener("touchstart", interactionHandler);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      window.removeEventListener("click", interactionHandler);
      window.removeEventListener("touchstart", interactionHandler);
    };
  })

  return (
    <div className="imagesdiv relative w-full h-screen overflow-hidden">
      <img className='sky rotate-[-5deg] w-full h-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 scale-[1.5]' src="./sky.png" />
      <img className='bg w-full h-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-2 scale-[1.2]' src="./bg.png" />
      
      <div className="text flex flex-col gap-1 text-5xl md:text-8xl text-white absolute z-3 -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2 text-center px-4">
        <h3 className='-ml-5 md:-ml-15'>Grand</h3>
        <h3 className='ml-5 md:ml-15'>Theft</h3>
        <h3 className='-ml-5 md:-ml-15'>Auto</h3>
      </div>
      
      <img className='girl scale-[0.75] object-cover absolute rotate-45 left-1/2 -translate-x-1/2 bottom-[-80%] md:bottom-[-150%] z-4' src="./girlbg.png" />
    </div>
  );
};

export default Hero;