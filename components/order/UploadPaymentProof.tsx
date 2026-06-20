'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { uploadPaymentProof } from '@/lib/actions/payment'
import { toast } from 'sonner'
import Image from 'next/image'

export function UploadPaymentProof({ orderId }: { orderId: string }) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 5MB')
      return
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Format file harus JPEG, PNG, atau WebP')
      return
    }

    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (!preview) {
      toast.error('Pilih file terlebih dahulu')
      return
    }

    setIsUploading(true)
    try {
      // In production, upload to Supabase Storage first, then pass URL
      // For now, pass the data URL as placeholder
      const result = await uploadPaymentProof(orderId, preview)
      if (result.success) {
        toast.success('Bukti bayar berhasil dikirim!')
      } else {
        toast.error(result.error || 'Gagal mengirim bukti bayar')
      }
    } catch {
      toast.error('Terjadi kesalahan')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="card space-y-4">
      <h3 className="font-heading font-bold">Upload Bukti Pembayaran</h3>
      <p className="text-sm text-gray-600">
        Transfer ke BCA 1234567890 a.n. STRYDE Indonesia, lalu upload bukti transfer Anda.
      </p>

      {preview ? (
        <div className="relative">
          <div className="relative w-full h-48 rounded-card overflow-hidden">
            <Image src={preview} alt="Preview" fill className="object-contain bg-muted" />
          </div>
          <button
            onClick={() => setPreview(null)}
            className="absolute top-2 right-2 p-1 bg-error text-white rounded-full"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-card cursor-pointer hover:border-primary transition">
          <Upload size={32} className="text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Klik atau drag untuk upload</span>
          <span className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP (maks. 5MB)</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}

      <button
        onClick={handleUpload}
        disabled={!preview || isUploading}
        className="btn-secondary w-full disabled:opacity-50"
      >
        {isUploading ? 'Mengirim...' : 'Kirim Bukti Bayar'}
      </button>
    </div>
  )
}
