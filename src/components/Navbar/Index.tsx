"use client"

import React, { useEffect, useState } from 'react'
import SignUpButton from './SignUpButton'
import SignInButton from './SignInButton'
import { useFetchMyProfile } from '@/features/profile/useFetchMyProfile'
import Profile from '../Profile/Index'
import '../../app/globals.css'
import { Skeleton } from '../ui/skeleton'

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); 
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");

      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);


  return (
    <div className='p-4 bg-blue-500'>
      <div className='text-white flex justify-between items-center'>
        <h1 className='font-semibold text-2xl'>Midcommerces</h1>
        <div className='flex gap-4'>
            <SignInButton />
            <SignUpButton />
        </div>
      </div>
    </div>
  )
}

export default Navbar