'use client'

import Link from 'next/link'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-card bg-primary">
              <span className="font-heading text-lg font-extrabold text-background">S</span>
            </div>
            <span className="font-heading text-xl font-bold">STRYDE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden gap-8 md:flex">
            <Link href="/products" className="font-medium text-foreground hover:text-primary transition">
              Shop
            </Link>
            <Link href="/products?category=sneakers" className="font-medium text-foreground hover:text-primary transition">
              Sneakers
            </Link>
            <Link href="/products?category=casual" className="font-medium text-foreground hover:text-primary transition">
              Casual
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search - Desktop only */}
            <div className="hidden items-center gap-2 rounded-button border border-border px-3 py-2 lg:flex">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-32 bg-background outline-none text-sm placeholder-gray-400"
              />
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative hover:opacity-70 transition">
              <ShoppingBag size={24} />
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-secondary text-xs font-bold flex items-center justify-center text-primary">
                0
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link href="/products" className="font-medium text-foreground hover:text-primary transition">
                Shop All
              </Link>
              <Link href="/products?category=sneakers" className="font-medium text-foreground hover:text-primary transition">
                Sneakers
              </Link>
              <Link href="/products?category=casual" className="font-medium text-foreground hover:text-primary transition">
                Casual
              </Link>
              <Link href="/products?category=formal" className="font-medium text-foreground hover:text-primary transition">
                Formal
              </Link>
              <Link href="/products?category=sandal" className="font-medium text-foreground hover:text-primary transition">
                Sandals
              </Link>
              <Link href="/products?category=boots" className="font-medium text-foreground hover:text-primary transition">
                Boots
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
