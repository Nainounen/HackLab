'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, animate } from 'framer-motion';

// Einheitliche Add-ons
const ADDONS = [
  { id: "ir", name: "IR Module", price: 4 },
  { id: "nrf", name: "NRF24 Module", price: 4 },
  { id: "cc1101", name: "CC1101 Module", price: 4 },
  { id: "m5", name: "M5Stick", price: 30 }
];

// Neue Version des LINK_MAP – Schlüssel sind Arrays!
const LINK_MAP = [
  { addons: [], url: "https://buy.stripe.com/28o02mcIv24a4Rq3dW" },
  { addons: ["cc1101"], url: "https://buy.stripe.com/dR6aH0eQD8sy97GdSE" },
  { addons: ["cc1101", "ir"], url: "https://buy.stripe.com/28odTc37VeQWabK4i5" },
  { addons: ["cc1101", "ir", "m5"], url: "https://buy.stripe.com/14k5mG7obgZ4es0cOJ" },
  { addons: ["cc1101", "ir", "nrf"], url: "https://buy.stripe.com/8wMcP89wj6kq4Rq9Cr" },
  { addons: ["cc1101", "ir", "nrf", "m5"], url: "https://buy.stripe.com/4gw5mG23R38e97GbKH" },
  { addons: ["cc1101", "m5"], url: "https://buy.stripe.com/28obL4aAn4ci83Cg0U" },
  { addons: ["cc1101", "nrf"], url: "https://buy.stripe.com/5kAbL40ZN9wCgA89Cq" },
  { addons: ["cc1101", "nrf", "m5"], url: "https://buy.stripe.com/6oE4iCgYL5gm2Ji2a6" },
  { addons: ["ir"], url: "https://buy.stripe.com/5kA9CWfUH24abfO7ud" },
  { addons: ["ir", "m5"], url: "https://buy.stripe.com/28oaH09wj7ou6ZydSJ" },
  { addons: ["ir", "nrf"], url: "https://buy.stripe.com/9AQdTceQDcIOes0bKv" },
  { addons: ["ir", "nrf", "m5"], url: "https://buy.stripe.com/fZe7uOgYL8sy2Ji2a3" },
  { addons: ["m5"], url: "https://buy.stripe.com/7sIaH0cIvgZ4cjS2a0" },
  { addons: ["nrf"], url: "https://buy.stripe.com/dR66qK23R4ci5Vu3dY" },
  { addons: ["nrf", "m5"], url: "https://buy.stripe.com/eVabL4gYLgZ43NmbKC" },
];

// Helper: Vergleicht zwei Arrays ungeachtet der Reihenfolge
function arraysEqualAsSets(a, b) {
  if (a.length !== b.length) return false;
  const setA = new Set(a);
  const setB = new Set(b);
  for (const val of setA) {
    if (!setB.has(val)) return false;
  }
  return true;
}

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

  const redirectUrl = useMemo(() => {
    const match = LINK_MAP.find(entry => arraysEqualAsSets(entry.addons, selectedAddons));
    if (!match) {
      console.warn(`❌ Kein Stripe-Link gefunden für Auswahl: [${selectedAddons.join(', ')}]`);
      return LINK_MAP[0].url;
    }
    return match.url;
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
