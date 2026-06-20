import { getAdminProducts } from '@/lib/actions/admin'
import { formatRupiah } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Package, ArrowUpRight } from 'lucide-react'
import { AdminProductActions } from './AdminProductActions'

interface PageProps {
  searchParams: { search?: string; category?: string }
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const products = await getAdminProducts(searchParams.search, searchParams.category)

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl text-gray-900 tracking-tight">Produk</h1>
          <p className="text-sm text-gray-500 mt-0.5">{products.length} produk terdaftar</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#E8FF3A] font-bold px-4 py-2.5 rounded-xl text-sm hover:opacity-90 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Produk
        </Link>
      </div>

      {/* Search Bar */}
      <form className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 max-w-md shadow-sm focus-within:border-gray-400 transition-colors">
        <Search className="w-4 h-4 text-gray-400 shrink-0" />
        <input
          type="text"
          name="search"
          defaultValue={searchParams.search}
          placeholder="Cari nama produk..."
          className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
        />
      </form>

      {/* Grid / Table */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <Package className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm mb-4">Tidak ada produk ditemukan</p>
          <Link href="/admin/products/new" className="text-sm font-semibold text-[#0A0A0A] hover:underline">
            + Tambah Produk Baru
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Produk', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product: {
                  id: string
                  name: string
                  images?: string[]
                  category?: { name: string }
                  price: number
                  sizes?: { stock: number }[]
                  is_active: boolean
                  slug: string
                }) => {
                  const totalStock = product.sizes?.reduce((sum, s) => sum + s.stock, 0) || 0
                  const lowStock = totalStock > 0 && totalStock < 10

                  return (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                            <Image
                              src={product.images?.[0] || '/products/sneaker-runner-pro.png'}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{product.name}</p>
                            <Link
                              href={`/products/${product.slug}`}
                              target="_blank"
                              className="text-xs text-gray-400 hover:text-blue-600 flex items-center gap-0.5 transition"
                            >
                              Lihat di toko <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                          {product.category?.name || '-'}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-bold text-gray-900">{formatRupiah(product.price)}</td>
                      <td className="px-5 py-4">
                        <span className={`font-semibold ${
                          totalStock === 0 ? 'text-red-500' : lowStock ? 'text-amber-500' : 'text-gray-900'
                        }`}>
                          {totalStock}
                        </span>
                        {lowStock && <span className="text-xs text-amber-500 ml-1">(rendah)</span>}
                        {totalStock === 0 && <span className="text-xs text-red-500 ml-1">(habis)</span>}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          product.is_active
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${product.is_active ? 'bg-green-500' : 'bg-red-400'}`} />
                          {product.is_active ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="text-xs font-semibold text-gray-400 hover:text-gray-900 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition"
                          >
                            Edit
                          </Link>
                          <AdminProductActions productId={product.id} isActive={product.is_active} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
