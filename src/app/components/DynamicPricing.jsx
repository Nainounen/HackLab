'use client'
import { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'

export default function DynamicPricing({ basePrice, selectedAddons }) {
  // Calculate total price including selected addons
  const totalPrice =
    basePrice +
    selectedAddons.reduce((sum, addon) => sum + parseFloat(addon.price), 0)

  // State to animate the current displayed price
  const [currentPrice, setCurrentPrice] = useState(totalPrice)

  useEffect(() => {
    // Animate the price change smoothly when totalPrice updates
    const controls = animate(currentPrice, totalPrice, {
      duration: 0.6,
      onUpdate: (v) => setCurrentPrice(v),
      ease: 'easeInOut',
    })

    // Stop animation on component unmount or when effect re-runs
    return () => controls.stop()
  }, [totalPrice])

  return (
    <section className="text-center py-20">
      {/* Animated price text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-semibold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text"
      >
        {currentPrice.toFixed(2)}.–
      </motion.p>

      {/* Animated "Add to Cart" button */}
      <motion.button
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-purple-600 to-pink-500 px-10 py-4 rounded-full font-bold text-white transition-transform duration-300"
      >
        Add to Cart
      </motion.button>
    </section>
  )
}
