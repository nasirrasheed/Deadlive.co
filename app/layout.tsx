// app/layout.tsx
import './globals.css'
import { AuthProvider } from '@/hooks/useAuth'

export const metadata = {
  title: 'Admin Panel',
  description: 'Paranormal business dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
