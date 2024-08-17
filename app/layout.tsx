"use client"


import UserProvider from './context/user'
import AllOverlays from "@/app/components/AllOverlays"
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { GlobalProvider } from './globalProvider'
import { CartProvider } from './context/CartContext'
import Head from 'next/head'
import { Suspense } from 'react'
import YandexMetrika from '@/libs/YandexMetrika'

const metadata: Metadata = {
  title: 'Sacral Track',
  description: 'Sacral Track - music marketplace, social network for music artists and lovers',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
        <Head>
      
        
        <meta name="description" content={metadata.description ?? ''} />
        <meta property="og:description" content={metadata.description ?? ''} />
        <meta property="og:image" content="/images/login.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sacraltrack.store" />

      

      </Head>

      <body className="bg-[#15191F] text-white">


        <Suspense fallback={<></>}>
            <YandexMetrika />
        </Suspense>


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