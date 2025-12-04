import type { Metadata } from 'next'
import { Crete_Round, Work_Sans,Teachers  } from 'next/font/google'
import './globals.css'

import { ChildProps } from '@/types'
import Navbar from './(root)/components/navbar'
import Footer from './(root)/components/footer'

const creteRound = Crete_Round({
	weight: ['400'],
	variable: '--font-creteRound',
	subsets: ['latin'],
})
const teachers = Teachers({
  subsets: ["latin"], 
  weight: ["400", "700","800"],      // siz kerakli og‘irliklarni tanlashingiz mumkin
  style: ["normal", "italic"], // agar kerak bo‘lsa,             // tavsiya qilinadi
});
const workSans = Work_Sans({
	weight: ['500', '600'],
	variable: '--font-workSans',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'ALEHSON',
	description:
		'ALEHSON — Saxovat va ezgulik yo‘lida. Xayriya loyihalari, yordamga muhtoj insonlar uchun ko‘mak platformasi.',

	icons: {
		icon: '/ehson.png',
		shortcut: '/ehson.png',
	},
}

function RootLayout({ children }: ChildProps) {
	return (
		<html lang='en'>
			<body
				className={`${teachers.className} antialiased overflow-x-hidden `}
			>
				<Navbar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	)
}
export default RootLayout
