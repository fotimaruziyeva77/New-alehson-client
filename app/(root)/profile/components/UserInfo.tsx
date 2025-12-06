export default function Userinformation({ user }: { user: any }) {
	return (
		<div
			className='bg-white shadow rounded-2xl p-6 space-y-4'
		>
			<h2 className='text-xl font-semibold mb-4'>
				Your Profile
			</h2>

			<div className='flex items-center gap-4'>
				<div className='w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl'>
					{user.name?.charAt(0)}
				</div>

				<div>
					<p className='font-semibold'>
						{user.name}
					</p>

					<p className='text-sm text-gray-500'>
						{user.email}
					</p>
				</div>
			</div>

			<hr />

			<p><b>User ID:</b> {user.$id}</p>
			<p><b>Verified:</b> {user.emailVerification ? 'Yes ✅' : 'No ❌'}</p>
			<p><b>Joined:</b> {new Date(user.$createdAt).toLocaleDateString()}</p>
		</div>
	)
}
