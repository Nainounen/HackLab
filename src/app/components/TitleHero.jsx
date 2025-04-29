'use client'

import { memo } from 'react';

const TitleHero = () => {
  return (
    <section className="relative z-10 text-center py-36 px-6">
      <h1
        className="text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-400"
        style={{ willChange: 'transform' }}
      >
        HACKLAB TOOL
      </h1>

      <p
        className="text-gray-300 text-lg max-w-2xl mx-auto mt-6"
      >
        UnyxRF, one board to rule them all.
      </p>

      <p
        className="text-gray-500 mt-4"
      >
        At home, in the lab, or on the go.
      </p>
    </section>
  )
}

// Memoize the component since it doesn't have props and doesn't need to re-render
export default memo(TitleHero);
