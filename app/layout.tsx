import type { Metadata } from 'next'
import './globals.css'

import Navbar from '@/components/Navbar/Navbar'

export const metadata: Metadata = {
  title: 'Take IT !',
  description: '開発ブログです！',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className='bg-gray-100'>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
