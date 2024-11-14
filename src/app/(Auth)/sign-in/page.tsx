import FormLogin from '@/components/Auth/login-form'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='h-screen flex justify-center items-center p-4'>
        <div className='flex justify-center items-center'>
        <FormLogin />
        </div>
    </div>
  )
}

export default SignInPage