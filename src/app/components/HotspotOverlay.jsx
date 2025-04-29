'use client'

import { memo } from 'react';
import { motion } from 'framer-motion';

// Define static hotspots outside component to prevent recreating on each render
const hotspots = [
  { 
    title: 'MicroSD Slot',
    description: 'Insert a microSD card for additional storage',
    top: '65%', 
    left: '44%',
    tooltipPosition: 'left'
  },
  { 
    title: 'RF Socket',
    description: 'Connect external RF communication modules (e.g., NRF24, CC1101).',
    top: '58%', 
    left: '28%',
    tooltipPosition: 'right'
  },
  { 
    title: 'TX Header',
    description: 'IR Transmitter (TX) pin for better range',
    top: '12%', 
    left: '52.7%',
    tooltipPosition: 'right'
  },
  { 
    title: 'RX Header',
    description: 'Receiver (RX) pin to copy signals',
    top: '12%', 
    left: '58.5%',
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

// Memoized Hotspot component to prevent unnecessary re-renders
const Hotspot = memo(({ spot }) => {
  const tooltipClass = `absolute ${
    spot.tooltipPosition === 'right' ? 'right-8' : 'left-8'
  } top-1/2 -translate-y-1/2 bg-black/90 text-white text-sm p-4 rounded-xl w-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl`;

  return (
    <div className="absolute group" style={{ top: spot.top, left: spot.left }}>
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
      {/* PCB Image - add loading="eager" for key above-the-fold image */}
      <img
        src="/tool1.png"
        alt="Hacklab Tool"
        className="w-full max-w-xl rounded-xl"
        loading="eager"
      />

      {/* Hotspots */}
      {hotspots.map((spot, i) => (
        <Hotspot key={i} spot={spot} />
      ))}
    </section>
  );
}

// Memoize the entire component since it doesn't have changing props
export default memo(HotspotOverlay);
