'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import InteractiveParticles from './components/InteractiveParticles';
import FuturisticNavbar from './components/FuturisticNavbar';
import TitleHero from './components/TitleHero';
import DynamicPricing from './components/DynamicPricing';
import HotspotOverlay from './components/HotspotOverlay';

const addons = [
  { id: 'ir', title: 'Add-on 1: IR Modules', price: 4, desc: 'Infrared sensor and Transmitter' },
  { id: 'nrf', title: 'Add-on 2: NRF24 Module', price: 4, desc: 'Wi-Fi / Bluetooth radio module' },
  { id: 'cc1101', title: 'Add-on 3: CC1101 Module', price: 4, desc: '433 MHz radio module' },
  { id: 'm5', title: 'Add-on 4: M5Stick', price: 30, desc: 'M5Stick C Plus 2' },
  { id: 'all', title: 'Add-on 5: All-in-One', price: 35, desc: 'M5Stick C Plus 2 with all modules' },
];

export default function Page() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const basePrice = 15;
  const [selectedAddons, setSelectedAddons] = useState([]);

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y]);

  const rotateX = useTransform(y, [0, windowSize.height], [15, -15]);
  const rotateY = useTransform(x, [0, windowSize.width], [-15, 15]);

  return (
    <div id="title" className="relative min-h-screen text-white overflow-hidden">
      <InteractiveParticles />
      <FuturisticNavbar selectedAddons={selectedAddons} setSelectedAddons={setSelectedAddons} />

      {/* Hero Title */}
      <TitleHero />

      {/* PCB with Hotspots */}
      <HotspotOverlay id="unyxrf" />

      {/* Dynamic Price Section */}
      <DynamicPricing basePrice={basePrice} selectedAddons={selectedAddons} />

      {/* Add-ons */}
      <section id="addons" className="py-24 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {addons.map((a, i) => {
          const selected = selectedAddons.includes(a.id);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-6 border rounded-3xl shadow-xl bg-white/5 backdrop-blur-md ${
                selected ? 'ring-2 ring-pink-500' : ''
              } hover:scale-105 transition-all group`}
            >
              <h3 className="text-xl font-semibold mb-2 text-white">{a.title}</h3>
              <p className="text-gray-300 mb-4">{a.desc}</p>
              <button
                onClick={() => toggleAddon(a.id)}
                className={`w-full mt-auto px-4 py-2 rounded-full font-medium shadow transition-all ${
                  selected
                    ? 'bg-pink-600 text-white'
                    : 'bg-gradient-to-r from-purple-700 to-pink-600 text-white hover:brightness-110'
                }`}
              >
                {selected ? 'Remove' : `ADD + ${a.price}`}
              </button>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
