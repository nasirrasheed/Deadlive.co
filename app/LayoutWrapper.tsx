'use client'

import { usePathname } from 'next/navigation'
import  Header  from '@/components/Header'
import  Footer  from '@/components/Footer'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
const hideLayout = pathname.startsWith('/admin') || pathname === '/login'



  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  )
}
