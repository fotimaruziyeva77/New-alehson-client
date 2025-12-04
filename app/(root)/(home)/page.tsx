'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cardList, helpOptions } from '@/constants'
import { ChevronRight, MoveRight, User } from 'lucide-react'
import 'react-alice-carousel/lib/alice-carousel.css'
import AliceCarousel from 'react-alice-carousel'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
	ApplicationTypes,
	CategoryTypes,
	HomeTypes,
	NewsTypes,
} from '@/interfaces'
import HeroBanner from './components/banner'
import { CategoryGrid, HomePageStats } from './components/stats'
// import { API_REQUEST } from '@/services'

function Homepage() {
	const [categories, setCategories] = useState<CategoryTypes[]>([])
	const [news, setNews] = useState<NewsTypes[]>([])
	const [applications, setApplications] = useState<ApplicationTypes[]>([])
	const [home, setHome] = useState<HomeTypes>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	// // const [petition,setPetition]=useState<
	// // categories
	// useEffect(() => {
	//   axios
	//     .get(API_REQUEST.categories)
	//     .then((res) => setCategories(res.data))
	//     .catch((err) => console.error("Xatolik:", err));
	// }, []);

	// // news
	// useEffect(() => {
	//   const fetchData = async () => {
	//     await axios
	//       .get(API_REQUEST.news)
	//       .then((res) => setNews(res.data.results))
	//       .catch((err) => console.log(err));
	//     setLoading(false);
	//   };
	//   fetchData();
	// }, []);
	// // applications
	// useEffect(() => {
	//   const fetchApplications = async () => {
	//     try {
	//       const res = await axios.get(API_REQUEST.applications);
	//       console.log("API Response:", res.data);
	//       setApplications(res.data.results || []);
	//       console.log("Applications State:", applications);
	//     } catch (err) {
	//       console.error("Xatolik yuz berdi:", err);
	//     }
	//     setLoading(false);
	//   };
	//   fetchApplications();
	// }, []);

	//   const items = [
	//   <div key={1} className="w-full h-[940px] relative ">
	//     <Image src="/ChildThankYou-MbtHIvZc.jpg" alt="slide1" fill className="object-contain w-full h-full   " />
	//   </div>,
	//   <div key={2} className="w-full h-[940px] relative ">
	//     <Image src="/ChildThankYou-MbtHIvZc.jpg" alt="slide2" fill className="object-contain w-full h-full  " />
	//   </div>,
	//   <div key={3} className="w-full h-[940px] relative ">
	//     <Image src="/ChildThankYou-MbtHIvZc.jpg" alt="slide3" fill className="object-contain w-full h-full  " />
	//   </div>,
	// ];
	const imageLoader = ({ src, width, quality }) => {
		return `${src}?w=${width}&q=${quality || 75}`
	}

	const items = [
		<div key={1} className='w-full h-[940px] relative'>
			<Image
				src='/ChildThankYou-MbtHIvZc.jpg'
				alt='slide1'
				loader={imageLoader}
				fill
				priority // Birinchi rasmi optimallashtirish
				className=' w-full h-full'
				sizes='100vw'
			/>
		</div>,
		<div key={2} className='w-full h-[940px] relative'>
			<Image
				src='/ChildThankYou-MbtHIvZc.jpg'
				alt='slide2'
				loader={imageLoader}
				x
				fill
				className=' w-full h-full'
				sizes='100vw'
			/>
		</div>,
		<div key={3} className='w-full h-[940px] relative'>
			<Image
				src='/ChildThankYou-MbtHIvZc.jpg'
				alt='slide3'
				loader={imageLoader}
				fill
				className=' w-full h-full'
				sizes='100vw'
			/>
		</div>,
	]
	// home
	// useEffect(() => {
	//   const fetchHome = async () => {
	//     await axios
	//       .get(API_REQUEST.homesettings)
	//       .then((res) => setHome(res.data[0]))
	//       .catch((err) => console.log(err));
	//     setLoading(false);
	//   };

	//   fetchHome();
	// }, []);

	// if (loading) {
	//   return (
	//     <div className="flex justify-center items-center h-screen">
	//       <div className="lds-spinner">
	//         <div></div>
	//         <div></div>
	//         <div></div>
	//         <div></div>
	//         <div></div>
	//         <div></div>
	//         <div></div>
	//         <div></div>
	//         <div></div>
	//         <div></div>
	//         <div></div>
	//         <div></div>
	//       </div>
	//     </div>
	//   );
	// }

	// if (error) {
	//   return (
	//     <div className="flex justify-center items-center h-screen">
	//       <p className="text-red-500">{error}</p>
	//     </div>
	//   );
	// }
	return (
		<div className='w-full '>
			<HeroBanner />
			<br /> <br />
			<div>
				<h1 className='text-xl md:text-5xl mt-20 text-center'>
					Bir inson hayotini o'zgartirishga tayyormisiz?
				</h1>
			</div>
			<div className='container mx-auto py-12 px-4'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{helpOptions.map(item => (
						<div
							key={item.id}
							className='border rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300'
						>
							<div className='flex justify-center mb-4'>
								<Image
									src={item.image}
									alt={item.title}
									width={150}
									height={150}
								/>
							</div>
							<h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
							<p className='text-gray-600 mb-4 line-clamp-2'>
								{item.description}
							</p>
							<button className='border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition'>
								Batafsil
							</button>
						</div>
					))}
				</div>
			</div>
			<div className='max-w-8xl mx-auto p-4 sm:p-6 md:p-10 bg-[#F4F1FA] rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8'>
				{/* Rasm qismi */}
				<div className='w-full flex flex-col items-center gap-3 sm:gap-4 mb-6 md:mb-10'>
					<Image
						src='/1.png'
						alt='children'
						width={200}
						height={200}
						className='rounded w-full h-[200px] sm:h-[250px] md:h-[300px] object-contain w-full h-full  '
					/>

					<div className='flex gap-2 sm:gap-4 flex-wrap justify-center'>
						<Image
							src='/2.png'
							alt='help'
							width={200}
							height={200}
							className='rounded-lg shadow-md w-[100%] sm:w-[290px] h-[180px] sm:h-[200px] object-contain w-full h-full  '
						/>

						<Image
							src='/3.png'
							alt='help'
							width={200}
							height={200}
							className='rounded-lg shadow-md w-[100%] sm:w-[290px] h-[180px] sm:h-[200px] object-contain w-full h-full  '
						/>
					</div>
				</div>

				{/* Matn qismi */}

				<section className='px-3 sm:px-6 md:px-16 w-full'>
					<div className='max-w-4xl mx-auto'>
						<h2 className='text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 text-center md:text-left'>
							Yordam bering, umid ulashing!
						</h2>
						<p className='text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base text-center md:text-left leading-relaxed '>
							Alehson – mehr-shafqat va saxovat tamoyillariga asoslangan
							notijorat tashkilot bo‘lib, ehtiyojmand bolalarning hayotiga
							ijobiy ta’sir ko‘rsatishga intiladi. Bizning asosiy maqsadimiz har
							bir bolaning xavfsiz muhitda yashashi, sog‘lom rivojlanishi va
							sifatli ta’lim olish imkoniyatiga ega bo‘lishini ta’minlashdir.
							Dunyoda millionlab bolalar ochlik, yetarli boshpana yo‘qligi,
							sog‘liqni saqlash xizmatlaridan foydalanish imkoniyatining
							cheklanganligi va sifatli ta’limga ega bo‘lishdagi qiyinchiliklar
							tufayli qiyin sharoitlarda yashaydi. Biz aynan shu bolalarga
							yordam berish uchun harakat qilamiz. Sizning mehribonligingiz va
							saxovatingiz tufayli biz ularga oziq-ovqat, xavfsiz boshpana,
							tibbiy xizmatlar va ta’lim dasturlarini yetkazib bera olamiz. Biz
							bolalarning orzularini ro‘yobga chiqarish, ularga eng yaxshi
							imkoniyatlarni yaratish va kelajakda o‘z hayotlarini o‘zgartirish
							uchun zarur bo‘lgan bilim va ko‘nikmalar bilan ta’minlash yo‘lida
							harakat qilamiz. Bu faqat birgalikdagi sa’y-harakatlarimiz bilan
							amalga oshishi mumkin. Sizning xayriyangiz har bir bolaning
							hayotida haqiqiy farq yaratadi. Sizning yordamlaringiz orqali biz
							bolalarga sifatli ta’lim olish, yaxshi ovqatlanish, tibbiy
							ko‘riklardan o‘tish va xavfsiz muhitda ulg‘ayish imkoniyatini
							beramiz. Alehson orqali xayriya qilish orqali siz dunyo bo‘ylab
							minglab bolalarning hayotini saqlab qolish va yaxshilashga o‘z
							hissangizni qo‘shasiz. Unutmang, har qanday yordam – qanchalik
							kichik bo‘lmasin – ulkan o‘zgarishlar sari qadamdir. Sizning
							saxovatingiz tufayli har bir bola hayotda o‘z o‘rnini topishi,
							kelajakda jamiyat uchun foydali inson bo‘lishi va o‘z orzulariga
							erishishi mumkin bo‘ladi. Bugun xayriya qilish haqida o‘ylab
							ko‘ring. Sizning qo‘llab-quvvatlashingiz har bir bolaning
							rivojlanishi, o‘rganishi va muvaffaqiyat qozonishi uchun qulay
							muhit yaratishga xizmat qiladi. Keling, birgalikda yorqin kelajak
							uchun mustahkam poydevor quraylik. Bizning tashabbusimizga
							qo‘shilganingiz va jamiyatning kuchiga ishonganingiz uchun sizga
							chuqur minnatdorchilik bildiramiz.
						</p>

						<div className='flex justify-center md:justify-start'>
							<Link href='/helpme' className='cursor-pointer'>
								<Button className='mt-4 sm:mt-6 px-4 sm:px-6 py-6 sm:py-4 text-sm sm:text-base border border-blue-500 text-blue-500 bg-white font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition duration-300'>
									Ehsonga hissa qo‘shish
								</Button>
							</Link>
						</div>
					</div>
				</section>
			</div>
			<div className='mt-20 px-4 sm:px-6 md:px-10 mx-auto'>
				<div className='flex justify-between px-4 sm:px-6 md:px-10'>
					<h1 className='text-xl text-gray-800'>
						Kambag'al odamlar uchun xayriya qiling.
					</h1>
					<Link href={'/category'}>
						<Button className=' border border-blue-500 text-blue-500 bg-white hover:bg-blue-500 hover:text-white py-3 px-6 rounded cursor-pointer flex items-center gap-2'>
							Barchasini ko'rish <MoveRight />
						</Button>
					</Link>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6'>
					{applications.map(application => (
						<Card
							key={application.petition_id}
							className='overflow-hidden shadow-lg'
						>
							<Link href={`/news/${application.petition_id}`}>
								<Image
									src={application.images[0]}
									alt='item'
									className='w-full h-48 object-contain w-full h-full   cursor-pointer px-2 rounded'
								/>
							</Link>
							<CardContent className='p-4'>
								<h3 className='text-lg font-semibold mb-2 line-clamp-1'>
									{application.full_name}
								</h3>
								<p className='text-sm text-gray-600 line-clamp-2'>
									{application.information}
								</p>
								<div className='flex justify-center mt-4'>
									<Link href={`/news/${application.petition_id}`}>
										<Button className='border bg-white border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'>
											Ko'proq ko'rish →
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
			<h1 className='text-xl md:text-3xl mt-20  px-15'>Oxirgi yangiliklar</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 px-15'>
				{news.map(newsItem => (
					<Card key={newsItem.id} className='overflow-hidden shadow-lg'>
						<Link href={`/news/${newsItem.id}`}>
							<Image
								src={`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/media/${newsItem.image}`}
								alt='item'
								className='w-full h-48 object-contain w-full h-full   cursor-pointer px-2 rounded'
							/>
						</Link>
						<CardContent className='p-4'>
							<h3 className='text-lg font-semibold mb-2 line-clamp-1'>
								{newsItem.title}
							</h3>
							<p className='text-sm text-gray-600 line-clamp-2'>
								{newsItem.description}
							</p>
							<div className='flex justify-center mt-4'>
								<Link href={`/news/${newsItem.id}`}>
									<Button className='border bg-white border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'>
										Ko'proq ko'rish →
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

export default Homepage
// "use client";
// import Image from "next/image";
// import AliceCarousel from "react-alice-carousel";
// import "react-alice-carousel/lib/alice-carousel.css";

// export default function HeroSection() {
//   const items = [
//     <div key={1} className="w-full h-[1100] relative ">
//       <Image src="/img/slide1.jpg" alt="slide1" fill className="object-contain w-full h-full  " />
//     </div>,
//     <div key={2} className="w-full h-[1100] relative ">
//       <Image src="/img/slide2.jpg" alt="slide2" fill className="object-contain w-full h-full  " />
//     </div>,
//     <div key={3} className="w-full h-[1100] relative ">
//       <Image src="/img/slide3.jpg" alt="slide3" fill className="object-contain w-full h-full  " />
//     </div>,
//   ];

//   return (
//     <div className="relative w-full h-[940px]">
//       <AliceCarousel
//         mouseTracking
//         items={items}
//         autoPlay
//         autoPlayInterval={3000}
//         infinite
//         disableButtonsControls
//         disableDotsControls
//       />

//       {/* Overlay gradient */}
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

//       {/* Text content */}
//       <div className="absolute top-1/2 -translate-y-1/2 left-10 max-w-xl text-white space-y-4">
//         <h1 className="text-5xl font-bold leading-tight">
//           Umid Ulashing,<br /> Hayotlarni Saqlang
//         </h1>
//         <p className="text-sm opacity-80">
//           Biz bilan birga ezgulik yo‘lida qadam tashlang. Har bir xayriyangiz yordamga muhtoj insonlarning hayotini o‘zgartiradi. Birga bo‘lsak, ko‘proq insonga yordam bera olamiz.
//         </p>

//         <div className="flex gap-10 text-orange-400 text-lg font-semibold pt-4">
//           <div>
//             <span className="text-2xl">$1 284 528</span>
//             <p className="text-white text-sm font-normal">Yigʻilgan Mablagʻ</p>
//           </div>
//           <div>
//             <span className="text-2xl">12 460</span>
//             <p className="text-white text-sm font-normal">Yordam Olganlar</p>
//           </div>
//         </div>

//         <div className="flex gap-6 pt-8 opacity-70">
//           <div className="w-20 h-6 bg-white/20 rounded" />
//           <div className="w-20 h-6 bg-white/20 rounded" />
//           <div className="w-20 h-6 bg-white/20 rounded" />
//           <div className="w-20 h-6 bg-white/20 rounded" />
//         </div>
//       </div>
//     </div>
//   );
// }
