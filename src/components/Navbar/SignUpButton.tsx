"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const SignUpButton = () => {
    const router = useRouter()
  return (
    <>
        <Button onClick={() => router.push('/sign-up')}>
            Sign Up
        </Button>
    </>
  )
}

export default SignUpButton