'use client';

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from 'next/link';

const ADDONS = [
  { id: "ir", name: "IR Module", price: 4, description: "Infrared sensor and transmitter" },
  { id: "nrf", name: "NRF24 Module", price: 4, description: "Wi-Fi / Bluetooth radio module" },
  { id: "cc1101", name: "CC1101 Module", price: 4, description: "433 MHz radio module" },
  { id: "m5", name: "M5Stick", price: 30, description: "M5Stick C Plus 2" },
  { id: "all", name: "All-in-One", price: 35, description: "M5Stick C Plus 2 with all modules" },
];

// Memoize navigation and social links to prevent recreating on each render
const NAVIGATION_LINKS = [
  { label: "UnyxRF", href: "#unyxrf" },
  { label: "Addons", href: "#addons" },
  { label: "Cart", href: "#cart" },
];

const SOCIAL_LINKS = [
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
];

export default function FuturisticNavbar({ selectedAddons, setSelectedAddons }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [expandTimeout, setExpandTimeout] = useState(null);

  // Memoized toggle function to prevent recreation on each render
  const toggleAddon = useCallback((id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, [setSelectedAddons]);

  // Debounced expand/collapse handlers to prevent rapid toggling
  const handleExpandNavbar = useCallback(() => {
    if (expandTimeout) clearTimeout(expandTimeout);
    setIsExpanded(true);
  }, [expandTimeout]);

  const handleCollapseNavbar = useCallback(() => {
    if (expandTimeout) clearTimeout(expandTimeout);
    const timeout = setTimeout(() => setIsExpanded(false), 100);
    setExpandTimeout(timeout);
  }, [expandTimeout]);

  // Handle animation classes based on expanded state
  useEffect(() => {
    if (isExpanded) {
      setAnimationClass("animate-slide-in");
    } else {
      setAnimationClass("animate-slide-out");
    }
    
    // Cleanup timeout on unmount
    return () => {
      if (expandTimeout) clearTimeout(expandTimeout);
    };
  }, [isExpanded, expandTimeout]);

  // Memoize addon active status calculation to avoid recalculating each render
  const addonActiveStatus = useMemo(() => {
    return ADDONS.reduce((acc, addon) => {
      acc[addon.id] = selectedAddons.includes(addon.id);
      return acc;
    }, {});
  }, [selectedAddons]);

  return (
    <>
      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-100%); opacity: 0; }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease forwards;
          will-change: transform, opacity;
        }
        
        .animate-slide-out {
          animation: slideOut 0.3s ease forwards;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Compact addon selector bubbles */}
      <div
        onMouseEnter={handleExpandNavbar}
        className={`fixed top-1/2 -translate-y-1/2 left-0 z-40
                   flex flex-col items-center gap-4
                   px-4 py-6 w-[60px]
                   bg-white/5 backdrop-blur-xl border border-white/10
                   rounded-tr-[2rem] rounded-br-[2rem]
                   shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                   transition-all duration-300 ease-in-out
                   will-change-[opacity,transform]
                   ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        {ADDONS.map((addon) => {
          const active = addonActiveStatus[addon.id];
          return (
            <div
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              className={`w-4 h-4 rounded-full cursor-pointer transition-all 
                ${active
                  ? "bg-[#C77DFF]"
                  : "bg-white/10 border border-white/30 hover:bg-white/30"}`}
            />
          );
        })}
      </div>

      {/* Expanded navbar */}
      <div
        onMouseEnter={handleExpandNavbar}
        onMouseLeave={handleCollapseNavbar}
        className={`fixed top-1/2 -translate-y-1/2 left-0
                   w-[200px] h-[92vh] flex flex-col justify-between items-start py-6 px-6
                   rounded-tr-[2.5rem] rounded-br-[2.5rem] bg-white/5 backdrop-blur-xl
                   border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-50
                   will-change-[transform,opacity]
                   ${animationClass}
                   ${!isExpanded && !animationClass ? 'hidden' : ''}`}
      >
        {/* Navigation links */}
        <div className="flex flex-col items-start gap-6 mt-2 w-full">
        {NAVIGATION_LINKS.map((item) => (
          <Link key={item.label} href={item.href} className="w-full">
            <div className="flex items-center gap-4 w-full cursor-pointer group">
              <div className="w-3 h-3 rounded-full bg-white/30 group-hover:bg-[#C77DFF] transition-all" />
              <span className="text-white text-sm font-semibold">{item.label}</span>
            </div>
          </Link>
        ))}
        </div>

        {/* Addon toggles */}
        <div className="flex flex-col items-start gap-6 mt-10 w-full">
          {ADDONS.map((addon) => {
            const active = addonActiveStatus[addon.id];
            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className="flex items-center gap-4 w-full group cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 transition-all transform
                    ${active
                      ? "bg-[#C77DFF] border-[#9D4EDD]"
                      : "bg-white/10 border-white/20 group-hover:border-white/50"
                    }`}
                />
                <span className="text-white text-sm font-medium">{addon.name}</span>
              </div>
            );
          })}
        </div>

        {/* Social media links */}
        <div className="flex flex-col items-start gap-5 text-white/40 text-xl mt-4 w-full">
          {SOCIAL_LINKS.map((social) => (
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
                className="w-6 h-6 group-hover:scale-110 transition-transform will-change-transform"
              />
              <span
                className="text-sm font-medium"
                style={{ color: social.color }}
              >
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
