'use client'

import { useEffect, useState } from 'react'
import { navLink } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import Mobile from './mobile'
import { Button } from '@/components/ui/button'

import { account } from '@/lib/appwrite'
import UserMenu from './usermenu'


function Navbar() {
	const [user, setUser] = useState<any>(null)

	useEffect(() => {
		account
			.get()
			.then(setUser)
			.catch(() => setUser(null))
	}, [])

	return (
		<nav className='fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-gray-100'>
			<div className='max-w-7xl mx-auto'>
				<div className='flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8'>

					{/* LOGO */}
					<Link href='/' className='flex items-center space-x-3'>
						<Image
							src={'/ehson-no-text.png'}
							alt='ehson'
							width={80}
							height={80}
							className='w-12 h-12 lg:w-14 lg:h-14'
						/>
						<span className='hidden sm:block text-xl font-bold'>
							ALEHSON
						</span>
					</Link>

					{/* LINKS */}
					<div className='hidden lg:flex items-center space-x-1'>
						{navLink.map(link => (
							<Link
								key={link.id}
								href={link.path}
								className='px-4 py-2 text-[18px] font-medium hover:text-yellow-600 rounded-xl hover:bg-yellow-50'
							>
								{link.name}
							</Link>
						))}
					</div>

					{/* AUTH BUTTON */}
					<div className='hidden lg:flex items-center p-2'>

						{/* Login qilmagan */}
						{!user && (
							<Link href='/login'>
								<Button className='text-[18px]'>
									Kirish
								</Button>
							</Link>
						)}

						{/* Login qilingan */}
						{user && <UserMenu user={user} />}

					</div>

					{/* MOBILE */}
					<div className='lg:hidden'>
						<Mobile />
					</div>

				</div>
			</div>
		</nav>
	)
}

export default Navbar
