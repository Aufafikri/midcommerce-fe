"use client"

import React from 'react'
import { z } from 'zod'
import { registerSchema } from '../../../schema/useAuthSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRegisterUser } from '@/features/Auth/useRegisterUser'
import { toast, Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const FormRegister = () => {
    type FormRegister = z.infer<typeof registerSchema>

    const { mutate } = useRegisterUser()

    const form = useForm<FormRegister>({
        resolver: zodResolver(registerSchema)
    })

    const { control, handleSubmit } = form
    
    const router = useRouter()

    const onSubmit = handleSubmit((values) => {
      mutate(values, {
        onSuccess: () => {
          toast.success("register success!"),
          setTimeout(() => {
            router.push('/')
          }, 1000);
        }
      })
    })
  return (
    <div className='p-4 w-96 border'>
      <h1 className='text-3xl font-bold text-center'>Sign Up</h1>
      <Form {...form}>
        <form onSubmit={onSubmit} className='space-y-4'>
          <FormField
          control={control}
          name='name'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
          />
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

export default FormRegister