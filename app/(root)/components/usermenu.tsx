'use client'

import { account } from '@/lib/appwrite'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function UserMenu({ user }: { user: any }) {
	const router = useRouter()

	if (!user) return null

	const logout = async () => {
		await account.deleteSession('current')
		router.push('/login')
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='outline-none'>
				<div className='flex items-center gap-2 cursor-pointer'>
					<Avatar className='w-8 h-8'>
						<AvatarImage src='' />
						<AvatarFallback>
							{user?.name?.charAt(0) || 'U'}
						</AvatarFallback>
					</Avatar>

					<span className='font-medium'>
						{user?.name || 'User'}
					</span>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end'>


				<Link href='/profile'>
					<DropdownMenuItem>Profile</DropdownMenuItem>
				</Link>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onClick={logout}
					className='text-red-500'
				>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
