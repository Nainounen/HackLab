'use client'

import { motion } from 'framer-motion'

const hotspots = [
  { 
    title: 'MicroSD Slot',
    description: 'Insert a microSD card for additional storage',
    top: '65%', 
    left: '46%' 
  },
  { 
    title: 'RF Socket',
    description: 'Connect external RF communication modules (e.g., NRF24, CC1101).',
    top: '58%', 
    left: '35%' 
  },
  { 
    title: 'TX Header',
    description: 'IR Transmitter (TX) pin for better range',
    top: '12%', 
    left: '51.8%' 
  },
  { 
    title: 'RX Header',
    description: 'Receiver (RX) pin to copy signals',
    top: '12%', 
    left: '55.8%' 
  },
]



export default function HotspotOverlay() {
  return (
    <section className="relative flex justify-center items-center py-10">
      {/* Dein PCB Bild */}
      <img
        src="/tool1.png"
        alt="Hacklab Tool"
        className="w-full max-w-xl rounded-xl"
      />

    {/* Hotspots */}
    {hotspots.map((spot, i) => (
      <div key={i} className="absolute group" style={{ top: spot.top, left: spot.left }}>
        {/* Punkt */}
        <motion.div
          className="w-4 h-4 bg-pink-500 rounded-full shadow-lg cursor-pointer"
          whileHover={{ scale: 1.5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        ></motion.div>

        <div className="relative">
          {/* Strom-Animation außen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-white to-transparent bg-[length:200%_100%] bg-clip-border animate-borderPulse pointer-events-none"
          ></motion.div>

          {/* Tooltip-Box */}
          <div
            className={`absolute ${
              (spot.title === 'TX Header' || spot.title === 'RF Socket') ? 'right-8' : 'left-8'
            } top-1/2 -translate-y-1/2 bg-black/90 text-white text-sm p-4 rounded-xl w-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl`}
          >
            <h3 className="font-bold mb-1">{spot.title}</h3>
            <p className="text-gray-300">{spot.description}</p>
          </div>
        </div>
      </div>
    ))}
    </section>
  )
}
