import UserProvider from './context/user'
import AllOverlays from "@/app/components/AllOverlays"
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sacral Track',
  description: 'Sacral Track - music marketplace & creative network',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <UserProvider>


        <body className="bg-[#15191F] text-white">
          <AllOverlays />
          {children}
        </body>

      </UserProvider>
    </html>
  )
}
