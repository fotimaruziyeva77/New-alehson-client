'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaGoogle } from 'react-icons/fa'
import { account } from '@/lib/appwrite'
import { OAuthProvider } from 'appwrite'

export default function Login() {

const handleGoogleLogin = async () => {
  await account.createOAuth2Session(
    OAuthProvider.Google,
    'http://localhost:3000/profile',
    'http://localhost:3000/login'
  )
}

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 text-black'>
      <div className='grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-7xl mx-auto '>

        <div className='hidden md:flex items-center justify-center bg-gray-100'>
          <Image src={'/login.png'} alt='Login' width={500} height={500} />
        </div>

        <div className='flex flex-col justify-center px-8 py-12'>
          <h1 className='text-2xl font-bold text-center mb-4'>
            Get Started With Google
          </h1>

          <button
            onClick={handleGoogleLogin}
            className='flex items-center justify-center gap-2 border rounded-lg py-3 hover:bg-gray-50'
          >
            <FaGoogle className='text-red-500' />
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  )
}
