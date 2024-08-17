'use client'
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useCreateCartPaid from "@/app/hooks/useCreateCartPaid";
import { useUser } from "@/app/context/user"
import { Suspense } from 'react'

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8">
        
      </div>
    </div>}>
      <SuccessPageContent />
    </Suspense>
  )
}

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const userId = searchParams.get("userId")
  const cartItemsParam = searchParams.get("cartItems")
  const router = useRouter()
  const userContext = useUser()

  const { createCartPaid, isLoading: createCartPaidLoading, error: createCartPaidError } = useCreateCartPaid()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        console.log("Starting handlePaymentSuccess...")

        if (!sessionId) {
          setError("Session ID is missing")
          setIsLoading(false)
          console.log("Session ID is missing")
          return
        }

        console.log("Session ID:", sessionId)

        if (!userId || !cartItemsParam) {
          setError("Required data is missing")
          setIsLoading(false)
          console.log("Required data is missing")
          return
        }

        const cartItems = JSON.parse(cartItemsParam)

        console.log("User ID:", userId)
        console.log("Cart Items:", cartItems)

        await createCartPaid(userId, cartItems)
        console.log("CartPaid document created successfully.")
      } catch (err) {
        console.error("Error creating CartPaid document:", err)
        setError("An error occurred while processing the payment.")
      } finally {
        setIsLoading(false)
      }
    }

    if (typeof window !== 'undefined') {
      handlePaymentSuccess()
    }
  }, [sessionId, userId, cartItemsParam, createCartPaid])

  const handleNavigateHome = () => {
    if (userContext?.user?.id) {
      console.log("Navigating to user profile:", `/profile/${userContext.user.id}`)
      router.push(`/profile/${userContext.user.id}`)
    } else {
      console.error('userContext.user.id is undefined or null')
    }
  }

  if (isLoading || createCartPaidLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/*   <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="animate-pulse">
         <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
          </div>
        </div> */}
      </div>
    )
  }
  
  if (error || createCartPaidError) {
    return (
      <div className="flex justify-center items-center h-screen p-[20px]">
      <div className="bg-[#1E2136]rounded-2xl p-2 w-full max-w-md shadow-2xl">
          <h1 className="text-2xl font-bold mb-4">Oops, something went wrong!</h1>
          <p className="text-gray-600 mb-6">
            {error || createCartPaidError?.message}
          </p>
          <button
          className="bg-[#1E2136] hover:bg-[#] text-white font-bold py-2 px-4 rounded-2xl mb-5"
          onClick={handleNavigateHome}
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex justify-center items-center h-screen p-[20px]">
      <div className="bg-[#1E2136]rounded-2xl p-2 w-full max-w-md shadow-2xl">
      <img src="images/success.jpg" alt="Success" className="w-full h-200px rounded-xl mb-5" />
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        
        <p className="text-[#7B7B8C] mb-5">
          Your tracks are available for download in your profile under the "Show downloads".
        </p>
        <button
          className="bg-[#1E2136] hover:bg-[#] text-white font-bold py-2 px-4 rounded-2xl mb-5"
          onClick={handleNavigateHome}
        >
          Go to Profile
        </button>
      </div>
    </div>
  )
}  