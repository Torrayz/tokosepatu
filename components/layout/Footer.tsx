import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowRight, CreditCard, ShieldCheck } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 pb-10 mt-20 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Newsletter & Brand */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-b border-white/10 pb-16 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8FF3A]">
                <span className="font-heading text-2xl font-black text-[#0A0A0A]">S</span>
              </div>
              <span className="font-heading text-3xl font-black tracking-tight">STRYDE</span>
            </div>
            <p className="text-xl font-heading font-bold text-white/90 mb-3">Walk Your Way.</p>
            <p className="text-sm text-white/50 max-w-md leading-relaxed">
              Platform e-commerce sepatu premium Indonesia. Kami mendefinisikan ulang gaya hidup urban dengan kualitas tanpa kompromi dan desain revolusioner.
            </p>
          </div>
          
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <h4 className="font-heading font-bold text-lg mb-2">Berlangganan Newsletter</h4>
            <p className="text-sm text-white/50 mb-6">Dapatkan akses eksklusif ke rilis produk terbaru dan penawaran khusus.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Alamat email Anda..." 
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8FF3A] transition-colors"
                required
              />
              <button 
                type="button"
                className="bg-[#E8FF3A] text-[#0A0A0A] px-6 py-3 rounded-xl font-bold hover:bg-[#d4e832] transition-colors flex items-center gap-2"
              >
                Daftar <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <h4 className="font-heading font-bold text-base mb-6 text-[#E8FF3A]">Koleksi</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/products?category=sneakers" className="text-white/60 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/20"></span> Sneakers</Link></li>
              <li><Link href="/products?category=casual" className="text-white/60 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/20"></span> Casual</Link></li>
              <li><Link href="/products?category=formal" className="text-white/60 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/20"></span> Formal</Link></li>
              <li><Link href="/products?category=boots" className="text-white/60 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/20"></span> Boots</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-base mb-6 text-[#E8FF3A]">Dukungan</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/orders" className="text-white/60 hover:text-white transition-colors">Lacak Pesanan</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Panduan Ukuran</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Tanya Jawab (FAQ)</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Pengembalian Dana</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-base mb-6 text-[#E8FF3A]">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+62 813-9999-8888</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span>hello@stryde.id</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>SCBD, Jakarta Selatan</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-base mb-6 text-[#E8FF3A]">Keamanan & Pembayaran</h4>
            <p className="text-xs text-white/50 mb-4 leading-relaxed">
              Kami menjamin keamanan transaksi Anda dengan enkripsi end-to-end.
            </p>
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <div className="px-3 py-1.5 bg-white/10 rounded-lg text-[10px] font-bold tracking-wider flex items-center gap-1.5"><CreditCard className="w-3 h-3" /> TRANSFER</div>
              <div className="px-3 py-1.5 bg-white/10 rounded-lg text-[10px] font-bold tracking-wider flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> COD</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/40">
          <p>&copy; {new Date().getFullYear()} STRYDE Indonesia. Semua Hak Dilindungi.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
