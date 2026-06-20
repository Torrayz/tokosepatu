import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CheckoutForm } from './CheckoutForm'

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>
          <CheckoutForm />
        </div>
      </main>
      <Footer />
    </>
  )
}
