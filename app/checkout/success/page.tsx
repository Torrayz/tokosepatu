import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <CheckCircle2 size={64} className="mx-auto text-success" />
            
            <div>
              <h1 className="font-heading text-3xl font-bold mb-2">Pesanan Berhasil Dibuat!</h1>
              <p className="text-gray-600">Terima kasih telah berbelanja. Pesanan Anda telah berhasil dibuat.</p>
            </div>

            <div className="bg-muted rounded-card p-4 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ID Pesanan</span>
                <span className="font-medium font-mono">#STR20240620001</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Metode Pembayaran</span>
                <span className="font-medium">Bayar di Tempat (COD)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total</span>
                <span className="font-medium">Rp 950.000</span>
              </div>
            </div>

            <div className="bg-info/10 border border-info rounded-card p-4 text-left text-sm text-info">
              <p>Tim kami akan menghubungi kamu untuk konfirmasi pengiriman. Kamu dapat melacak status pesanan di akun kamu.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/orders" className="btn-secondary flex-1 flex items-center justify-center gap-2">
                Lihat Pesanan
                <ArrowRight size={18} />
              </Link>
              <Link href="/products" className="btn-outline flex-1">
                Lanjut Belanja
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
