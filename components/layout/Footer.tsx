import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-card bg-primary">
                <span className="font-heading text-lg font-extrabold text-background">S</span>
              </div>
              <span className="font-heading text-lg font-bold">STRYDE</span>
            </div>
            <p className="text-sm text-gray-600 font-heading font-bold mb-2">Jalan Dengan Gaya</p>
            <p className="text-xs text-gray-500">Merek sepatu premium Indonesia untuk gaya hidup modern.</p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4">Belanja</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/products" className="text-gray-600 hover:text-primary transition">Semua Produk</Link></li>
              <li><Link href="/products?category=sneakers" className="text-gray-600 hover:text-primary transition">Sneakers</Link></li>
              <li><Link href="/products?category=casual" className="text-gray-600 hover:text-primary transition">Casual</Link></li>
              <li><Link href="/products?category=formal" className="text-gray-600 hover:text-primary transition">Formal</Link></li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4">Pelanggan</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/orders" className="text-gray-600 hover:text-primary transition">Pesanan Saya</Link></li>
              <li><Link href="/cart" className="text-gray-600 hover:text-primary transition">Keranjang Belanja</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition">Lacak Pesanan</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4">Kontak</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-gray-600">
                <Phone size={14} />
                <span>+62 813-xxxx-xxxx</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Mail size={14} />
                <span>hello@stryde.id</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; 2025 STRYDE. Semua hak dilindungi.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition">Kebijakan Privasi</a>
              <a href="#" className="hover:text-primary transition">Syarat Layanan</a>
              <a href="#" className="hover:text-primary transition">Pengembalian</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
