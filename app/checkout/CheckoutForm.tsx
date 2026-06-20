'use client'

import { useState, useEffect } from 'react'
import { formatRupiah } from '@/lib/utils'
import { createOrder } from '@/lib/actions/order'
import { getCartItems } from '@/lib/actions/cart'
import Image from 'next/image'
import { 
  MapPin, CreditCard, ClipboardList, ChevronRight, 
  ChevronLeft, Loader2, Banknote, Building2, 
  Package, Phone, User, Home, Hash, Navigation
} from 'lucide-react'

const PROVINCES = [
  'Aceh','Sumatera Utara','Sumatera Barat','Riau','Jambi','Sumatera Selatan',
  'Bengkulu','Lampung','Kep. Bangka Belitung','Kep. Riau','DKI Jakarta',
  'Jawa Barat','Jawa Tengah','DI Yogyakarta','Jawa Timur','Banten',
  'Bali','Nusa Tenggara Barat','Nusa Tenggara Timur','Kalimantan Barat',
  'Kalimantan Tengah','Kalimantan Selatan','Kalimantan Timur','Kalimantan Utara',
  'Sulawesi Utara','Sulawesi Tengah','Sulawesi Selatan','Sulawesi Tenggara',
  'Gorontalo','Sulawesi Barat','Maluku','Maluku Utara','Papua','Papua Barat',
]

interface CartItem {
  id: string
  quantity: number
  size?: string
  product?: { name: string; price: number; images?: string[] }
}

interface ShippingData {
  shipping_name: string
  shipping_phone: string
  shipping_address: string
  shipping_city: string
  shipping_province: string
  shipping_postal: string
  notes: string
}

type PaymentMethod = 'cod' | 'transfer'

const STEPS = [
  { id: 1, label: 'Pengiriman', icon: MapPin },
  { id: 2, label: 'Pembayaran', icon: CreditCard },
  { id: 3, label: 'Konfirmasi', icon: ClipboardList },
]

/* ── Step Indicator ─────────────────────────────── */
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, idx) => {
        const done = current > step.id
        const active = current === step.id
        const Icon = step.icon
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                done ? 'bg-green-500 text-white' :
                active ? 'bg-[#0A0A0A] text-[#E8FF3A]' :
                'bg-gray-100 text-gray-400'
              }`}>
                {done ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span className={`text-xs font-medium ${active ? 'text-gray-900' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`h-0.5 w-20 sm:w-32 mx-3 mb-5 transition-all duration-500 ${done ? 'bg-green-400' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Order Summary Sidebar ──────────────────────── */
function OrderSummary({ items, step }: { items: CartItem[]; step: number }) {
  const subtotal = items.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0)
  return (
    <div className="bg-[#0A0A0A] text-white rounded-2xl p-6 space-y-5 sticky top-24">
      <h3 className="font-bold text-base flex items-center gap-2">
        <Package className="w-4 h-4 text-[#E8FF3A]" />
        Ringkasan Pesanan
      </h3>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {items.length === 0 ? (
          <p className="text-sm text-white/40">Memuat...</p>
        ) : items.map((item) => (
          <div key={item.id} className="flex gap-3 items-start">
            <div className="w-12 h-12 rounded-xl bg-white/10 shrink-0 overflow-hidden relative">
              {item.product?.images?.[0] ? (
                <Image src={item.product.images[0]} alt={item.product?.name || ''} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl">👟</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.product?.name}</p>
              <p className="text-xs text-white/40">Ukuran {item.size} · ×{item.quantity}</p>
            </div>
            <p className="text-sm font-bold text-[#E8FF3A] shrink-0">
              {formatRupiah((item.product?.price || 0) * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
        <div className="flex justify-between text-white/60">
          <span>Subtotal</span><span>{formatRupiah(subtotal)}</span>
        </div>
        <div className="flex justify-between text-white/60">
          <span>Ongkir</span>
          <span className="text-green-400 font-semibold">GRATIS</span>
        </div>
        <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-base">
          <span>Total</span>
          <span className="text-[#E8FF3A]">{formatRupiah(subtotal)}</span>
        </div>
      </div>

      {step === 3 && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white/60 text-center">
          🔒 Pesanan Anda aman & terenkripsi
        </div>
      )}
    </div>
  )
}

/* ── Input Helper ───────────────────────────────── */
function Field({ label, icon: Icon, children }: { label: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-gray-400" />{label}
      </label>
      {children}
    </div>
  )
}

const inputCls = "w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0A0A0A]/20 focus:border-[#0A0A0A] transition-all text-sm"

/* ─────────────────────────────────────────────── */
export function CheckoutForm() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod')
  const [shipping, setShipping] = useState<ShippingData>({
    shipping_name: '', shipping_phone: '', shipping_address: '',
    shipping_city: '', shipping_province: '', shipping_postal: '', notes: '',
  })

  useEffect(() => {
    getCartItems().then((items) => setCartItems(items as CartItem[]))
  }, [])

  const subtotal = cartItems.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0)

  /* Validasi step 1 */
  const shippingValid =
    shipping.shipping_name && shipping.shipping_phone &&
    shipping.shipping_address && shipping.shipping_city &&
    shipping.shipping_province && shipping.shipping_postal

  const handleShippingInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setShipping((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handlePlaceOrder = async () => {
    setIsLoading(true)
    try {
      await createOrder({ ...shipping, payment_method: paymentMethod })
    } catch {
      // redirect throws — ignore
    }
    setIsLoading(false)
  }

  return (
    <div>
      <StepIndicator current={step} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* ── Kiri: Konten Step ── */}
        <div className="lg:col-span-2">

          {/* STEP 1 — Pengiriman */}
          {step === 1 && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-bold text-xl text-gray-900">Alamat Pengiriman</h2>
                <p className="text-sm text-gray-500 mt-1">Kemana kami kirimkan pesanan Anda?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Nama Penerima" icon={User}>
                  <input name="shipping_name" value={shipping.shipping_name} onChange={handleShippingInput}
                    required placeholder="Nama lengkap" className={inputCls} />
                </Field>
                <Field label="No. Telepon" icon={Phone}>
                  <input name="shipping_phone" value={shipping.shipping_phone} onChange={handleShippingInput}
                    type="tel" required placeholder="08xxxxxxxxxx" className={inputCls} />
                </Field>
              </div>

              <Field label="Alamat Lengkap" icon={Home}>
                <textarea name="shipping_address" value={shipping.shipping_address} onChange={handleShippingInput}
                  rows={3} required placeholder="Jalan, nomor rumah, RT/RW, kelurahan..." className={inputCls} />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <Field label="Kota / Kabupaten" icon={Navigation}>
                  <input name="shipping_city" value={shipping.shipping_city} onChange={handleShippingInput}
                    required placeholder="Kota" className={inputCls} />
                </Field>
                <Field label="Provinsi" icon={MapPin}>
                  <select name="shipping_province" value={shipping.shipping_province} onChange={handleShippingInput}
                    required className={inputCls}>
                    <option value="">Pilih provinsi...</option>
                    {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </Field>
                <Field label="Kode Pos" icon={Hash}>
                  <input name="shipping_postal" value={shipping.shipping_postal} onChange={handleShippingInput}
                    required maxLength={5} placeholder="12345" className={inputCls} />
                </Field>
              </div>

              <Field label="Catatan Pengiriman (opsional)" icon={ClipboardList}>
                <input name="notes" value={shipping.notes} onChange={handleShippingInput}
                  placeholder="Instruksi khusus untuk kurir..." className={inputCls} />
              </Field>

              <button
                onClick={() => setStep(2)}
                disabled={!shippingValid}
                className="w-full py-3.5 rounded-xl bg-[#0A0A0A] text-[#E8FF3A] font-bold hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
              >
                Lanjut ke Pembayaran <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2 — Pembayaran */}
          {step === 2 && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-bold text-xl text-gray-900">Metode Pembayaran</h2>
                <p className="text-sm text-gray-500 mt-1">Pilih cara pembayaran yang paling mudah</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    method: 'cod' as PaymentMethod,
                    icon: Banknote,
                    title: 'Bayar di Tempat (COD)',
                    desc: 'Bayar tunai saat barang diterima. Tersedia untuk semua wilayah.',
                    badge: 'Populer',
                    badgeColor: 'bg-green-100 text-green-700',
                  },
                  {
                    method: 'transfer' as PaymentMethod,
                    icon: Building2,
                    title: 'Transfer Bank',
                    desc: 'Transfer ke BCA 1234567890 a/n PT STRYDE INDONESIA.',
                    badge: 'Lebih Cepat',
                    badgeColor: 'bg-blue-100 text-blue-700',
                  },
                ].map(({ method, icon: Icon, title, desc, badge, badgeColor }) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                      paymentMethod === method
                        ? 'border-[#0A0A0A] bg-[#0A0A0A]/5 shadow-md'
                        : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === method ? 'bg-[#E8FF3A]' : 'bg-gray-100'}`}>
                        <Icon className={`w-5 h-5 ${paymentMethod === method ? 'text-[#0A0A0A]' : 'text-gray-500'}`} />
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeColor}`}>{badge}</span>
                    </div>
                    <h3 className="font-bold text-sm text-gray-900">{title}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
                  </button>
                ))}
              </div>

              {paymentMethod === 'transfer' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 space-y-1">
                  <p className="font-semibold">Informasi Rekening:</p>
                  <p>Bank BCA · 1234567890 · PT STRYDE INDONESIA</p>
                  <p className="text-xs text-blue-600 mt-2">Bukti transfer dapat dikirim via WhatsApp atau diunggah di halaman pesanan.</p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 font-semibold text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </button>
                <button onClick={() => setStep(3)} className="flex-[2] py-3.5 rounded-xl bg-[#0A0A0A] text-[#E8FF3A] font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  Review Pesanan <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Konfirmasi */}
          {step === 3 && (
            <div className="space-y-4">
              {/* Ringkasan Pengiriman */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#0A0A0A]" /> Alamat Pengiriman
                  </h3>
                  <button onClick={() => setStep(1)} className="text-xs text-primary font-semibold hover:underline">Ubah</button>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-semibold text-gray-900">{shipping.shipping_name}</p>
                  <p>{shipping.shipping_phone}</p>
                  <p>{shipping.shipping_address}</p>
                  <p>{shipping.shipping_city}, {shipping.shipping_province} {shipping.shipping_postal}</p>
                  {shipping.notes && <p className="text-gray-400 italic">{shipping.notes}</p>}
                </div>
              </div>

              {/* Ringkasan Pembayaran */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#0A0A0A]" /> Metode Pembayaran
                  </h3>
                  <button onClick={() => setStep(2)} className="text-xs text-primary font-semibold hover:underline">Ubah</button>
                </div>
                <p className="text-sm text-gray-700 font-semibold">
                  {paymentMethod === 'cod' ? '💵 Bayar di Tempat (COD)' : '🏦 Transfer Bank BCA'}
                </p>
              </div>

              {/* Total */}
              <div className="bg-[#0A0A0A] text-white rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Total Pembayaran</p>
                  <p className="font-extrabold text-2xl text-[#E8FF3A]">{formatRupiah(subtotal)}</p>
                </div>
                <p className="text-xs text-white/40 text-right">
                  Ongkir<br />
                  <span className="text-green-400 font-bold text-sm">GRATIS</span>
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 font-semibold text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isLoading || cartItems.length === 0}
                  className="flex-[2] py-3.5 rounded-xl bg-[#E8FF3A] text-[#0A0A0A] font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[#E8FF3A]/30"
                >
                  {isLoading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</>
                  ) : (
                    <>Buat Pesanan 🎉</>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-gray-400">
                Dengan memesan, Anda menyetujui <a href="#" className="underline">Syarat & Ketentuan</a> kami.
              </p>
            </div>
          )}
        </div>

        {/* ── Kanan: Order Summary ── */}
        <OrderSummary items={cartItems} step={step} />
      </div>
    </div>
  )
}
