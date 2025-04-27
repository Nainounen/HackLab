'use client';

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Link from 'next/link';

const ADDONS = [
  { id: "ir", name: "IR Module", price: 4, description: "Infrared sensor and transmitter" },
  { id: "nrf", name: "NRF24 Module", price: 4, description: "Wi-Fi / Bluetooth radio module" },
  { id: "cc1101", name: "CC1101 Module", price: 4, description: "433 MHz radio module" },
  { id: "m5", name: "M5Stick", price: 30, description: "M5Stick C Plus 2" },
  { id: "all", name: "All-in-One", price: 35, description: "M5Stick C Plus 2 with all modules" },
]
export default function FuturisticNavbar({ selectedAddons, setSelectedAddons }) {
  const [cursorPos, setCursorPos] = useState({ x: 100, y: 100 });
  const [isHovered, setIsHovered] = useState(false);

  // Y position value that reacts to scroll
  const rawY = useMotionValue(0);
  const springY = useSpring(rawY, {
    stiffness: 80,
    damping: 18,
    mass: 0.5,
  });

  // Update Y value on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      rawY.set(offset / 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle selection of addons
  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };  

  return (
    <>
      {/* 💠 Compact addon selector bubbles (visible when navbar is hidden) */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div
            key="addon-bubbles"
            onMouseEnter={() => setIsHovered(true)}
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 -translate-y-1/2 left-0 z-40
                       flex flex-col items-center gap-4
                       px-4 py-6 w-[60px]
                       bg-white/5 backdrop-blur-xl border border-white/10
                       rounded-tr-[2rem] rounded-br-[2rem]
                       shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          >
            {ADDONS.map((addon) => {
              const active = selectedAddons.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`w-4 h-4 rounded-full cursor-pointer transition-all 
                    ${active
                      ? "bg-[#C77DFF] shadow-[0_0_10px_#C77DFF]"
                      : "bg-white/10 border border-white/30 hover:bg-white/30"}`}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 Expanded navbar that appears on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="navbar"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setCursorPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed top-1/2 -translate-y-1/2
                       w-[200px] h-[92vh] flex flex-col justify-between items-start py-6 px-6
                       rounded-tr-[2.5rem] rounded-br-[2.5rem] bg-white/5 backdrop-blur-xl
                       border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-50"
            initial={{ x: -220, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -220, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* 💫 Dynamic background shadow based on cursor */}
            <AnimatePresence>
              <motion.div
                key="shadow"
                className="absolute z-[-2] blur-3xl rounded-tr-[2.5rem] rounded-br-[2.5rem] pointer-events-none"
                style={{
                  top: `calc(50vh - 46vh + ${cursorPos.y / 12}px)`,
                  width: "200px",
                  height: "92vh",
                  background: "radial-gradient(ellipse at center, rgba(0,0,0,0.4), transparent 70%)",
                  transform: `translate(${(cursorPos.x - 100) / 5}px, ${(cursorPos.y - 200) / 5}px)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* ✨ Glowing radial light around cursor */}
            <AnimatePresence>
              <motion.div
                key="glow"
                className="absolute w-[300px] h-[300px] rounded-full pointer-events-none z-[-1]"
                style={{
                  top: cursorPos.y - 150,
                  left: cursorPos.x - 150,
                  background: `radial-gradient(circle, rgb(205, 141, 255) 0%, rgb(144, 0, 255) 40%, rgba(36,0,70,0.05) 100%)`,
                  filter: "blur(90px)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>

            {/* 🌐 Glow border that follows cursor */}
            <AnimatePresence>
              <motion.div
                key="glow-border"
                className="absolute inset-0 pointer-events-none z-[1] rounded-tr-[2.5rem] rounded-br-[2.5rem]"
                style={{
                  border: "2px solid transparent",
                  background: `radial-gradient(
                    400px circle at ${cursorPos.x}px ${cursorPos.y}px,
                    rgba(199,125,255,0.5),
                    transparent 80%
                  )`,
                  maskImage: "linear-gradient(#fff 0 0)",
                  WebkitMaskImage: "linear-gradient(#fff 0 0)",
                  filter: "blur(6px)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>

            {/* 🧭 Navigation links */}
            <div className="flex flex-col items-start gap-6 mt-2 w-full">
            {[
              { label: "UnyxRF", href: "#unyxrf" },
              { label: "Addons", href: "#addons" },
              { label: "Cart", href: "#cart" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="w-full">
                <div className="flex items-center gap-4 w-full cursor-pointer group">
                  <div className="w-3 h-3 rounded-full bg-white/30 group-hover:bg-[#C77DFF] transition-all" />
                  <span className="text-white text-sm font-semibold">{item.label}</span>
                </div>
              </Link>
            ))}
            </div>

            {/* 🧩 Addon toggles */}
            <div className="flex flex-col items-start gap-6 mt-10 w-full">
              {ADDONS.map((addon) => {
                const active = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className="flex items-center gap-4 w-full group cursor-pointer"
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-2 transition-all
                        ${active
                          ? "bg-[#C77DFF] border-[#9D4EDD] shadow-[0_0_25px_#C77DFF]"
                          : "bg-white/10 border-white/20 group-hover:border-white/50"
                        }`}
                    />
                    <span className="text-white text-sm font-medium">{addon.name}</span>
                  </div>
                );
              })}
            </div>

            {/* 🌐 Social media links */}
            <div className="flex flex-col items-start gap-5 text-white/40 text-xl mt-4 w-full">
              {[
                {
                  icon: "/discord.svg",
                  label: "Discord",
                  color: "#7289DA",
                  href: "https://discord.gg/R8QJKCFYr9",
                },
                {
                  icon: "/tiktok.svg",
                  label: "TikTok",
                  color: "#69C9D0",
                  href: "https://www.tiktok.com/@unveroleone",
                },
                {
                  icon: "/github.svg",
                  label: "GitHub",
                  color: "#00000",
                  href: "https://github.com/unveroleone",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group w-full"
                >
                  <img
                    src={social.icon}
                    alt={social.label}
                    className="w-6 h-6 group-hover:scale-110 transition-transform"
                  />
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: social.color,
                      textShadow: `0 0 8px ${social.color}80`,
                    }}
                  >
                    {social.label}
                  </span>
                </a>
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
