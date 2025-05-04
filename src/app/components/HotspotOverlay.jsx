'use client'

import { memo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Define static hotspots outside component to prevent recreating on each render
const hotspots = [
  { 
    title: 'MicroSD Slot',
    description: 'Insert a microSD card for additional storage',
    top: '45%', 
    left: '33%',
    tooltipPosition: 'left'
  },
  { 
    title: 'RF Socket',
    description: 'Connect external RF communication modules (e.g., NRF24, CC1101).',
    top: '54%', 
    left: '3%',
    tooltipPosition: 'right'
  },
  { 
    title: 'TX Header',
    description: 'IR Transmitter (TX) pin for better range',
    top: '12%', 
    left: '46%',
    tooltipPosition: 'right'
  },
  { 
    title: 'RX Header',
    description: 'Receiver (RX) pin to copy signals',
    top: '12%', 
    left: '65.4%',
    tooltipPosition: 'left'
  },
];

// Pre-defined animation variants for better performance
const dotVariants = {
  initial: {},
  hover: { scale: 1.5 }
};

const pulseVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

const Hotspot = memo(({ spot }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const hotspotRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Outside Click schließen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hotspotRef.current && !hotspotRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };
    if (isMobile) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      if (isMobile) {
        document.removeEventListener('click', handleClickOutside);
      }
    };
  }, [isMobile]);

const leftValue = parseFloat(spot.left); // Prozentwert als Zahl

const tooltipClass = `absolute ${
    isMobile
      ? `
        bottom-full mb-2 
        ${leftValue < 20 ? 'left-[10%]' : leftValue > 80 ? 'right-[10%]' : 'left-1/2 -translate-x-1/2'}
      `
      : spot.tooltipPosition === 'right' ? 'right-8' : 'left-8'
  } top-1/2 -translate-y-1/2 bg-black/90 text-white text-sm p-4 rounded-xl 
  transition-opacity duration-300 pointer-events-none shadow-xl z-50 ${
    (isMobile && showTooltip) ? 'opacity-100' : (!isMobile ? 'group-hover:opacity-100 opacity-0' : 'opacity-0')
  } 
  w-[clamp(150px,60vw,240px)]`;

  return (
    <div
      ref={hotspotRef}
      className="absolute group"
      style={{ top: spot.top, left: spot.left }}
      onClick={(e) => {
        if (isMobile) {
          setShowTooltip(true);
          e.stopPropagation(); // Verhindert, dass der Outside-Click sofort wieder schliesst
        }
      }}
    >
      {/* Dot */}
      <motion.div
        className="w-4 h-4 bg-pink-500 rounded-full shadow-lg cursor-pointer"
        variants={dotVariants}
        whileHover="hover"
        transition={{ type: 'spring', stiffness: 300 }}
        style={{ willChange: 'transform' }}
      ></motion.div>

      <div className="relative">
        {/* Pulse animation */}
        <motion.div
          variants={pulseVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-white to-transparent bg-[length:200%_100%] bg-clip-border animate-borderPulse pointer-events-none"
          style={{ willChange: 'opacity' }}
        ></motion.div>

        {/* Tooltip */}
        <div className={tooltipClass}>
          <h3 className="font-bold mb-1">{spot.title}</h3>
          <p className="text-gray-300">{spot.description}</p>
        </div>
      </div>
    </div>
  );
});

Hotspot.displayName = 'Hotspot';

function HotspotOverlay() {
  return (
    <section className="relative flex justify-center items-center py-10">
      <div className="relative w-full max-w-3xl rounded-xl">
        {/* PCB Image */}
        <img
          src="/UnyxRF.png"
          alt="Hacklab Tool"
          className="w-full rounded-xl"
          loading="eager"
        />

        {/* Hotspots */}
        {hotspots.map((spot, i) => (
          <Hotspot key={i} spot={spot} />
        ))}
      </div>
    </section>
  );
}

export default memo(HotspotOverlay);
