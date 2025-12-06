'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen text-center px-4'>
			<div className='relative w-full max-w-3xl'>
				<Image
					src={process.env.NEXT_PUBLIC_ERROR_IMG || '/error-page.png'}
					alt='404 illustration'
					width={800}
					height={400}
					className='mx-auto'
				/>
			</div>

			<h2 className='text-2xl md:text-3xl font-bold mt-6'>
				Oops! Page Not Found!
			</h2>

			<p className='text-gray-600 max-w-xl mt-3'>
				We’re sorry but we can’t seem to find the page you requested. This might
				be because you have typed the web address incorrectly.
			</p>

			<Link
				href='/'
				className='mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-full shadow transition'
			>
				Back To Home
			</Link>
		</div>
	)
}
