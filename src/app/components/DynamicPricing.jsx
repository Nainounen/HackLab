'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, animate } from 'framer-motion';

// Define constants outside component to prevent recreation on each render
const ADDONS = [
  { id: "ir", name: "IR Module", price: 4 },
  { id: "nrf", name: "NRF24 Module", price: 4 },
  { id: "cc1101", name: "CC1101 Module", price: 4 },
  { id: "m5", name: "M5Stick", price: 30 }
];

// ✅ Dein korrekt sortiertes LINK_MAP hier einfügen:
const LINK_MAP = {
  "": "https://buy.stripe.com/dR6aH0aAn8sycjSaG8", // nur Hacklab
  "ir": "https://buy.stripe.com/6oEeXgbErbEKabKdSl",
  "nrf": "https://buy.stripe.com/dR69CW6k79wC97G8y2",
  "ir,nrf": "https://buy.stripe.com/5kAeXgfUH106dnW01x",
  "cc1101": "https://buy.stripe.com/28o8ySaAn6kq97GaGc",
  "cc1101,ir": "https://buy.stripe.com/eVa8ySbEraAG4Rq8y5",
  "cc1101,nrf": "https://buy.stripe.com/cN2aH023R4ci1Fe29I",
  "cc1101,ir,nrf": "https://buy.stripe.com/5kA2au5g3dMS1Fe6pZ",
  "m5stick": "https://buy.stripe.com/9AQeXgfUHfV02Ji7u4",
  "ir,m5stick": "https://buy.stripe.com/6oE4iCeQDbEK97G5lX",
  "nrf,m5stick": "https://buy.stripe.com/28ocP8aAnfV02Ji29M",
  "ir,nrf,m5stick": "https://buy.stripe.com/5kA4iCeQD5gm1Fe15J",
  "cc1101,m5stick": "https://buy.stripe.com/9AQdTc5g31066Zy8yc",
  "cc1101,ir,m5stick": "https://buy.stripe.com/7sI9CW6k76kq83C6q5",
  "cc1101,nrf,m5stick": "https://buy.stripe.com/bIY16q7ob8sygA8bKq",
  "cc1101,ir,nrf,m5stick": "https://buy.stripe.com/4gw2au7ob6kq83C5m3"
};




// Animation config
const priceAnimationConfig = {
  duration: 0.6,
  ease: 'easeInOut',
};

const buttonAnimationConfig = {
  whileHover: { scale: 1.07, transition: { type: 'spring', stiffness: 400, damping: 10 } },
  whileTap: { scale: 0.95 },
};

const priceTextAnimationConfig = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.5 }
};

export default function DynamicPricing({ basePrice, selectedAddons }) {
  const totalPrice = useMemo(() => {
    return basePrice + selectedAddons.reduce((sum, id) => {
      const addon = ADDONS.find((a) => a.id === id);
      return addon ? sum + addon.price : sum;
    }, 0);
  }, [basePrice, selectedAddons]);

  const [currentPrice, setCurrentPrice] = useState(totalPrice);

  // ✅ Mapping user-visible IDs to internal keys used in LINK_MAP
  const redirectUrl = useMemo(() => {
    const mappedKeys = {
      ir: 'ir',
      nrf: 'nrf',
      cc1101: 'cc1101',
      m5: 'm5stick'
    };

    const mappedAddons = selectedAddons
      .map(id => mappedKeys[id])
      .filter(Boolean)
      .sort();

    const key = mappedAddons.join(',');
    return LINK_MAP[key];
  }, [selectedAddons]);

  const handleAddToCart = useCallback(() => {
    window.location.href = redirectUrl;
  }, [redirectUrl]);

  useEffect(() => {
    const controls = animate(currentPrice, totalPrice, {
      ...priceAnimationConfig,
      onUpdate: (v) => setCurrentPrice(v),
    });

    return () => controls.stop();
  }, [totalPrice]);

  return (
    <section className="text-center py-20">
      <motion.p
        {...priceTextAnimationConfig}
        className="text-5xl font-semibold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text"
        style={{ willChange: 'opacity, transform' }}
      >
        {currentPrice.toFixed(2)}.–
      </motion.p>

      <motion.button
        {...buttonAnimationConfig}
        className="bg-gradient-to-r from-purple-600 to-pink-500 px-10 py-4 rounded-full font-bold text-white"
        onClick={handleAddToCart}
        style={{ willChange: 'transform' }}
      >
        Pre-Order
      </motion.button>
    </section>
  );
}
