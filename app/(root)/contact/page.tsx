// app/components/ContactForm.tsx
'use client';

import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Bu yerda formani yuborish logikasi bo'ladi
    alert('Xabaringiz yuborildi! Tez orada siz bilan aloqaga chiqamiz.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  return (
		<div className='min-h-screen'>
     <section className="relative w-full h-[60vh] md:h-[70vh]">
            <div className="absolute inset-0">
                <Image 
                    src={'/about.png'} 
                    alt="contact background" 
                    fill
                    priority
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
            </div>
            
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
                <div className="max-w-7xl w-full mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 animate-fade-up">
                        Contact Us
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-lg md:text-xl">
                        <Link href={'/'} className="hover:text-blue-400 transition-colors">Home</Link>
                        <ChevronRight className="w-5 h-5" />
                        <span className="text-blue-400 font-semibold">Contact us</span>
                    </div>
                </div>
            </div>
        </section>
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Xabar yuborish</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 mb-2">Ism Familiya</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Ismingizni kiriting"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 mb-2">Elektron pochta</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="email@example.com"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="subject" className="block text-gray-700 mb-2">Mavzu</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Mavzuni tanlang</option>
            <option value="donation">Ehson haqida</option>
            <option value="partnership">Hamkorlik</option>
            <option value="technical">Texnik masala</option>
            <option value="other">Boshqa</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 mb-2">Xabar</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Xabaringizni yozing..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-600 to-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Xabarni yuborish
        </button>
      </form>
    </div>
		</div>
  );
}