import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'STRYDE - Walk Your Way',
  description: 'Indonesian shoe brand with the tagline "Walk Your Way". Shop premium sneakers, casual, formal, sandals, and boots.',
  openGraph: {
    title: 'STRYDE - Walk Your Way',
    description: 'Premium Indonesian shoe brand',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${jakarta.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  )
}
