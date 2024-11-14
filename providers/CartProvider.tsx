"use client"

import React from 'react'
import { CartProvider } from '@/context/CartContext'

const CartProviders = ({ children }: {children: React.ReactNode}) => {
  return (
    <CartProvider>
        {children}
    </CartProvider>
  )
}

export default CartProviders