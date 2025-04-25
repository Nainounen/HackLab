'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import InteractiveParticles from './components/InteractiveParticles'
import FuturisticNavbar from './components/FuturisticNavbar'
import TitleHero from './components/TitleHero'
import DynamicPricing from './components/DynamicPricing'


export default function Page() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const basePrice = 150
  const [selectedAddons, setSelectedAddons] = useState([])

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) => {
      const exists = prev.find((a) => a.title === addon.title)
      return exists
        ? prev.filter((a) => a.title !== addon.title)
        : [...prev, addon]
    })
  }

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    const handleMouseMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y])

  const rotateX = useTransform(y, [0, windowSize.height], [15, -15])
  const rotateY = useTransform(x, [0, windowSize.width], [-15, 15])

  return (
    <div className="relative min-h-screen text-white overflow-hidden cursor-none">
      <InteractiveParticles />
      <FuturisticNavbar />

      {/* Cursor Follower */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg"
        style={{
          x: useTransform(x, (val) => val - 12),
          y: useTransform(y, (val) => val - 12),
        }}
      />

      {/* Hero Title */}
      <TitleHero />

      {/* Produktbild – floating, z-10 */}
      <section className="flex justify-center items-center py-10 relative z-10">
        <motion.img
          src="/tool1.png"
          alt="Hacklab Tool"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: [20, -10, 20] }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className="w-full max-w-xl rounded-xl z-10"
        />
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-20 py-16">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
            className="group bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/10 hover:scale-[1.04] transition-transform duration-300"
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <p className="text-white/90 text-lg font-medium group-hover:scale-105 transition-transform">
              {f.title}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Dynamic Price Section */}
      <DynamicPricing basePrice={basePrice} selectedAddons={selectedAddons} />

      {/* Add-ons */}
      <section className="py-24 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {addons.map((a, i) => {
          const selected = selectedAddons.find((sa) => sa.title === a.title)
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-xl hover:scale-105 transition-all group ${
                selected ? 'ring-2 ring-pink-500' : ''
              }`}
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                {a.title}
              </h3>
              <p className="text-gray-300 mb-4">{a.desc}</p>
              <button
                onClick={() => toggleAddon(a)}
                className={`w-full mt-auto px-4 py-2 rounded-full font-medium shadow transition-all ${
                  selected
                    ? 'bg-pink-600 text-white'
                    : 'bg-gradient-to-r from-purple-700 to-pink-600 text-white hover:brightness-110'
                }`}
              >
                {selected ? 'Remove' : `ADD + ${a.price}`}
              </button>
            </motion.div>
          )
        })}
      </section>
    </div>
  )
}

const features = [
  { icon: '🏠', title: 'Smart Home Motion Alarms' },
  { icon: '📱', title: 'Mobile data logging with wireless sync' },
  { icon: '🧠', title: 'Mini control and display unit' },
  { icon: '🕹️', title: 'Touchless remote control systems' },
]

const addons = [
  {
    title: 'Add-on 1: IR Module',
    price: '15',
    desc: 'Infrared sensor for remote control signals',
  },
  {
    title: 'Add-on 2: NRF Module',
    price: '15',
    desc: 'Wi-Fi / Bluetooth real-time communication',
  },
  {
    title: 'Add-on 3: M5Stick',
    price: '15',
    desc: 'Mini controller with sensors & display',
  },
]
