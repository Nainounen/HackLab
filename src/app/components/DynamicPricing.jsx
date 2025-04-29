'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, animate } from 'framer-motion';

// Define constants outside component to prevent recreation on each render
const ADDONS = [
  { id: "ir", name: "IR Module", price: 4 },
  { id: "nrf", name: "NRF24 Module", price: 4 },
  { id: "cc1101", name: "CC1101 Module", price: 4 },
  { id: "m5", name: "M5Stick", price: 30 },
  { id: "all", name: "All-in-One", price: 35 },
];

// Animation configuration for better performance
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
  // Memoize price calculation to avoid recalculating unless dependencies change
  const totalPrice = useMemo(() => {
    return basePrice + selectedAddons.reduce((sum, id) => {
      const addon = ADDONS.find((a) => a.id === id);
      return addon ? sum + addon.price : sum;
    }, 0);
  }, [basePrice, selectedAddons]);

  // State to animate the current displayed price
  const [currentPrice, setCurrentPrice] = useState(totalPrice);

  // Memoize the handleAddToCart function to prevent recreating on each render
  const handleAddToCart = useCallback(() => {
    // Implementation of add to cart functionality
    console.log(`Adding to cart with price: ${totalPrice}`);
  }, [totalPrice]);

  useEffect(() => {
    // Animate the price change smoothly when totalPrice updates
    const controls = animate(currentPrice, totalPrice, {
      ...priceAnimationConfig,
      onUpdate: (v) => setCurrentPrice(v),
    });

    // Stop animation on component unmount or when effect re-runs
    return () => controls.stop();
  }, [totalPrice]); // Remove currentPrice from dependencies to prevent loop

  return (
    <section className="text-center py-20">
      {/* Animated price text with GPU acceleration */}
      <motion.p
        {...priceTextAnimationConfig}
        className="text-5xl font-semibold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text"
        style={{ willChange: 'opacity, transform' }}
      >
        {currentPrice.toFixed(2)}.–
      </motion.p>

      {/* Animated "Add to Cart" button with optimized GPU-accelerated animations */}
      <motion.button
        {...buttonAnimationConfig}
        className="bg-gradient-to-r from-purple-600 to-pink-500 px-10 py-4 rounded-full font-bold text-white"
        onClick={handleAddToCart}
        style={{ willChange: 'transform' }}
      >
        Add to Cart
      </motion.button>
    </section>
  );
}
