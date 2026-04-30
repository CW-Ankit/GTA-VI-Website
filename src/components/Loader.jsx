/**
 * @file Loader.jsx
 * @description Handles the pre-intro brand presence.
 * It ensures the "VI" logo is visible immediately, then seamlessly
 * integrates the mask image once it's loaded.
 */

const Loader = ({ isImageReady }) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black overflow-hidden">
      <svg viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice' className="w-full h-full">
        <defs>
          {/* 
              The mask defines which parts of the image are visible.
              Anything inside the <text> element (white) will show the image.
              The <rect> (black) hides everything else.
          */}
          <mask id='loaderMask'>
            <rect width='100%' height='100%' fill='black' />
            <text 
              x="50%" 
              y="50%" 
              fontSize="250" 
              textAnchor='middle' 
              fill='white' 
              dominantBaseline='middle' 
              fontFamily='Arial Black'
            >
              VI
            </text>
          </mask>
        </defs>
        
        {/* 
            If the image is loaded, we use the mask to show the image inside the "VI".
            This creates a perfect bridge to the IntroAnimation.
        */}
        {isImageReady && (
          <image href='./bg1.png' width='100%' height='100%' preserveAspectRatio='xMidYMid slice' mask="url(#loaderMask)" />
        )}
        
        {/* 
            Fallback: If the image isn't ready yet, just show a white "VI".
            This ensures the user doesn't see a blank black screen.
        */}
        {!isImageReady && (
          <text 
            x="50%" 
            y="50%" 
            fontSize="250" 
            textAnchor='middle' 
            fill='white' 
            dominantBaseline='middle' 
            fontFamily='Arial Black'
          >
            VI
          </text>
        )}
      </svg>
    </div>
  );
};

export default Loader;