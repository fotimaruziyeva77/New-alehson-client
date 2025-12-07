'use client'

import { Button } from '@/components/ui/button'
import { NewsTypes } from '@/interfaces'
import axios from 'axios'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import { API_REQUEST } from '@/services'
import Image from 'next/image'

type Props = {
  slug: string
}

export default function NewsDetailClient({ slug }: Props) {
  const [news, setNews] = useState<NewsTypes | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${API_REQUEST.news}/${slug}/`)
        setNews(response.data)
      } catch (err) {
        console.error('Failed to fetch news:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [slug])

  if (loading) return <p className='text-center mt-20'>Yuklanmoqda...</p>

  if (!news)
    return (
      <p className='text-center mt-20 text-red-500'>
        News topilmadi
      </p>
    )

  return (
    <div className='mt-20 max-w-5xl mx-auto p-6'>
      <Image
        src={news.image_url}
        alt={news.title}
        width={800}
        height={400}
        className='rounded-xl'
        priority
      />

      <h1 className='text-3xl font-bold mt-5'>
        {news.title}
      </h1>

      <p className='text-gray-600 mt-3'>
        {news.description}
      </p>

      <div
        className='mt-5 text-gray-800'
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(news.content),
        }}
      />

      <div className='mt-5'>
        <Link href='/news'>
          <Button variant='outline' className='gap-2'>
            <MoveLeft size={18} /> Orqaga
          </Button>
        </Link>
      </div>
    </div>
  )
}
