"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const SignInButton = () => {
    const router = useRouter()
  return (
    <>
        <Button onClick={() => router.push('/sign-in')}>
            Sign In
        </Button>
    </>
  )
}

export default SignInButton