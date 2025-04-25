'use client'
import { motion } from 'framer-motion'

export default function TitleHero() {
  return (
    <section className="relative z-10 text-center py-36 px-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-400"
      >
        HACKLAB TOOL
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-gray-300 text-lg max-w-2xl mx-auto mt-6"
      >
        INFRAconnect is your compact, powerful sidekick for smart tech projects.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-gray-500 mt-4"
      >
        At home, in the lab, or on the go.
      </motion.p>
    </section>
  )
}
