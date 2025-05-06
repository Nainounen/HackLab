'use client';

import { useEffect, useState, useCallback } from 'react';
import InteractiveParticles from './components/InteractiveParticles';
import FuturisticNavbar from './components/FuturisticNavbar';
import TitleHero from './components/TitleHero';
import DynamicPricing from './components/DynamicPricing';
import HotspotOverlay from './components/HotspotOverlay';
import MobileFooter from './components/MobileFooter';


const addons = [
  { id: 'ir', title: 'Add-on 1: IR Modules', price: 4, desc: 'Infrared sensor and Transmitter' },
  { id: 'nrf', title: 'Add-on 2: NRF24 Module', price: 4, desc: 'Wi-Fi / Bluetooth radio module' },
  { id: 'cc1101', title: 'Add-on 3: CC1101 Module', price: 4, desc: '433 MHz radio module' },
  { id: 'm5', title: 'Add-on 4: M5Stick', price: 30, desc: 'M5Stick C Plus 2' },
  
];

export default function Page() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const basePrice = 19.99;
  const [selectedAddons, setSelectedAddons] = useState([]);

  const toggleAddon = useCallback((id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial Size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id="title" className="relative min-h-screen text-white overflow-hidden">
      <InteractiveParticles />
      {windowSize.width >= 768 && (
        <FuturisticNavbar selectedAddons={selectedAddons} setSelectedAddons={setSelectedAddons} />
      )}

      {windowSize.width < 768 && (
        <MobileFooter />
      )}
      <TitleHero />
      <HotspotOverlay id="unyxrf" />
      <DynamicPricing basePrice={basePrice} selectedAddons={selectedAddons} />
        {/* Free shipping promo message */}
      <div className="flex justify-center items-center py-4">
        <div className="bg-gradient-to-r from-purple-700/30 to-pink-600/30 backdrop-blur-sm px-8 py-4 rounded-xl border border-white/10">
          <p className="text-lg font-medium text-white flex items-center gap-2">
            <span className="text-xl">🚚</span> Free shipping with any add-on of your choice!
          </p>
        </div>
      </div>
      <section id="addons" className="py-24 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {addons.map((a) => {
          const selected = selectedAddons.includes(a.id);

          const handleToggle = () => toggleAddon(a.id); // Funktion nur einmal pro Addon!

          return (
            <div
              key={a.id}
              className={`p-6 border rounded-3xl shadow-xl bg-white/5 backdrop-blur-md ${
                selected ? 'ring-2 ring-pink-500' : ''
              } hover:scale-105 transition-all group`}
            >
              <h3 className="text-xl font-semibold mb-2 text-white">{a.title}</h3>
              <p className="text-gray-300 mb-4">{a.desc}</p>
              <button
                onClick={handleToggle}
                className={`w-full mt-auto px-4 py-2 rounded-full font-medium shadow transition-all ${
                  selected
                    ? 'bg-pink-600 text-white'
                    : 'bg-gradient-to-r from-purple-700 to-pink-600 text-white hover:brightness-110'
                }`}
              >
                {selected ? 'Remove' : `ADD + ${a.price}`}
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
}
