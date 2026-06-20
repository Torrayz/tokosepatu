import type { OrderStatus } from '@/types'
import { Check } from 'lucide-react'

const steps: { status: OrderStatus; label: string }[] = [
  { status: 'pending', label: 'Pesanan Dibuat' },
  { status: 'payment_confirmed', label: 'Pembayaran' },
  { status: 'processing', label: 'Diproses' },
  { status: 'shipped', label: 'Dikirim' },
  { status: 'delivered', label: 'Selesai' },
]

const statusOrder: OrderStatus[] = [
  'pending', 'awaiting_payment', 'payment_uploaded',
  'payment_confirmed', 'processing', 'shipped', 'delivered',
]

export function StatusTracker({ status }: { status: OrderStatus }) {
  if (status === 'cancelled') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-card p-4 text-center">
        <p className="text-red-600 font-medium">Pesanan Dibatalkan</p>
      </div>
    )
  }

  const currentIndex = statusOrder.indexOf(status)

  return (
    <div className="flex items-center justify-between w-full py-4">
      {steps.map((step, idx) => {
        const stepIndex = statusOrder.indexOf(step.status)
        const isComplete = currentIndex >= stepIndex
        const isCurrent = step.status === status ||
          (status === 'awaiting_payment' && step.status === 'pending') ||
          (status === 'payment_uploaded' && step.status === 'payment_confirmed')

        return (
          <div key={step.status} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isComplete
                    ? 'bg-secondary text-primary'
                    : 'bg-gray-200 text-gray-500'
                } ${isCurrent ? 'ring-2 ring-secondary ring-offset-2' : ''}`}
              >
                {isComplete ? <Check size={16} /> : idx + 1}
              </div>
              <span className={`text-xs mt-2 text-center max-w-[80px] ${isComplete ? 'text-primary font-medium' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mt-[-20px] ${isComplete ? 'bg-secondary' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
