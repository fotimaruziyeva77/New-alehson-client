'use client'

import { useEffect, useState } from 'react'
import { account } from '@/lib/appwrite'
import ApplicationInfo from './components/apllicationinfo'




export default function Profile() {
	const [user, setUser] = useState<any>(null)

	useEffect(() => {
		account.get().then(setUser)
	}, [])

	if (!user) return null

	return (
		<div className='mt-32 px-10 min-h-screen bg-gray-50'>
			
			<h1 className='text-3xl font-bold mb-8'>
				Profile Dashboard
			</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>

				{/* PROFILE LEFT */}
				{/* <Userinformation user={user} /> */}

				{/* APPLICATION FORM RIGHT */}
				 <div className="md:col-span-2">
          <ApplicationInfo  />
        </div>
			</div>
		</div>
	)
}
