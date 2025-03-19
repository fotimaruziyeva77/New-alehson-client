'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { API_REQUEST } from '@/lib/apiRequest'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { CategoryTypes } from '@/interfaces'

function CategoryPage() {
	const [categories, setCategories] = useState<CategoryTypes[]>([])
	const router = useRouter()

	useEffect(() => {
		axios
			.get(API_REQUEST.categories)
			.then(res => setCategories(res.data))
			.catch(err => console.error('Xatolik:', err))
	}, [])

	const handleCategoryClick = (category: CategoryTypes) => {
		if (category.subcategories && category.subcategories.length > 0) {
			router.push(`/subcategory?categoryId=${category.id}`)
		} else {
			router.push('/helpme')
		}
	}

	return (
		<div className='mt-10'>
			<div className='mx-auto'>
				<div
					className='w-full h-[400px] bg-cover bg-center'
					style={{ backgroundImage: "url('/edit.png')" }}
				>
					<h1 className='text-white text-5xl font-bold text-center pt-20'>
						Kategoriyalar
					</h1>
					<div className='flex justify-center mt-10 text-white'>
						<Breadcrumb>
							<BreadcrumbList className='text-white'>
								<BreadcrumbItem>
									<BreadcrumbLink href='/' className='hover:text-yellow-500'>
										Bosh sahifa
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink
										href='/category'
										className='hover:text-yellow-500'
									>
										Kategoriyalar
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</div>

				<div className='grid md:grid-cols-4 gap-6 p-6'>
					{categories.map(category => (
						<Card key={category.id} className='overflow-hidden shadow-lg'>
							<img
								src={category.image}
								alt='category'
								className='w-full h-48 object-cover'
							/>
							<CardContent className='p-4'>
								<h3 className='text-lg font-semibold mb-2'>{category.name}</h3>
								<div className='flex items-center justify-center mt-10'>
									<Button
										variant='outline'
										className='border border-blue-500 text-blue-500 bg-white hover:bg-blue-500 hover:text-white py-5 px-8 rounded cursor-pointer'
										onClick={() => handleCategoryClick(category)}
									>
										Ko'rish
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}

export default CategoryPage
