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
  description: 'Sacral Track - music network marketplace for music artists and lovers',
  openGraph: {
    title: 'Sacral Track',
    description: 'Sacral Track - music network marketplace for music artists and lovers',
    url: 'https://sacraltrack.store',
    images: [
      {
        url: '/images/login.png',
        width: 800,
        height: 600,
        alt: 'Sacral Track',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
        <Head>
      
        
        <meta name="description" content={metadata.description ?? ''} />
        <meta property="og:title" content={String(metadata.openGraph?.title) ?? ''} />
        <meta property="og:description" content={metadata.openGraph?.description} />
        <meta property="og:url" content={metadata.openGraph?.url ? String(metadata.openGraph.url) : ''} />
        <meta property="og:type" content={(metadata.openGraph as any)?.type ?? ''} />
        <meta property="og:image" content={
            metadata.openGraph?.images
              ? Array.isArray(metadata.openGraph.images)
                ? metadata.openGraph.images.map((image: any) => image?.url ?? '').join(',')
                : (metadata.openGraph.images as any)?.url ?? ''
              : ''
          } />






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