'use client'

import { ProductCard } from '@/components/product/ProductCard'
import type { Product } from '@/types'
import Link from 'next/link'
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Headphones, Zap, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import Marquee from 'react-fast-marquee'

interface HomeClientProps {
  featuredProducts: Product[]
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export default function HomeClient({ featuredProducts }: HomeClientProps) {
  return (
    <main className="min-h-screen bg-white overflow-hidden">

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-[#0A0A0A] text-white min-h-[90vh] flex items-center">
        {/* Gradient blobs animated */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#E8FF3A] rounded-full blur-[120px] pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500 rounded-full blur-[100px] pointer-events-none" 
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Teks dengan Staggered Animation */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-[#E8FF3A]/10 border border-[#E8FF3A]/30 rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-[#E8FF3A]" />
                <span className="text-[#E8FF3A] text-sm font-medium tracking-wide">Koleksi Terbaru 2025</span>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-4">
                <h1 className="font-heading text-5xl md:text-7xl lg:text-[5rem] font-black leading-[1.05] tracking-tighter">
                  Jalan<br />
                  <span className="text-[#E8FF3A] drop-shadow-[0_0_15px_rgba(232,255,58,0.3)]">Dengan</span><br />
                  Gaya.
                </h1>
                <p className="text-lg md:text-xl text-white/60 max-w-md leading-relaxed font-medium">
                  Sepatu premium Indonesia untuk gaya hidup urban yang tak tertandingi.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/products" className="group inline-flex items-center gap-2 bg-[#E8FF3A] text-[#0A0A0A] font-black tracking-widest uppercase text-sm px-8 py-4 rounded-2xl hover:bg-[#d4eb2e] transition-all hover:scale-105 shadow-xl shadow-[#E8FF3A]/20">
                  Belanja Sekarang
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/products" className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all">
                  Lihat Katalog
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeInUp} className="flex gap-10 pt-6 border-t border-white/10">
                {[
                  { val: '500+', label: 'Produk Eksklusif' },
                  { val: '10K+', label: 'Pelanggan Puas' },
                  { val: '4.9★', label: 'Rating Rata-rata' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-black text-3xl text-[#E8FF3A] drop-shadow-md">{s.val}</p>
                    <p className="text-xs font-bold text-white/40 mt-1 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Gambar Hero - Floating Animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="hidden lg:flex justify-center items-center relative"
            >
              <div className="absolute inset-0 bg-[#E8FF3A]/5 rounded-[3rem] blur-3xl" />
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-[600px] rounded-[3rem] overflow-hidden border border-white/10 bg-gradient-to-tr from-white/5 to-transparent backdrop-blur-sm"
              >
                <Image
                  src="/products/sneaker-runner-pro.png"
                  alt="STRYDE Sneaker"
                  fill
                  className="object-contain p-10 drop-shadow-[0_30px_30px_rgba(0,0,0,0.5)]"
                  priority
                />
              </motion.div>
              
              {/* Floating badges with delayed pop */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute top-16 -right-8 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-3xl p-4 shadow-2xl flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-[#E8FF3A] rounded-2xl flex items-center justify-center text-[#0A0A0A]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-white/60 font-bold uppercase tracking-wider">Terlaris Minggu Ini</p>
                  <p className="font-black text-sm">Runner Pro Series</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="bg-[#E8FF3A] border-y-4 border-[#0A0A0A] py-3 -rotate-1 relative z-20 scale-110 shadow-2xl">
        <Marquee speed={60} gradient={false} className="overflow-hidden">
          {Array(8).fill('🔥 STRYDE: WALK YOUR WAY • KOLEKSI SNEAKERS TERBARU 2025 • DISKON KHUSUS MEMBER 10% • ').map((text, i) => (
            <span key={i} className="font-heading font-black text-[#0A0A0A] text-xl mx-4 uppercase tracking-widest">{text}</span>
          ))}
        </Marquee>
      </div>

      {/* ─── KEUNGGULAN ─── */}
      <section className="bg-gray-50 py-20 mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Truck, title: 'Gratis Ongkir', desc: 'Seluruh Indonesia', color: 'bg-blue-50 text-blue-600 border-blue-100' },
              { icon: ShieldCheck, title: 'Garansi 100%', desc: 'Uang kembali dijamin', color: 'bg-green-50 text-green-600 border-green-100' },
              { icon: RefreshCw, title: 'Retur 30 Hari', desc: 'Proses tanpa ribet', color: 'bg-purple-50 text-purple-600 border-purple-100' },
              { icon: Headphones, title: 'CS 24 Jam', desc: 'Siap membantu Anda', color: 'bg-amber-50 text-amber-600 border-amber-100' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <motion.div key={title} variants={fadeInUp} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`w-14 h-14 rounded-2xl ${color} border flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-black text-base text-gray-900 mb-1">{title}</p>
                  <p className="text-sm font-medium text-gray-500">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── KATEGORI ─── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-sm font-bold text-[#0A0A0A]/50 uppercase tracking-widest mb-3">Jelajahi Gaya Anda</p>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Kategori Populer</h2>
          </div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5"
        >
          {[
            { name: 'Sneakers', slug: 'sneakers', emoji: '👟', bg: 'from-blue-600 to-indigo-800' },
            { name: 'Casual', slug: 'casual', emoji: '🥾', bg: 'from-amber-500 to-orange-700' },
            { name: 'Formal', slug: 'formal', emoji: '👞', bg: 'from-slate-700 to-gray-900' },
            { name: 'Sandal', slug: 'sandal', emoji: '🩴', bg: 'from-pink-600 to-rose-800' },
            { name: 'Boots', slug: 'boots', emoji: '👢', bg: 'from-emerald-600 to-teal-800' },
          ].map((cat) => (
            <motion.div key={cat.slug} variants={fadeInUp}>
              <Link
                href={`/products?category=${cat.slug}`}
                className={`group relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${cat.bg} text-white aspect-[4/5] flex flex-col justify-end p-6 hover:scale-[1.03] transition-transform duration-300 shadow-lg shadow-black/10`}
              >
                <div className="absolute top-6 right-6 text-5xl drop-shadow-xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 origin-bottom-right">{cat.emoji}</div>
                <div className="relative z-10">
                  <h3 className="font-black text-2xl tracking-tight">{cat.name}</h3>
                  <div className="w-8 h-1 bg-[#E8FF3A] rounded-full mt-3 scale-0 group-hover:scale-100 transition-transform origin-left" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── PRODUK UNGGULAN ─── */}
      <section className="bg-gray-50 py-24 rounded-t-[3rem] border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-sm font-bold text-[#0A0A0A]/50 uppercase tracking-widest mb-3">Terpilih</p>
              <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Pilihan Unggulan</h2>
            </div>
            <Link href="/products" className="hidden sm:inline-flex items-center gap-2 text-sm font-black text-[#0A0A0A] uppercase tracking-widest hover:gap-4 transition-all">
              Lihat Semua <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <p className="col-span-4 text-center text-gray-400 py-12">Belum ada produk unggulan.</p>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
