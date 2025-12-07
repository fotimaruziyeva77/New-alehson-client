'use client'
import { Button } from '@/components/ui/button'
import { NewsTypes } from '@/interfaces'


import axios from 'axios'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { API_REQUEST } from '@/services'
import Image from 'next/image'

function NewsPage() {
	const [news, setNews] = useState<NewsTypes[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(API_REQUEST.news)
				setNews(response.data.results)
			} catch (err) {
				console.error('Failed to fetch news:', err)
				setError('Failed to load news. Please try again later.')
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<div className='lds-spinner'>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<p className='text-red-500'>{error}</p>
			</div>
		)
	}

	return (
		<div>
			{/* Banner Section */}
			<div
				className='w-full h-[400px] bg-cover bg-center flex flex-col items-center justify-center'
				style={{ backgroundImage: "url('/edit.png')" }}
			>
				<h1 className='text-white text-5xl font-bold text-center pt-20'>
					Yangiliklar
				</h1>
				<div className='flex items-center justify-center mt-10 text-white'>
					<Breadcrumb className='text-white'>
						<BreadcrumbList className='text-white'>
							<BreadcrumbItem>
								<BreadcrumbLink href='/' className='hover:text-yellow-500'>
									Bosh sahifa
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage className='text-white'>
									Yangiliklar
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</div>

			{/* News List Section */}
			<div className='w-full flex flex-wrap  gap-5 p-10'>
				{news.map(item => (
					<div
						key={item.id}
						className='w-96 h-[500px] dark:bg-zinc-800 bg-white rounded-2xl shadow-lg overflow-hidden'
					>
						{/* News Image */}
						<div className='w-full h-48 overflow-hidden'>
							<Image
								src={`${item.image_url}`}
								alt={item.title}
								width={300}
								height={300}
								className='w-full h-full object-cover'
							/>
						</div>

						{/* News Content */}
						<div className='p-5 flex flex-col gap-3'>
							{/* Title and View Count */}
							<div className='flex justify-between text-sm dark:text-white text-black'>
								<h3 className='text-lg font-semibold dark:text-white text-black line-clamp-2'>
									{item.title}
								</h3>
								<div className='flex gap-2'>
									<Eye size={16} />
									<span>{item.views}</span>
								</div>
							</div>

							{/* Description */}
							<p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>
								{item.description}
							</p>

							{/* Region and Date */}
							<div className='flex justify-between text-xs dark:text-white text-black'>
								<span className='flex items-center gap-1'>{item.region}</span>
								<span>
									{format(new Date(item.created_date), 'HH:mm, dd MMM yyyy')}
								</span>
							</div>

							{/* Read More Button */}
							<div className='flex items-end justify-center gap-3 mt-5'>
								<Link href={`/news/${item.slug}`}>
									<Button variant='outline'>Ko'proq ko'rish</Button>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default NewsPage
