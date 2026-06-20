import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getFeaturedProducts } from '@/lib/queries/products'
import HomeClient from './HomeClient'

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      <Navbar />
      <HomeClient featuredProducts={featuredProducts} />
      <Footer />
    </>
  )
}
