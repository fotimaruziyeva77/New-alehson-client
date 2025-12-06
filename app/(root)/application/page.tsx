'use client'

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Filter, Eye, Calendar, Phone, MapPin } from 'lucide-react'
import axios from 'axios'
import { API_REQUEST } from '@/services'
import Image from 'next/image'
import { Application } from '@/interfaces'


// Types
interface CategoryType {
	id: number
	name: string
	subcategories: SubcategoryType[]
}

interface SubcategoryType {
	id: number
	name: string
	category: number
}

export default function ApplicationPage() {
	const [categories, setCategories] = useState<CategoryType[]>([])
	const [applications, setApplications] = useState<Application[]>([])
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
	const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
		null
	)
	const [searchQuery, setSearchQuery] = useState('')
	const [filteredApps, setFilteredApps] = useState<Application[]>([])
	const [loading, setLoading] = useState(true)

	// Ma'lumotlarni API'dan olish
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				// Kategoriyalarni olish
				const categoriesResponse = await axios.get(API_REQUEST.categories)
				const categoriesData = categoriesResponse.data
				setCategories(categoriesData)

				// Applicationlarni olish
				const appsResponse = await axios.get(API_REQUEST.applications)
				const appsData = appsResponse.data
				setApplications(appsData)
				setFilteredApps(appsData)
			} catch (error) {
				console.error('Error fetching data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	// Filtirlash logikasi
	useEffect(() => {
		let filtered = applications

		if (selectedCategory) {
			filtered = filtered.filter(app => app.category_title === selectedCategory)
		}

		if (selectedSubcategory) {
			filtered = filtered.filter(
				app => app.subcategory_title === selectedSubcategory
			)
		}

		if (searchQuery) {
			filtered = filtered.filter(
				app =>
					app.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					(app.description &&
						app.description
							.toLowerCase()
							.includes(searchQuery.toLowerCase())) ||
					app.passport_number.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}

		setFilteredApps(filtered)
	}, [selectedCategory, selectedSubcategory, searchQuery, applications])

	// Tanlangan kategoriyaga tegishli subkategoriyalar
	const currentSubcategories = selectedCategory
		? categories.find(cat => cat.name === selectedCategory)
				?.subcategories || []
		: []

	// Status ranglari
	const getStatusColor = (status: string) => {
		switch (status?.toLowerCase()) {
			case 'active':
			case 'approved':
				return 'bg-green-500'
			case 'pending':
			case 'in_review':
				return 'bg-yellow-500'
			case 'completed':
			case 'finished':
				return 'bg-blue-500'
			case 'denied':
			case 'rejected':
				return 'bg-red-500'
			default:
				return 'bg-gray-500'
		}
	}

	const getStatusText = (status: string) => {
		switch (status?.toLowerCase()) {
			case 'active':
				return 'Faol'
			case 'pending':
				return "Ko'rib chiqilmoqda"
			case 'approved':
				return 'Tasdiqlangan'
			case 'denied':
				return 'Rad etilgan'
			case 'completed':
				return 'Yakunlangan'
			default:
				return status
		}
	}

	const resetFilters = () => {
		setSelectedCategory(null)
		setSelectedSubcategory(null)
		setSearchQuery('')
	}

	// Format date
	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('uz-UZ', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	// Kategoriya nomini topish
	const getCategoryName = (categoryId: number) => {
		const category = categories.find(cat => cat.id === categoryId)
		return category?.name || `Category ${categoryId}`
	}

	// Subkategoriya nomini topish
	// const getSubcategoryName = (subcategoryId: number) => {
	// 	for (const category of categories) {
	// 		const subcategory = category.subcategories.find(
	// 			sub => sub.name === subcategoryId
	// 		)
	// 		if (subcategory) return subcategory.name
	// 	}
	// 	return `Subcategory ${subcategoryId}`
	// }

	if (loading) {
		return (
			<div className='container mx-auto p-4 md:p-6'>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
					{/* Filter skeleton */}
					<div className='lg:col-span-1 space-y-4'>
						<Skeleton className='h-10 w-full' />
						<Skeleton className='h-10 w-full' />
						<Skeleton className='h-10 w-full' />
					</div>
					{/* Content skeleton */}
					<div className='lg:col-span-3'>
						<Skeleton className='h-12 w-full mb-6' />
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
							{[1, 2, 3, 4, 5, 6].map(i => (
								<Skeleton key={i} className='h-64 rounded-xl' />
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6'>
			<div className='container mx-auto'>
				<div className='mb-8'>
					<h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>
						Ariza Ro'yxati
					</h1>
					<p className='text-gray-600'>
						Barcha arizalarni filtrlash va ko'rish
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
					{/* Chap sidebar - Filtrlar */}
					<div className='lg:col-span-1'>
						<Card className='sticky top-6 shadow-lg border-0'>
							<CardContent className='p-6'>
								<div className='flex items-center justify-between mb-6'>
									<h2 className='text-xl font-semibold flex items-center gap-2'>
										<Filter className='w-5 h-5' />
										Filtrlar
									</h2>
									<Button
										variant='outline'
										size='sm'
										onClick={resetFilters}
										className='text-xs'
									>
										Barchasini tozalash
									</Button>
								</div>

								<div className='space-y-6'>
									{/* Kategoriya filtri */}
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Kategoriya
										</label>
										<Select
											value={selectedCategory || ''}
											onValueChange={value => {
												setSelectedCategory(value)
												setSelectedSubcategory(null)
											}}
										>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Kategoriya tanlang' />
											</SelectTrigger>
											<SelectContent>
												{categories.map(cat => (
													<SelectItem
														key={cat.id}
														value={cat.name}
														className='flex items-center justify-between'
													>
														<span>{cat.name}</span>
														<Badge variant='secondary' className='ml-2'>
															{
																applications.filter(
																	app => app.category_title === cat.name
																).length
															}
														</Badge>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									{/* Subkategoriya filtri */}
									{currentSubcategories.length > 0 && (
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>
												Subkategoriya
											</label>
											<Select
												value={selectedSubcategory || ''}
												onValueChange={setSelectedSubcategory}
											>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Subkategoriya tanlang' />
												</SelectTrigger>
												<SelectContent>
													{currentSubcategories.map(sub => (
														<SelectItem key={sub.id} value={sub.name}>
															{sub.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
									)}

									{/* Faol filtrlar */}
									{(selectedCategory || selectedSubcategory) && (
										<div className='pt-4 border-t'>
											<h3 className='text-sm font-medium text-gray-700 mb-2'>
												Faol Filtrlar
											</h3>
											<div className='flex flex-wrap gap-2'>
												{selectedCategory && (
													<Badge
														variant='secondary'
														className='cursor-pointer hover:bg-gray-200'
														onClick={() => setSelectedCategory(null)}
													>
														{
															categories.find(
																c => c.name === selectedCategory
															)?.name
														}{' '}
														×
													</Badge>
												)}
												{selectedSubcategory && (
													<Badge
														variant='secondary'
														className='cursor-pointer hover:bg-gray-200'
														onClick={() => setSelectedSubcategory(null)}
													>
														{
															currentSubcategories.find(
																s => s.id.toString() === selectedSubcategory
															)?.name
														}{' '}
														×
													</Badge>
												)}
											</div>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* O'ng kontent */}
					<div className='lg:col-span-3'>
						{/* Qidiruv paneli */}
						<div className='mb-8'>
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
								<Input
									placeholder="Ism, familiya yoki pasport raqami bo'yicha qidirish..."
									value={searchQuery}
									onChange={e => setSearchQuery(e.target.value)}
									className='pl-10 py-6 text-base shadow-md border-gray-300 focus:border-primary'
								/>
							</div>
							<div className='mt-3 text-sm text-gray-500'>
								Jami {filteredApps.length} ta ariza ({applications.length}{' '}
								tadan)
							</div>
						</div>

						{/* Ariza kartalari */}
						{filteredApps.length > 0 ? (
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{filteredApps.map(app => (
									<Card
										key={app.id}
										className='group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200'
									>
										{/* Rasm qismi */}
										<div className='relative h-48 overflow-hidden bg-gray-100'>
											{app.images && app.images.length > 0 ? (
												<Image
													src={app.images[0] || '/api/placeholder/400/300'}
													alt={app.full_name}
													width={400}
													height={300}
													className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
												/>
											) : (
												<div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50'>
													<div className='text-center'>
														<div className='w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center'>
															<span className='text-2xl font-bold text-blue-600'>
																{app.full_name.charAt(0)}
															</span>
														</div>
														<p className='text-sm text-gray-500'>
															Rasm mavjud emas
														</p>
													</div>
												</div>
											)}

											{/* Status */}
											<div className='absolute top-3 right-3'>
												<Badge
													className={`${getStatusColor(app.status)} text-white`}
												>
													{getStatusText(app.status)}
												</Badge>
											</div>

											{/* Subkategoriya */}
											<div className='absolute bottom-3 left-3'>
												<Badge
													variant='secondary'
													className='bg-white/90 backdrop-blur-sm'
												>
													{/* {getSubcategoryName(app.subcategory_title )} */}
												</Badge>
											</div>
										</div>

										{/* Kontent */}
										<CardContent className='p-5'>
											{/* Ism va ID */}
											<div className='flex items-start justify-between mb-3'>
												<h3 className='text-lg font-bold text-gray-800 line-clamp-1'>
													{app.full_name}
												</h3>
												<span className='text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded'>
													ID: {app.id}
												</span>
											</div>

											{/* Tavsif */}
											{app.description && (
												<p className='text-sm text-gray-600 mb-4 line-clamp-2'>
													{app.description}
												</p>
											)}

											{/* Ma'lumotlar */}
											<div className='space-y-2 mb-4'>
												<div className='flex items-center text-sm text-gray-600'>
													<Phone className='w-4 h-4 mr-2 text-gray-400' />
													<span>{app.phone_number}</span>
												</div>

												<div className='flex items-center text-sm text-gray-600'>
													<Calendar className='w-4 h-4 mr-2 text-gray-400' />
													<span>{formatDate(app.birth_date)}</span>
												</div>

												<div className='flex items-center text-sm text-gray-600'>
													<MapPin className='w-4 h-4 mr-2 text-gray-400' />
													<span className='line-clamp-1'>
														{app.region}, {app.location}
													</span>
												</div>
											</div>

											{/* Kategoriya va pasport */}
											<div className='flex items-center justify-between text-sm pt-3 border-t'>
												<div className='font-medium text-gray-700'>
													{/* {getCategoryName(app.category_title)} */}
												</div>
												<div className='text-gray-500'>
													Pass: {app.passport_number}
												</div>
											</div>
										</CardContent>

										{/* Footer - Tugma */}
										<CardFooter className='p-5 pt-0'>
											<Button
												className='w-full group/btn'
												variant='default'
												onClick={() =>
													(window.location.href = `/application/${
														app.slug || app.id
													}`)
												}
											>
												<Eye className='w-4 h-4 mr-2 group-hover/btn:animate-pulse' />
												Batafsil Ko'rish
											</Button>
										</CardFooter>
									</Card>
								))}
							</div>
						) : (
							<div className='text-center py-16'>
								<div className='text-gray-400 mb-4'>
									<Search className='w-16 h-16 mx-auto' />
								</div>
								<h3 className='text-xl font-semibold text-gray-600 mb-2'>
									Hech qanday ariza topilmadi
								</h3>
								<p className='text-gray-500 mb-6'>
									Qidiruv yoki filtrni o'zgartirib ko'ring.
								</p>
								<Button onClick={resetFilters}>
									Barcha Filtrlarni Tozalash
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
