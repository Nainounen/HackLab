import './globals.css'
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'INFRAconnect',
  description: 'Built for hackers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={orbitron.className}>{children}</body>
    </html>
  )
}
