"use client"

import React, { useState } from 'react'
import { z } from 'zod'
import { loginSchema } from '../../../schema/useAuthSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useLoginUser } from '@/features/Auth/useLoginUser'
import toast, { Toaster } from 'react-hot-toast'

const FormLogin = () => {
    type FormLogin = z.infer<typeof loginSchema>

    const { mutate } = useLoginUser()
    const [backendError, setBackendError] = useState<string | null>(null)

    const form = useForm<FormLogin>({
        resolver: zodResolver(loginSchema)
    })

    const { control, handleSubmit } = form

    const onSubmit = handleSubmit((values) => {
      console.log(values)
      mutate(values, {
        onError: (error: any) => {
          console.log(error)
          if (error.response?.data?.message) {
            toast.error(error.response?.data.message)
          }
        }
      })
    })
  return (
    <div className='p-4 w-96 border'>
      <h1 className='text-3xl font-bold text-center'>Sign In</h1>
      {backendError && <p className="text-red-500 text-center">{backendError}</p>}
      <Form {...form}>
        <form onSubmit={onSubmit} className='space-y-4'>
          <FormField
          control={control}
          name='email'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type='email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
          />
          <FormField
          control={control}
          name='password'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
          />
          <Button type='submit'> Submit </Button>
        </form>
      </Form>
      <Toaster />
    </div>
  )
}

export default FormLogin