"use client"

import React, { useEffect, useState } from 'react'
import SignUpButton from './SignUpButton'
import SignInButton from './SignInButton'
import { useFetchMyProfile } from '@/features/profile/useFetchMyProfile'
import Profile from '../Profile/Index'
import '../../app/globals.css'
import { Skeleton } from '../ui/skeleton'

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null untuk status loading awal

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Periksa token di localStorage saat halaman dimuat (refresh)
      const token = localStorage.getItem("access_token");

      if (token) {
        // Jika ada token, anggap sudah login
        setIsLoggedIn(true);
      } else {
        // Jika tidak ada token, anggap belum login
        setIsLoggedIn(false);
      }
    }
  }, []); // Hanya dijalankan sekali saat halaman dimuat


  return (
    <div className='p-4 bg-blue-500'>
      <div className='text-white flex justify-between items-center'>
        <h1 className='font-semibold text-2xl'>Payment Midtrans Testing</h1>
        <div className='flex gap-4'>
        {isLoggedIn === null ? (
             <Skeleton className='h-4 w-[100px]' />
          ) : isLoggedIn ? (
            <>
            <Profile />
            </>
          ) : (
            <>
              <SignInButton />
              <SignUpButton />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar