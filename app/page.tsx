import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductCard } from '@/components/product/ProductCard'
import { getFeaturedProducts } from '@/lib/queries/products'
import Link from 'next/link'
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Headphones, Star, Zap, TrendingUp, Award } from 'lucide-react'
import Image from 'next/image'

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden bg-[#0A0A0A] text-white min-h-[90vh] flex items-center">
          {/* Gradient blobs */}
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#E8FF3A]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Teks */}
              <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-[#E8FF3A]/10 border border-[#E8FF3A]/30 rounded-full px-4 py-2">
                  <Zap className="w-4 h-4 text-[#E8FF3A]" />
                  <span className="text-[#E8FF3A] text-sm font-medium">Koleksi Terbaru 2025</span>
                </div>

                <div className="space-y-4">
                  <h1 className="font-heading text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
                    Jalan<br />
                    <span className="text-[#E8FF3A]">Dengan</span><br />
                    Gaya.
                  </h1>
                  <p className="text-lg text-white/60 max-w-md leading-relaxed">
                    Sepatu premium Indonesia untuk gaya hidup modern. Sneakers, formal, hingga kasual — semua ada di STRYDE.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/products" className="inline-flex items-center gap-2 bg-[#E8FF3A] text-[#0A0A0A] font-bold px-6 py-3.5 rounded-xl hover:bg-[#d4eb2e] transition-all hover:scale-105 shadow-lg shadow-[#E8FF3A]/20">
                    Belanja Sekarang
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/products" className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3.5 rounded-xl hover:bg-white/10 transition-all">
                    Lihat Katalog
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex gap-8 pt-4 border-t border-white/10">
                  {[
                    { val: '500+', label: 'Produk' },
                    { val: '10K+', label: 'Pelanggan' },
                    { val: '4.9★', label: 'Rating' },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="font-extrabold text-2xl text-[#E8FF3A]">{s.val}</p>
                      <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gambar hero */}
              <div className="hidden lg:flex justify-center items-center relative">
                <div className="absolute inset-0 bg-[#E8FF3A]/5 rounded-3xl blur-3xl" />
                <div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-white/10">
                  <Image
                    src="/products/sneaker-runner-pro.png"
                    alt="STRYDE Sneaker"
                    fill
                    className="object-contain p-8 drop-shadow-2xl"
                    priority
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute top-8 -right-4 bg-white text-[#0A0A0A] rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E8FF3A] rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Terlaris Minggu Ini</p>
                    <p className="font-bold text-sm">Runner Pro Series</p>
                  </div>
                </div>
                <div className="absolute bottom-8 -left-4 bg-white text-[#0A0A0A] rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['#FF6B6B','#4ECDC4','#45B7D1'].map((c,i) => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white" style={{background:c}} />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pelanggan Aktif</p>
                    <p className="font-bold text-sm">10,000+ orang</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── KEUNGGULAN ─── */}
        <section className="bg-[#F8F8F8] py-12 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Truck, title: 'Gratis Ongkir', desc: 'Untuk semua pesanan', color: 'bg-blue-50 text-blue-600' },
                { icon: ShieldCheck, title: 'Garansi 30 Hari', desc: 'Uang kembali dijamin', color: 'bg-green-50 text-green-600' },
                { icon: RefreshCw, title: 'Mudah Return', desc: 'Proses cepat & mudah', color: 'bg-purple-50 text-purple-600' },
                { icon: Headphones, title: 'CS 24 Jam', desc: 'Siap membantu Anda', color: 'bg-amber-50 text-amber-600' },
              ].map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── KATEGORI ─── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Kategori</p>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-gray-900">Belanja Berdasarkan Tipe</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Sneakers', slug: 'sneakers', emoji: '👟', bg: 'from-blue-500 to-indigo-600', count: '120 produk' },
              { name: 'Casual', slug: 'casual', emoji: '🥾', bg: 'from-amber-500 to-orange-600', count: '85 produk' },
              { name: 'Formal', slug: 'formal', emoji: '👞', bg: 'from-slate-600 to-gray-800', count: '60 produk' },
              { name: 'Sandal', slug: 'sandal', emoji: '🩴', bg: 'from-pink-500 to-rose-600', count: '95 produk' },
              { name: 'Boots', slug: 'boots', emoji: '👢', bg: 'from-green-500 to-emerald-700', count: '45 produk' },
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.bg} text-white aspect-[4/5] flex flex-col justify-end p-5 hover:scale-105 transition-transform duration-300 shadow-md`}
              >
                <div className="absolute top-4 right-4 text-4xl">{cat.emoji}</div>
                <div>
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-xs text-white/70 mt-0.5">{cat.count}</p>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl" />
              </Link>
            ))}
          </div>
        </section>

        {/* ─── PRODUK UNGGULAN ─── */}
        <section className="bg-[#F8F8F8] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Terpilih</p>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-gray-900">Pilihan Unggulan</h2>
                <p className="text-gray-500 mt-2">Produk terbaik pilihan tim kami</p>
              </div>
              <Link href="/products" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="col-span-4 text-center text-gray-400 py-12">Belum ada produk unggulan.</p>
              )}
            </div>

            <Link href="/products" className="sm:hidden mt-6 w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm text-center block">
              Lihat Semua Produk
            </Link>
          </div>
        </section>

        {/* ─── BANNER PROMO ─── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative overflow-hidden rounded-3xl bg-[#0A0A0A] text-white">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E8FF3A]/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-10 md:p-16">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#E8FF3A]/10 border border-[#E8FF3A]/20 rounded-full px-4 py-1.5">
                  <Award className="w-4 h-4 text-[#E8FF3A]" />
                  <span className="text-[#E8FF3A] text-sm font-medium">Member Eksklusif</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold">
                  Daftar & Dapat<br />
                  <span className="text-[#E8FF3A]">Diskon 10%</span>
                </h2>
                <p className="text-white/60">
                  Bergabung dengan 10.000+ pelanggan STRYDE dan nikmati penawaran eksklusif setiap hari.
                </p>
                <Link href="/auth/register" className="inline-flex items-center gap-2 bg-[#E8FF3A] text-[#0A0A0A] font-bold px-6 py-3.5 rounded-xl hover:bg-[#d4eb2e] transition-all hover:scale-105 shadow-lg shadow-[#E8FF3A]/20">
                  Daftar Gratis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Testimonials */}
              <div className="space-y-4">
                {[
                  { name: 'Budi S.', rating: 5, text: 'Kualitas luar biasa! Nyaman dipakai seharian.' },
                  { name: 'Rina M.', rating: 5, text: 'Pengiriman cepat, produk sesuai deskripsi.' },
                  { name: 'Andi P.', rating: 5, text: 'Desainnya keren banget, banyak yang tanya beli di mana.' },
                ].map((t) => (
                  <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#E8FF3A]/20 flex items-center justify-center shrink-0 font-bold text-[#E8FF3A] text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm">{t.name}</p>
                        <div className="flex">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#E8FF3A] text-[#E8FF3A]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-white/60">{t.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
