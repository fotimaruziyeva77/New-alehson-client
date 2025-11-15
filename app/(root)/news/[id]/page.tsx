// 'use client'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { CategoryTypes, NewsTypes } from '@/interfaces'
// // import { API_REQUEST } from '@/lib/apiRequest'
// import axios from 'axios'
// import { Facebook, Linkedin, MoveLeft, Twitter } from 'lucide-react'
// import { usePathname } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import DOMPurify from 'dompurify'
// import Link from 'next/link'
// import Image from 'next/image'

// function page() {
// 	const [news, setNews] = useState<NewsTypes | null>(null)
// 	const [categories, setCategories] = useState<CategoryTypes[]>([])
// 	const pathname = usePathname()
// 	const id = pathname.split('/').pop()

// 	// useEffect(() => {
// 	// 	if (!id) return
// 	// 	console.log('Fetching news for ID:', id)
// 	// 	const fetchNews = async () => {
// 	// 		try {
// 	// 			const response = await axios.get(`${API_REQUEST.news}/${id}/`)
// 	// 			setNews(response.data)
// 	// 		} catch (error) {
// 	// 			console.error('Xatolik yuz berdi:', error)
// 	// 		}
// 	// 	}

// 	// 	fetchNews()
// 	// }, [id])
// 	// useEffect(() => {
// 	// 	axios
// 	// 		.get(API_REQUEST.categories)
// 	// 		.then(res => setCategories(res.data))
// 	// 		.catch(err => console.error('Xatolik:', err))
// 	// }, [])
// 	// if (!news) {
// 	// 	return <p className='text-center mt-20 text-gray-500'>Yuklanmoqda...</p>
// 	// }
// 	return (
// 		<div className='mt-20'>
// 			<div className='p-6 max-w-6xl mx-auto'>
// 				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
// 					<div className='md:col-span-2'>
// 						<Card>
// 							<Image
// 								src={`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/media/${news.image}`}
// 								alt={news.title}
// 								className=' rounded-t-xl px-2'
// 							/>
// 							<CardContent className='p-6'>
// 								<h2 className='text-2xl font-bold'>{news.title}</h2>
// 								<p className='text-gray-600 mt-4'>{news.description}</p>
// 								<div className='bg-gray-100 p-4 mt-4 rounded-lg'>
// 									<blockquote className='text-green-700 font-semibold'>
// 										Mehribonlikdan Ilhom Oling, Yaxshilik Ulashing
// 									</blockquote>
// 								</div>
// 								<p
// 									className='text-gray-800 mt-4'
// 									dangerouslySetInnerHTML={{
// 										__html: DOMPurify.sanitize(news.content),
// 									}}
// 								/>
// 								<div>
// 									<Link href={'/news'}>
// 										<Button className='bg-yellow-400'>
// 											<MoveLeft />
// 											Orqaga
// 										</Button>
// 									</Link>
// 								</div>
// 							</CardContent>
// 						</Card>
// 					</div>

// 					{/* Category bo'limi */}
// 					<aside className='space-y-6'>
// 						<Card>
// 							<CardContent className='p-4'>
// 								<h3 className='text-lg font-semibold'>Kategoriyalar</h3>
// 								<ul className='mt-2 space-y-2'>
// 									{categories.map(category => (
// 										<Link href={`/category/${category.id}`} key={category.id}>
// 											<li>{category.name}</li>
// 										</Link>
// 									))}
// 								</ul>
// 							</CardContent>
// 						</Card>
// 					</aside>
// 				</div>

// 				{/* Social media tugmalari */}
// 				<div className='flex justify-between items-center mt-6'>
// 					<div className='space-x-2'>
// 						<Button variant='outline'>
// 							<Facebook size={18} />
// 						</Button>
// 						<Button variant='outline'>
// 							<Twitter size={18} />
// 						</Button>
// 						<Button variant='outline'>
// 							<Linkedin size={18} />
// 						</Button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default page
