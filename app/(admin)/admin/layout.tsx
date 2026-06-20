import { requireAdmin } from '@/lib/auth'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { logoutAction } from '@/lib/actions/auth'
import { AdminNavClient } from './AdminNavClient'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireAdmin()

  return (
    <div className="flex min-h-screen bg-[#F0F2F5]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A0A0A] text-white flex flex-col fixed h-screen z-50 shadow-2xl">
        {/* Logo */}
        <div className="p-6 border-b border-white/8">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E8FF3A] flex items-center justify-center">
              <span className="font-black text-[#0A0A0A] text-sm">S</span>
            </div>
            <div>
              <p className="font-black text-base tracking-tight">STRYDE</p>
              <p className="text-[10px] text-white/40 font-medium tracking-widest uppercase">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest px-3 mb-3">Menu Utama</p>
          <AdminNavClient />
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/8">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#E8FF3A] text-[#0A0A0A] flex items-center justify-center text-sm font-black shrink-0">
              {profile.full_name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{profile.full_name || 'Admin'}</p>
              <p className="text-xs text-white/40">Administrator</p>
            </div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition w-full px-3 py-2 rounded-xl hover:bg-white/5"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-40 px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium">STRYDE Admin</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-gray-500 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-lg transition"
            >
              Lihat Toko ↗
            </Link>
          </div>
        </div>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
