'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { ApplicationTypes } from '@/interfaces'
// import { API_REQUEST } from '@/lib/apiRequest'
import axios from 'axios'
import { MoveRight, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function HelpMepage() {
	const applications = [
		{
			id: 1,
			petition_id: '101',
			full_name: 'Abdullayev Jasur',
			information:
				'Jasur og‘ir holatga tushib qolgan. Oilaviy ahvol juda og‘ir. Uy-ro‘zg‘or uchun yordam kerak.',
			images: [
				'https://cdn.pixabay.com/photo/2017/01/31/20/52/help-2027840_1280.png',
			],
		},
		{
			id: 2,
			petition_id: '102',
			full_name: 'Salimova Muqaddas',
			information:
				'Yolg‘iz ona, farzandlarini boqish uchun moddiy yordamga muhtoj. Uying oylik ijarasi to‘lanmay qolgan.',
			images: [
				'https://cdn.pixabay.com/photo/2016/11/29/10/07/mother-1861347_1280.jpg',
			],
		},
		{
			id: 3,
			petition_id: '103',
			full_name: 'Yunusov Akmal',
			information:
				'Akmalga jiddiy tibbiy operatsiya kerak. Davolanish xarajatlari uchun yordam zarur.',
			images: [
				'https://cdn.pixabay.com/photo/2015/04/20/13/25/hospital-731432_1280.jpg',
			],
		},
		{
			id: 4,
			petition_id: '104',
			full_name: 'Karimova Iroda',
			information:
				'Irodaning farzandi nogiron. Doimiy dori-darmon va parvarish uchun moddiy yordam talab qilinadi.',
			images: [
				'https://cdn.pixabay.com/photo/2017/02/08/11/00/wheelchair-2046113_1280.jpg',
			],
		},
	]

	// const [applications, setApplications] = useState<ApplicationTypes[]>([]);
	//  const [loading, setLoading] = useState(true);
	//   const [error, setError] = useState<string | null>(null);
	// useEffect(() => {
	//   const fetchApplications = async () => {
	//     try {
	//       const res = await axios.get(API_REQUEST.applications);
	//       console.log("API Response:", res.data.results);
	//       setApplications(res.data.results || []);
	//       console.log("Applications State:", applications);
	//     } catch (err) {
	//       console.error("Xatolik yuz berdi:", err);
	//     }
	//   };
	//   fetchApplications();
	// }, []);

	return (
		<div className=''>
			<div className='relative w-full h-64 md:h-80 lg:h-96 bg-cover bg-center'>
				<Image
					src='/slider.png'
					alt='Ehson imkoniyatlari'
					fill
					className='object-cover'
					priority
				/>
				<div className='absolute inset-0 bg-black/50'></div>
				<div className='absolute inset-0 flex items-center justify-center'>
					<h1 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4 animate-fade-in'>
						Ehson imkoniyatlari
					</h1>
				</div>
			</div>
			<div className='mt-20 px-10 mx-auto'>
				<div className='flex justify-between px-10'>
					<h1 className='text-xl text-gray-800'>
						Kambag'al Odamlar Uchun Xayriya Qiling.
					</h1>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-10 mt-5'>
					{applications.map(item => (
						<Card
							key={item.id}
							className='overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-300 group'
						>
							{/* Image */}
							{item.images && item.images.length > 0 ? (
								<div className='relative h-52 overflow-hidden'>
									<Image
										src={item.images[0]}
										alt={item.full_name}
										width={400}
										height={300}
										className='w-full h-full object-cover group-hover:scale-110 transition duration-300'
									/>

									{/* Overlay hover qilinganda */}
									<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300'></div>
								</div>
							) : (
								<div className='h-40 bg-gray-200 flex items-center justify-center'>
									<span>Rasm mavjud emas</span>
								</div>
							)}

							<CardContent className='p-4'>
								<div className='mb-2'>
									<h3 className='text-lg font-semibold'>{item.full_name}</h3>
									<p className='text-sm text-gray-600 line-clamp-2'>
										{item.information}
									</p>
								</div>

								<div className='flex items-center justify-between mt-6'>
									<div className='flex items-center text-yellow-500 text-sm font-medium'>
										<User className='w-4 h-4 mr-1' /> {item.full_name}
									</div>

									<Link href={`/application/${item.petition_id}`}>
										<Button
											variant='outline'
											className='border border-yellow-500 text-black hover:bg-yellow-500 hover:text-white transition py-2 px-4 rounded-lg'
										>
											Ko‘proq ko‘rish
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Pagination */}
				<div className='flex justify-end mt-10 px-10'>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious href='#' />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href='#'>1</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href='#' isActive>
									2
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href='#'>3</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext href='#' />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	)
}

export default HelpMepage
