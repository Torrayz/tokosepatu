'use client'

import Link from 'next/link'
import { Search, ShoppingBag, Menu, X, LogOut, Package, Shield, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/types'
import { logoutAction } from '@/lib/actions/auth'
import { useCartStore } from '@/lib/store/cartStore'

interface NavbarClientProps {
  profile: Profile | null
  initialCartCount: number
}

const CATEGORIES = [
  { slug: 'sneakers', label: 'Sneakers', desc: 'Gaya kasual urban', emoji: '👟' },
  { slug: 'formal', label: 'Formal', desc: 'Elegan untuk bekerja', emoji: '👞' },
  { slug: 'casual', label: 'Casual', desc: 'Nyaman sehari-hari', emoji: '👟' },
  { slug: 'sandal', label: 'Sandal', desc: 'Santai & ringan', emoji: '🩴' },
  { slug: 'boots', label: 'Boots', desc: 'Tangguh & stylish', emoji: '🥾' },
]

export function NavbarClient({ profile, initialCartCount }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { count, setCount } = useCartStore()

  useEffect(() => {
    setCount(initialCartCount)
  }, [initialCartCount, setCount])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      setIsOpen(false)
    }
  }

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <>
      {/* Top Promo Banner */}
      <div className="bg-[#0A0A0A] text-[#E8FF3A] px-4 py-2.5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest relative z-50 flex items-center justify-center gap-2">
        <span className="animate-pulse">🔥</span> Gratis Ongkir Seluruh Indonesia Tanpa Minimum Belanja
      </div>

      {/* Navbar Main */}
      <nav 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100' : 'bg-white border-b border-gray-100'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between transition-all duration-300">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0A0A0A] group-hover:bg-[#E8FF3A] transition-colors duration-300 shadow-md">
                <span className="font-heading text-xl font-black text-white group-hover:text-[#0A0A0A] transition-colors duration-300">S</span>
              </div>
              <span className="font-heading text-2xl font-black tracking-tight text-gray-900">STRYDE</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="font-semibold text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Beranda
              </Link>
              <Link href="/products" className="font-semibold text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Semua Produk
              </Link>
              
              {/* Mega-menu style Category Dropdown */}
              <div className="group relative py-8">
                <button className="flex items-center gap-1 font-semibold text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Kategori <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%-1rem)] w-[400px] bg-white border border-gray-100 rounded-3xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-50 p-3 transform translate-y-2 group-hover:translate-y-0">
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => (
                      <Link key={cat.slug} href={`/products?category=${cat.slug}`} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg shrink-0">
                          {cat.emoji}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{cat.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{cat.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search - Desktop */}
              <form onSubmit={handleSearch} className="hidden xl:flex items-center gap-2 rounded-2xl bg-gray-50 border border-gray-100 px-4 py-2.5 focus-within:border-gray-300 focus-within:bg-white transition-all w-64">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari sepatu impian..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm font-medium placeholder:font-normal placeholder-gray-400"
                />
              </form>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                <ShoppingBag className="w-6 h-6" />
                {count > 0 && (
                  <span className="absolute 1 top-1 right-1 h-5 w-5 rounded-full bg-[#E8FF3A] text-[10px] font-black flex items-center justify-center text-[#0A0A0A] shadow-sm transform scale-110">
                    {count > 99 ? '99+' : count}
                  </span>
                )}
              </Link>

              {/* Auth */}
              {profile ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="hidden sm:flex items-center gap-2 p-1 pl-3 pr-1 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-semibold text-gray-700 hidden lg:block max-w-[100px] truncate">{profile.full_name}</span>
                    <div className="h-8 w-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-xs font-black shadow-sm">
                      {initials}
                    </div>
                  </button>

                  {/* Dropdown Profile */}
                  <div className={`absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-3xl shadow-2xl z-50 transition-all duration-200 origin-top-right ${
                    dropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                  }`}>
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50 rounded-t-3xl">
                      <p className="font-bold text-sm text-gray-900 truncate">{profile.full_name}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{profile.email}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <Link href="/orders" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors" onClick={() => setDropdownOpen(false)}>
                        <Package className="w-4 h-4" /> Pesanan Saya
                      </Link>
                      {profile.role === 'admin' && (
                        <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-[#0A0A0A] bg-[#E8FF3A]/20 hover:bg-[#E8FF3A]/40 rounded-xl transition-colors" onClick={() => setDropdownOpen(false)}>
                          <Shield className="w-4 h-4" /> Admin Panel
                        </Link>
                      )}
                      <form action={logoutAction}>
                        <button type="submit" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full text-left">
                          <LogOut className="w-4 h-4" /> Keluar
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/auth/login" className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#0A0A0A] text-white font-bold text-sm hover:bg-gray-800 transition-colors shadow-lg shadow-black/10">
                  Masuk
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Expanded */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100 border-t border-gray-100 py-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="flex flex-col space-y-2">
              <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 mb-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Cari produk..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent outline-none text-sm font-medium" />
              </form>
              <Link href="/" className="px-4 py-3 font-bold text-gray-900 rounded-xl hover:bg-gray-50" onClick={() => setIsOpen(false)}>Beranda</Link>
              <Link href="/products" className="px-4 py-3 font-bold text-gray-900 rounded-xl hover:bg-gray-50" onClick={() => setIsOpen(false)}>Semua Produk</Link>
              <div className="px-4 py-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Kategori</p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <Link key={cat.slug} href={`/products?category=${cat.slug}`} className="flex items-center gap-2 p-2 rounded-xl border border-gray-100 bg-white" onClick={() => setIsOpen(false)}>
                      <span className="text-lg">{cat.emoji}</span>
                      <span className="text-sm font-semibold">{cat.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="h-px bg-gray-100 my-2" />
              {profile ? (
                <>
                  <div className="px-4 py-3 flex items-center gap-3">
                     <div className="h-10 w-10 rounded-full bg-[#0A0A0A] text-[#E8FF3A] flex items-center justify-center font-black">
                      {initials}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{profile.full_name}</p>
                      <p className="text-xs text-gray-500">{profile.email}</p>
                    </div>
                  </div>
                  <Link href="/orders" className="flex items-center gap-3 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50 rounded-xl" onClick={() => setIsOpen(false)}>
                    <Package className="w-5 h-5" /> Pesanan Saya
                  </Link>
                  {profile.role === 'admin' && (
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 font-bold text-[#0A0A0A] bg-[#E8FF3A]/20 rounded-xl" onClick={() => setIsOpen(false)}>
                      <Shield className="w-5 h-5" /> Admin Panel
                    </Link>
                  )}
                  <form action={logoutAction}>
                    <button type="submit" className="flex items-center gap-3 px-4 py-3 font-semibold text-red-600 w-full text-left hover:bg-red-50 rounded-xl">
                      <LogOut className="w-5 h-5" /> Keluar
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/auth/login" className="mx-4 mt-2 flex items-center justify-center py-3 rounded-xl bg-[#0A0A0A] text-[#E8FF3A] font-bold" onClick={() => setIsOpen(false)}>
                  Masuk ke Akun
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
