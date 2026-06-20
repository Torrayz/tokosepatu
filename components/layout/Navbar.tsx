import { getUserProfile } from '@/lib/auth'
import { getCartCount } from '@/lib/actions/cart'
import { NavbarClient } from './NavbarClient'

export async function Navbar() {
  const profile = await getUserProfile()
  const cartCount = profile ? await getCartCount() : 0

  return <NavbarClient profile={profile} initialCartCount={cartCount} />
}
