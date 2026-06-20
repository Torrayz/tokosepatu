import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { RegisterForm } from './RegisterForm'

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-4">
        {/* Dekorasi latar */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />
        <div className="relative z-10 w-full max-w-md">
          <RegisterForm />
        </div>
      </main>
      <Footer />
    </>
  )
}

