'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { helpOptions } from '@/constants'
import { MoveRight } from 'lucide-react'

import HeroBanner from './components/banner'
import { API_REQUEST } from '@/services'
import {

	Application,
	CategoryTypes,
	HomeTypes,
	NewsTypes,
} from '@/interfaces'

function Homepage() {
	const [categories, setCategories] = useState<CategoryTypes[]>([])
	const [news, setNews] = useState<NewsTypes[]>([])
	const [applications, setApplications] = useState<Application[]>([])
	const [home, setHome] = useState<HomeTypes>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchAll = async () => {
			try {
				const [catRes, newsRes, appRes] = await Promise.all([
					axios.get(API_REQUEST.categories),
					axios.get(API_REQUEST.news),
					axios.get(API_REQUEST.applications),
				])

				setCategories(catRes.data || [])
				setNews(newsRes.data?.results || [])
				setApplications(appRes.data?.results || [])
			} catch (err) {
				console.error(err)
				setError('Maʼlumot yuklashda xatolik yuz berdi')
			} finally {
				setLoading(false)
			}
		}

		fetchAll()
	}, [])

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<div className='animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full'></div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<p className='text-red-500 text-lg'>{error}</p>
			</div>
		)
	}

	return (
		<>
			<div className='w-full'>

				{/* HERO */}
				<HeroBanner />

				<h1 className='text-xl md:text-5xl mt-20 text-center'>
					Bir inson hayotini o'zgartirishga tayyormisiz?
				</h1>

				{/* HELP OPTIONS */}
				<div className='container mx-auto py-12 px-4'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{helpOptions.map(item => (
							<div
								key={item.id}
								className='border rounded-lg p-6 text-center shadow hover:shadow-lg transition'
							>
								<div className='flex justify-center mb-4'>
									<Image
										src={item.image}
										alt={item.title}
										width={150}
										height={150}
									/>
								</div>

								<h3 className='text-xl font-semibold mb-2'>
									{item.title}
								</h3>

								<p className='text-gray-600 mb-4 line-clamp-2'>
									{item.description}
								</p>

								<button
									className='
										border border-blue-500 text-blue-500 
										px-4 py-2 rounded-lg
										hover:bg-blue-500 hover:text-white transition
									'
								>
									Batafsil
								</button>
							</div>
						))}
					</div>
				</div>

				{/* INFO SECTION */}
				<div className='max-w-8xl mx-auto p-6 md:p-10 bg-[#F4F1FA] rounded-lg shadow-lg flex flex-col md:flex-row gap-8'>

					{/* IMAGES */}
					<div className='flex flex-col gap-4 w-full'>
						<Image
							src='/1.png'
							alt='img'
							width={400}
							height={300}
							className='rounded object-contain'
						/>

						<div className='flex gap-4'>
							<Image
								src='/2.png'
								alt='img'
								width={300}
								height={200}
								className='rounded object-contain'
							/>

							<Image
								src='/3.png'
								alt='img'
								width={300}
								height={200}
								className='rounded object-contain'
							/>
						</div>
					</div>

					{/* TEXT */}
					<div className='w-full px-2 md:px-10'>
						<h2 className='text-3xl font-bold mb-4'>
							Yordam bering, umid ulashing!
						</h2>

						<p className='text-gray-600 mb-6 leading-relaxed'>
							Alehson – ehtiyojmand bolalarni qo‘llab-quvvatlashga
							qo‘shilgan ijtimoiy loyihadir...
						</p>

						<Button
							variant='outline'
							className='flex items-center gap-3'
						>
							Barchasini ko‘rish <MoveRight />
						</Button>
					</div>
				</div>

				{/* NEWS */}
				<h1 className='text-xl md:text-3xl mt-20 px-4'>
					Oxirgi yangiliklar
				</h1>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6'>
					{news.map(item => (
						<Card key={item.id} className='shadow-lg'>
							<Link href={`/news/${item.id}`}>
								<Image
									src={`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/media/${item.image}`}
									alt={item.title}
									width={300}
									height={200}
									className='w-full object-contain'
								/>
							</Link>

							<CardContent className='p-4'>
								<h3 className='font-semibold mb-2 line-clamp-1'>
									{item.title}
								</h3>

								<p className='text-sm text-gray-600 line-clamp-2'>
									{item.description}
								</p>

								<div className='mt-4 text-center'>
									<Link href={`/news/${item.id}`}>
										<Button variant='outline'>
											Ko‘proq ko‘rish →
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

			</div>
		</>
	)
}

export default Homepage
