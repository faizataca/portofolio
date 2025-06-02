import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'faiz ata',
  description: 'portofolio website',
  openGraph: {
    title: 'faiz ata',
    description: 'portofolio website',
    images: [
      {
        url: '/prev1.png', // pastikan file ini ada di public/
        width: 1200,
        height: 630,
        alt: 'faiz ata portofolio preview',
      },
    ],
  },
  icons: {
    icon: '/favicon.png', // favicon pakai PNG
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png', // opsional, kalau ada
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon untuk browser */}
        <link rel="icon" type="image/png" href="/favicon.png" />

        {/* Metadata tambahan (opsional, SEO) */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>{children}</body>
    </html>
  )
}
