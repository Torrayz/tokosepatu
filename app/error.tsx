'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  // Log the error to an error reporting service
  console.error(error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="text-6xl">💥</div>
        <div>
          <h1 className="font-heading text-3xl font-extrabold mb-2">Terjadi Kesalahan</h1>
          <p className="text-gray-600">
            Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.
          </p>
        </div>
        <button onClick={reset} className="btn-secondary">
          Coba Lagi
        </button>
      </div>
    </div>
  )
}
