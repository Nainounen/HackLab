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
  "": "https://buy.stripe.com/bIYaH0fUHdMS6Zy7tG",
  "cc1101": "https://buy.stripe.com/14k7uOaAneQWes0aFW",
  "cc1101,ir": "https://buy.stripe.com/eVa3eyeQDeQWbfO3dv",
  "cc1101,ir,m5stick": "https://buy.stripe.com/fZe4iCfUH8sy4Rq15v",
  "cc1101,ir,nrf": "https://buy.stripe.com/fZe6qK23R8sy3Nm3dx",
  "cc1101,ir,m5stick,nrf": "https://buy.stripe.com/7sI2aueQD9wC97G6pR", // ✅ hinzugefügt
  "cc1101,m5stick": "https://buy.stripe.com/9AQeXg9wj6kqgA815u",
  "cc1101,nrf": "https://buy.stripe.com/fZedTcdMz7ougA8aFY",
  "cc1101,m5stick,nrf": "https://buy.stripe.com/7sIeXggYL10683C7tU",
  "ir": "https://buy.stripe.com/4gwg1k37VfV0abK6pD",
  "ir,m5stick": "https://buy.stripe.com/00geXgcIv8syes07tP",
  "ir,nrf": "https://buy.stripe.com/4gwg1k6k7106es0eWb",
  "ir,m5stick,nrf": "https://buy.stripe.com/5kAbL4bErbEKabK4hF",
  "m5stick": "https://buy.stripe.com/4gw3eyfUH24a4Rq29u",
  "nrf": "https://buy.stripe.com/7sI2augYL10683CcO2",
  "m5stick,nrf": "https://buy.stripe.com/cN2cP8cIvfV0es0eWi"
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
      .sort(); // sort alphabetically to match LINK_MAP

    const key = mappedAddons.join(',');
    return LINK_MAP[key] || 'https://yourdomain.com/error';
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
