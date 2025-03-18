'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    })
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Foydalanuvchi ma'lumotlari:", formData)
    }
  return (
	<div>
		{/*  */}
		<div className="relative w-full h-screen">
        <div className="w-full h-full">
          <Image src={'/about.png'} alt="back_image" width={1400} height={200} className="w-full h-full" />
        </div>
		 <div className="w-full h-full absolute z-10 bg-[#27272785] top-0 left-0">
          <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
            <h5 className="text-5xl font-semibold text-white">Contact Us</h5>
            <h4 className="text-2xl font-bold text-white flex flex-row items-center justify-between">Home<ChevronRight />Contact us</h4>
          </div>
        </div>
            </div>
			{/*  */}
		<div className='flex items-center justify-center bg-gray-100 p-2'>
			<div className='flex w-full max-w-4xl m-5 min-h-[10vh] bg-blue-700 shadow-lg overflow-hidden'>
				<div className='w-1/2 p-8'>
					<Link href={'/'} className='text-xl font-semibold text-white'>Let's Connect</Link>

					<form onSubmit={handleSubmit} className='space-y-4'>
							<div >
								<label className='block text-sm rounded-sm font-medium text-white'>First Name</label>
								<Input
									name='firstName'
									value={formData.firstName}
									onChange={handleChange}
                                    className='mt-1 w-full px-2 py-2 border  focus:outline-none focus:ring-2 text-white focus:ring-white'
                                    placeholder='First Name'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-white'>Last Name</label>
								<Input
									name='lastName'
									value={formData.lastName}
									onChange={handleChange}
									className='mt-1 w-full px-2 py-2 border  text-white focus:outline-none focus:ring-2 focus:ring-white'
									placeholder='Last Name'
								/>
							</div>
                            <div>
                                <label className='block text-sm font-medium text-white'>Email Address</label>
                                <Input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className='mt-1 w-full px-2 py-2 focus:outline-none focus:ring-2 focus:ring-white'
                                    placeholder='Email Address'
                                />
                            </div>

						<div>
							<label className='block text-sm font-medium text-white'>Phone Number</label>
							<Input
								type='tel'
								name='phoneNumber'
								value={formData.phoneNumber}
								onChange={handleChange}
								className='mt-1 w-full px-2 py-2   focus:outline-none focus:ring-2 focus:ring-white'
								placeholder='Phone Number'
							/>
						</div>
							<label className='block text-sm font-medium text-white'>Message</label>
                            <Textarea placeholder="Message..." className="mt-1 w-full px-2 py-2 focus:outline-none text-white transform-fill focus:ring-2 focus:ring-white"/>
						<Button
							type='submit'
							className='bg-blue-700 hover:bg-blue-600 border-2 border-white'
						    >Submit<ChevronRight />
                        </Button>
					</form>

				</div>

				<div className='w-1/2 bg-gradient-to-r bg-gray-300 p-8 flex flex-col justify-center text-white'>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.51488731765!2d-0.3817837926918892!3d51.52855824279362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cb4a1a25e37%3A0x14b82b9ed401e619!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1617711238564!5m2!1sen!2s"
					className="w-full h-full "
					allowFullScreen
					loading="lazy"
					title="Google Maps"
					>
				</iframe>
				</div>
			</div>
		</div>
		</div>
  )
}

export default Contact