"use client"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoIosTimer } from "react-icons/io";

const PendingPage = () => {
    const router = useRouter()
  return (
    <div className="h-screen flex justify-center items-center">
    <div className="flex justify-center items-center bg-slate-50 rounded-xl p-4 w-96">
      <div>
        <div className="flex justify-center items-center">
          <div className="bg-orange-500 p-2 rounded-xl">
            <IoIosTimer size={32} className="fill-white" />
          </div>
        </div>
        <div className="mt-2">
        <h1 className="text-2xl font-semibold text-center">Payment pending!</h1>
        <p className="text-center text-gray-500 mt-1">Your payment is pending. Please complete the payment to proceed. Back to the homepage</p>
        <div className="flex justify-center mt-4">
        <Button className="bg-orange-500 w-60" onClick={() => router.push("/")}>Go to home</Button>
        </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PendingPage