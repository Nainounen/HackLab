'use client';

import Link from 'next/link';

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
    color: "#000000",
    href: "https://github.com/unveroleone",
  },
];

export default function MobileFooter() {
  return (
    <footer className="fixed bottom-0 left-0 w-full md:hidden flex justify-around items-center bg-white/5 backdrop-blur-xl py-3 border-t border-white/10 z-50">
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 group"
        >
          <img
            src={social.icon}
            alt={social.label}
            className="w-6 h-6 group-hover:scale-110 transition-transform"
          />
          <span
            className="text-xs text-white"
            style={{ color: social.color }}
          >
            {social.label}
          </span>
        </a>
      ))}
    </footer>
  );
}
