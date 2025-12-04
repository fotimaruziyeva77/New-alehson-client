'use client'

import Image from 'next/image'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = ['/banner1.jpg', '/banner1.jpg', '/banner1.jpg']

const stats = [
	{
		value: '3 200 000+',
		label: 'Kam ta\'minlangan oilalar (2024)',
	},
	{
		value: '980 000+',
		label: 'Nogironligi bo\'lgan shaxslar',
	},
	{
		value: '1 500 000+',
		label: 'Yordamga muhtoj insonlar',
	},
]

export default function HeroBanner() {
	const items = slides.map((src, index) => (
		<div key={index} className='relative w-full h-[500px] md:h-[600px] lg:h-[680px]'>
			<Image
				src={src}
				alt={`slide-${index}`}
				fill
				priority
				className='object-cover'
			/>
			{/* Gradient adjusted for text on right side */}
			<div className='absolute inset-0 bg-gradient-to-l from-black/85 via-black/40 to-transparent lg:from-black/80 lg:via-black/30' />
		</div>
	))

	return (
		<div className='relative w-full h-[500px] md:h-[600px] lg:h-[680px] overflow-hidden'>
			{/* SLIDER */}
			<AliceCarousel
				mouseTracking
				items={items}
				autoPlay
				autoPlayInterval={3500}
				infinite
				animationDuration={1200}
				disableDotsControls={false}
				renderPrevButton={() => (
					<button
						className='absolute left-2 md:left-5 top-1/2 -translate-y-1/2 z-20
            bg-white/30 hover:bg-white/50 text-white
            p-2 md:p-3 rounded-full transition-all duration-300'
					>
						<ChevronLeft size={24}  />
					</button>
				)}
				renderNextButton={() => (
					<button
						className='absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-20
            bg-white/30 hover:bg-white/50 text-white
            p-2 md:p-3 rounded-full transition-all duration-300'
					>
						<ChevronRight size={24}  />
					</button>
				)}
			/>

			{/* TEXT OVERLAY - Positioned to the right */}
		
		</div>
	)
}