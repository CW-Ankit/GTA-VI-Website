/**
 * @file IntroAnimation.jsx
 * @description The cinematic "Reveal" sequence of the site.
 * Uses a GSAP timeline to scale and rotate a mask, creating the effect
 * of the camera zooming through the "VI" logo into the website.
 */

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * IntroAnimation Component.
 * 
 * Renders a full-screen SVG mask animation that scales up and fades out,
 * triggering the `onComplete` callback when the sequence reaches 90%.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {function} props.onComplete - Callback function executed when animation ends.
 * @returns {JSX.Element} The SVG animation overlay.
 */
const IntroAnimation = ({ onComplete }) => {
  useGSAP(() => {
    /**
     * GSAP TIMELINE LOGIC:
     * We use a timeline instead of separate gsap.to calls so that
     * the second animation (scaling) starts exactly when the first (rotation) 
     * reaches a certain point, ensuring fluid motion.
     */
    const tl = gsap.timeline()

    // ACTION 1: Dynamic Tilt
    // rotate: 10 -> Tilts the logo slightly to prevent it from looking static.
    // Power4.easeInOut -> Starts slow, accelerates, ends slow for a natural feel.
    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    })
    // ACTION 2: The "Zoom-Through"
    // scale: 10 -> Scales the mask so large that the "holes" (the VI) fill the whole screen.
    // delay: -1.8 -> Starts this animation 1.8s before the previous one ends (overlapping).
    // opacity: 0 -> Fades the logo away as we "pass through" the logo.
    .to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8, 
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0, 
      onUpdate: function () {
        /**
         * CUT-OFF POINT:
         * When the animation is 90% complete, we trigger onComplete().
         * This removes the SVG overlay and shows the LandingPage while the 
         * screen is still nearly white/empty, hiding the transition "pop".
         */
        if (this.progress() >= 0.9) {
          onComplete();
        }
      }
    })
  })

  return (
    <div className='svg flex items-center justify-center fixed top-0 left-0 z-12 w-full h-screen overflow-hidden bg-black'>
      <svg viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice'>
        <defs>
          <mask id='viMask'>
            <rect width='100%' height='100%' fill='black' />
            {/* 
                vi-mask-group: This <g> element wraps the text so GSAP can 
                rotate and scale the entire group of elements as one single unit.
            */}
            <g className='vi-mask-group'>
              <text x="50%" y="50%" fontSize="250" textAnchor='middle' fill='white' dominantBaseline='middle' fontFamily='Arial Black'>
                VI
              </text>
            </g>
          </mask>
        </defs>
        <image href='./bg1.png' width='100%' height='100%' preserveAspectRatio='xMidYMid slice' mask="url(#viMask)" />
      </svg>
    </div>
  )
}

export default IntroAnimation