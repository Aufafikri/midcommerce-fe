import Navbar from '@/components/Navbar/Index'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='p-6'>
      <Link href="/products">Go To Products</Link>
      </div>
    </div>
  )
}

export default Home