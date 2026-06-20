'use client'

import Link from 'next/link'
import { Search, ShoppingBag, Menu, X, LogOut, Package, Shield } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/types'
import { logoutAction } from '@/lib/actions/auth'
import { useCartStore } from '@/lib/store/cartStore'

interface NavbarClientProps {
  profile: Profile | null
  initialCartCount: number
}

export function NavbarClient({ profile, initialCartCount }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { count, setCount } = useCartStore()

  useEffect(() => {
    setCount(initialCartCount)
  }, [initialCartCount, setCount])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
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
            <Link href="/" className="font-medium text-foreground hover:text-primary transition">
              Beranda
            </Link>
            <Link href="/products" className="font-medium text-foreground hover:text-primary transition">
              Produk
            </Link>
            <div className="group relative">
              <button className="font-medium text-foreground hover:text-primary transition">
                Kategori
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-background border border-border rounded-card shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
                <Link href="/products?category=sneakers" className="block px-4 py-3 text-sm hover:bg-muted">Sneakers</Link>
                <Link href="/products?category=formal" className="block px-4 py-3 text-sm hover:bg-muted">Formal</Link>
                <Link href="/products?category=casual" className="block px-4 py-3 text-sm hover:bg-muted">Casual</Link>
                <Link href="/products?category=sandal" className="block px-4 py-3 text-sm hover:bg-muted">Sandal</Link>
                <Link href="/products?category=boots" className="block px-4 py-3 text-sm hover:bg-muted">Boots</Link>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search - Desktop */}
            <form onSubmit={handleSearch} className="hidden items-center gap-2 rounded-button border border-border px-3 py-2 lg:flex">
              <Search size={18} />
              <input
                type="text"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-32 bg-transparent outline-none text-sm placeholder-gray-400"
              />
            </form>

            {/* Cart */}
            <Link href="/cart" className="relative hover:opacity-70 transition">
              <ShoppingBag size={24} />
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-secondary text-xs font-bold flex items-center justify-center text-primary">
                {count}
              </span>
            </Link>

            {/* Auth */}
            {profile ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="hidden sm:flex items-center gap-2 hover:opacity-70 transition"
                >
                  <div className="h-8 w-8 rounded-full bg-primary text-background flex items-center justify-center text-xs font-bold">
                    {initials}
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-card shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="font-medium text-sm">{profile.full_name}</p>
                      <p className="text-xs text-gray-500">{profile.email}</p>
                    </div>
                    <Link href="/orders" className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted" onClick={() => setDropdownOpen(false)}>
                      <Package size={16} /> Pesanan Saya
                    </Link>
                    {profile.role === 'admin' && (
                      <Link href="/admin" className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted text-secondary" onClick={() => setDropdownOpen(false)}>
                        <Shield size={16} /> Admin Panel
                      </Link>
                    )}
                    <form action={logoutAction}>
                      <button type="submit" className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted w-full text-left text-error">
                        <LogOut size={16} /> Keluar
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="hidden sm:inline-block font-medium text-foreground hover:text-primary transition">
                Masuk
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-button border border-border px-3 py-2">
                <Search size={18} />
                <input type="text" placeholder="Cari produk..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" />
              </form>
              <Link href="/" className="font-medium" onClick={() => setIsOpen(false)}>Beranda</Link>
              <Link href="/products" className="font-medium" onClick={() => setIsOpen(false)}>Semua Produk</Link>
              <Link href="/products?category=sneakers" className="font-medium" onClick={() => setIsOpen(false)}>Sneakers</Link>
              <Link href="/products?category=formal" className="font-medium" onClick={() => setIsOpen(false)}>Formal</Link>
              <Link href="/products?category=casual" className="font-medium" onClick={() => setIsOpen(false)}>Casual</Link>
              <Link href="/products?category=sandal" className="font-medium" onClick={() => setIsOpen(false)}>Sandal</Link>
              <Link href="/products?category=boots" className="font-medium" onClick={() => setIsOpen(false)}>Boots</Link>
              {profile ? (
                <>
                  <Link href="/orders" className="font-medium pt-2 border-t border-border" onClick={() => setIsOpen(false)}>Pesanan Saya</Link>
                  <form action={logoutAction}><button type="submit" className="font-medium text-error">Keluar</button></form>
                </>
              ) : (
                <Link href="/auth/login" className="font-medium pt-2 border-t border-border" onClick={() => setIsOpen(false)}>Masuk</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
