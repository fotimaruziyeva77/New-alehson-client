
'use client'
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import type { About } from '@/interfaces'
import { API_REQUEST } from '@/services'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

function About() {
	const [about, setAbout] = useState<About[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(API_REQUEST.about)

				const data = res.data

				// ⭐ ENG MUHIM TUZATISH ⭐
				setAbout(Array.isArray(data) ? data : [data])

				console.log(data)
			} catch (err) {
				console.error('Xatolik yuz berdi:', err)
			}
		}
		fetchData()
	}, [])

	return (
		<div>
      
			{about.map(about => (
				<div key={about.id}>
					<div className='relative w-full h-[300px] md:h-[400px]'>
						<Image
							src={about.main_image_url}
							alt='Hello'
							fill
							className='object-cover'
							priority
						/>
						<div className='absolute inset-0 flex flex-col justify-center items-center bg-black/50'>
							<h1 className='text-white text-2xl md:text-4xl font-bold text-center'>
								Biz haqimizda
							</h1>
							<div className='mt-4 md:mt-10'>
								<Breadcrumb>
									<BreadcrumbList className='text-white text-lg md:text-xl'>
										<BreadcrumbItem>
											<BreadcrumbLink
												href='/'
												className='hover:text-yellow-500'
											>
												Bosh sahifa
											</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator />
										<BreadcrumbItem>
											<BreadcrumbLink
												href='/about'
												className='hover:text-yellow-500'
											>
												Biz haqimizda
											</BreadcrumbLink>
										</BreadcrumbItem>
									</BreadcrumbList>
								</Breadcrumb>
							</div>
						</div>
					</div>

					<div className='w-full p-6 md:p-8'>
						<h1 className='text-center text-2xl md:text-4xl font-bold mb-8'>
							{about.main_title}
						</h1>

						<div className='flex flex-col md:flex-row items-center gap-2'>
							<div className='w-full md:w-1/2'>
								<Image
									src={about.main_image_url}
									alt='Helping hands'
									width={800}
									height={400}
								/>
							</div>

							<div className='w-full md:w-1/2'>
								<p className='text-gray-700 mb-6'>{about.description}</p>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default About

