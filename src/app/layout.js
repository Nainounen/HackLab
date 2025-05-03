import './globals.css'




export const metadata = {
  title: 'Hacklab',
  description: 'Built for hackers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
