'use client'

import { toggleProductActive, deleteProduct } from '@/lib/actions/admin'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'
import { Edit, Power, Trash2 } from 'lucide-react'

export function AdminProductActions({ productId, isActive }: { productId: string; isActive: boolean }) {
  const router = useRouter()

  const handleToggle = async () => {
    const result = await toggleProductActive(productId)
    if (result.success) {
      toast.success(isActive ? 'Produk dinonaktifkan' : 'Produk diaktifkan')
      router.refresh()
    } else {
      toast.error(result.error || 'Gagal')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return
    const result = await deleteProduct(productId)
    if (result.success) {
      toast.success('Produk dihapus')
      router.refresh()
    } else {
      toast.error(result.error || 'Gagal')
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/products/${productId}/edit`} className="p-1.5 rounded hover:bg-muted transition" title="Edit">
        <Edit size={16} />
      </Link>
      <button onClick={handleToggle} className={`p-1.5 rounded hover:bg-muted transition ${isActive ? 'text-orange-500' : 'text-green-500'}`} title={isActive ? 'Nonaktifkan' : 'Aktifkan'}>
        <Power size={16} />
      </button>
      <button onClick={handleDelete} className="p-1.5 rounded hover:bg-muted transition text-error" title="Hapus">
        <Trash2 size={16} />
      </button>
    </div>
  )
}
