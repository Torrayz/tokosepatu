import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="font-heading text-8xl font-extrabold text-gray-200">404</div>
        <div>
          <h1 className="font-heading text-3xl font-extrabold mb-2">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600">
            Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
          </p>
        </div>
        <Link href="/" className="btn-secondary inline-block">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
