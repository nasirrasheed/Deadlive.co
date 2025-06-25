import './globals.css';
import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DeadLive - UK Paranormal Investigations & Ghost Hunts',
  description:
    'Join DeadLive for thrilling ghost hunts, psychic nights, and spiritual services across the UK. Professional paranormal investigations with expert guides.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${inter.variable} font-inter bg-black text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
