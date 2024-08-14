"use client"


import UserProvider from './context/user'
import AllOverlays from "@/app/components/AllOverlays"
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { GlobalProvider } from './globalProvider'
import { CartProvider } from './context/CartContext'

const metadata: Metadata = {
  title: 'Sacral Track',
  description: 'Sacral Track - music marketplace, social network for music artists and lovers',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
         <body className="bg-[#15191F] text-white">
        <GlobalProvider>
        <UserProvider>
        <CartProvider>
        <Toaster position='bottom-center' />
         
            <AllOverlays />
            {children}
          
        </CartProvider>
        </UserProvider>
        </GlobalProvider>
        </body>

      </html>
  )
}