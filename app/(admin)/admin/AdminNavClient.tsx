'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/orders', label: 'Pesanan', icon: ShoppingCart, exact: false },
  { href: '/admin/products', label: 'Produk', icon: Package, exact: false },
]

export function AdminNavClient() {
  const pathname = usePathname()

  return (
    <div className="space-y-1">
      {navItems.map(({ href, label, icon: Icon, exact }) => {
        const isActive = exact ? pathname === href : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-[#E8FF3A] text-[#0A0A0A]'
                : 'text-white/60 hover:text-white hover:bg-white/8'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />}
          </Link>
        )
      })}
    </div>
  )
}
