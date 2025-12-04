'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaGoogle, FaFacebookF } from 'react-icons/fa'
import Link from 'next/link'
export default function Login() {
	const [showPassword, setShowPassword] = useState(false)

	const [loading, setLoading] = useState(false)

	const handleGoogleLogin = async () => {
		setLoading(true)
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/auth/google/`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (!res.ok) throw new Error('Login failed')

			const data = await res.json()
			localStorage.setItem('token', data.token)

			window.location.href = '/profile'
		} catch (err) {
			console.error(err)
			alert('Login failed')
		} finally {	
			setLoading(false)
		}
	}

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-50 text-black'>
			<div className='grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-7xl mx-auto '>
				<div className='hidden md:flex items-center justify-center bg-gray-100'>
					<Image src={'/login.png'} alt='He' width={500} height={500} />
				</div>
				<div className='flex flex-col justify-center px-8 py-12'>
					<h1 className='text-2xl font-bold text-center text-gray-800 mb-2'>
						Get Started Now
					</h1>
					<p className='text-center text-gray-500 mb-6'>
						Enter your credentials to login your account
					</p>

					{/* Social Buttons */}
					<div className='flex gap-4 mb-6'>
						<button
							onClick={handleGoogleLogin}
							className='flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50'
						>
							<FaGoogle className='text-red-500' /> Google
						</button>
					</div>

					<div className='relative flex items-center justify-center mb-6'>
						<span className='w-full border-t' />
						<span className='px-3 text-gray-400 bg-white'>OR</span>
						<span className='w-full border-t' />
					</div>

					{/* Email */}
					<div className='mb-4'>
						<label className='block text-gray-600 mb-1'>Email</label>
						<input
							type='email'
							placeholder='jhon@example.com'
							className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'
						/>
					</div>

					{/* Password */}
					<div className='mb-4'>
						<label className='block text-gray-600 mb-1'>Password</label>
						<div className='relative'>
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder='••••••••'
								className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'
							/>
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								className='absolute right-3 top-2 text-gray-500 hover:text-gray-700'
							>
								{showPassword ? '🙈' : '👁'}
							</button>
						</div>
					</div>

					{/* Remember Me & Forgot */}
					<div className='flex items-center justify-end mb-6'>
						<Link href='/' className='text-blue-600 text-sm hover:underline'>
							Forgot Password ?
						</Link>
					</div>

					{/* Login Button */}
					<button className='w-[250px] flex items-center justify-center mx-auto text-white cursor-pointer  bg-blue-600 text-black py-2 rounded-lg hover:bg-blue-700 transition'>
						Login
					</button>
				</div>
			</div>
		</div>
	)


}
