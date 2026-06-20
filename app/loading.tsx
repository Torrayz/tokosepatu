export default function Loading() {
  return (
    <div className="min-h-screen bg-muted animate-pulse">
      <div className="h-16 bg-background border-b border-border" />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="h-10 bg-gray-200 w-48 rounded mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square rounded-card bg-gray-200" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
