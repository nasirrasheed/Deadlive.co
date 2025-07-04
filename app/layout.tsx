// app/layout.tsx
import './globals.css'
import { AuthProvider } from '@/hooks/useAuth'
import  Header  from '@/components/Header'
import  Footer  from '@/components/Footer'
import { usePathname } from 'next/navigation'
import LayoutWrapper from './LayoutWrapper'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Admin Panel',
  description: 'Paranormal business dashboard',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  // Next.js layout files are not allowed to use hooks directly.
  // Instead, we move this logic to a Client Component wrapper.
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AuthProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
