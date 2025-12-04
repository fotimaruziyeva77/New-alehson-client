import { navLink } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Mobile from './mobile'
import { Button } from '@/components/ui/button'

function Navbar() {
	return (
		<nav className='fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-gray-100'>
			<div className='max-w-7xl mx-auto'>
				<div className='flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center space-x-3'>
						<Link href='/' className='flex items-center space-x-3 group'>
							<div className='relative'>
								<Image
									src={'/ehson-no-text.png'}
									alt='ehson'
									width={80}
									height={80}
									className='w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 transition-transform duration-300 group-hover:scale-105'
								/>
							</div>
							<span className='hidden sm:block text-xl font-bold text-gray-900'>
								ALEHSON
							</span>
						</Link>
					</div>

					{/* Desktop Navigation Links */}
					<div className='hidden lg:flex items-center space-x-1'>
						{navLink.map((link, index) => (
							<Link
								key={link.id}
								href={link.path}
								className='relative tracking-wide px-4 py-2 text-[18px] font-medium text-gray-700 hover:text-yellow-600 transition-all duration-200 rounded-xl hover:bg-yellow-50 group'
							>
								{link.name}
								<span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-500 transition-all duration-200 group-hover:w-3/4'></span>
							</Link>
						))}
					</div>

					{/* Desktop CTA Button */}
					<div className='hidden lg:flex items-center p-2 tracking-wide '>
						<Link href='/login'>
							<Button className='text-[18px] '>Kirish</Button>
						</Link>
					</div>
					<div className='lg:hidden'>
						<Mobile />
					</div>
				</div>

				<div className='hidden md:flex lg:hidden border-t border-gray-100 bg-gray-50/50'>
					<div className='flex justify-start items-center space-x-0 py-2 px-6 overflow-x-auto scrollbar-hide'>
						{navLink.map(link => (
							<Link
								key={link.id}
								href={link.path}
								className='px-3 py-1.5 text-[13px] font-medium text-gray-600 hover:text-yellow-600 transition-colors duration-150 whitespace-nowrap rounded-lg hover:bg-white mx-0.5'
							>
								{link.name}
							</Link>
						))}

						{/* Tablet CTA Button */}
						<div className='ml-auto pl-4'>
							<Link href='/help'>
								<Button className='px-4 py-1.5 text-[13px] rounded-lg border border-blue-500 text-blue-500 bg-white hover:bg-blue-500 hover:text-white transition-colors'>
									Yordam
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
