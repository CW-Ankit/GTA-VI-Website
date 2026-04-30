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
      gsap.to(".imagesdiv .text", {
        x: xOffset * 0.8,
        y: yOffset * 0.8,
        duration: 0.5,
        ease: "power2.out"
      })
      gsap.to(".sky", {
        x: xOffset,
        y: yOffset,
        duration: 0.5,
        ease: "power2.out"
      })
      gsap.to(".bg", {
        x: xOffset * 1.9,
        y: yOffset * 1.9,
        duration: 0.5,
        ease: "power2.out"
      })
    }

    /**
     * Handles mouse movement to apply parallax shifts to elements.
     * Only active on devices with a pointer (not touch).
     * @param {MouseEvent} e - The mouse event object.
     */
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;

      const xMove = (e.clientX / window.innerWidth - 0.5) * 30
      const yMove = (e.clientY / window.innerHeight - 0.5) * 30
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
      const xMove = (event.gamma || 0) * 0.5; 
      const yMove = (event.beta || 0) * 0.5;
      
      // Limit the movement range to prevent extreme shifting
      const clampedX = Math.max(Math.min(xMove, 20), -20);
      const clampedY = Math.max(Math.min(yMove, 20), -20);
      
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
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      }
    }

    // Add desktop listener
    window.addEventListener("mousemove", handleMouseMove);
    
    // Add a one-time click listener to request gyro permission on mobile
    const mobilePermissionHandler = () => {
      if (window.innerWidth < 768) {
        requestGyroPermission();
        window.removeEventListener("click", mobilePermissionHandler);
      }
    };
    window.addEventListener("click", mobilePermissionHandler);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      window.removeEventListener("click", mobilePermissionHandler);
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