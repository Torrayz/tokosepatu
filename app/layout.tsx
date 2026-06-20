import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import { Toaster } from 'sonner'
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
  description: 'STRYDE adalah platform e-commerce sepatu lokal Indonesia. Temukan koleksi sneakers, casual, formal, sandal, dan boots premium.',
  openGraph: {
    title: 'STRYDE - Walk Your Way',
    description: 'Platform e-commerce sepatu premium Indonesia',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="bg-background">
      <body className={`${jakarta.variable} ${inter.variable}`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
