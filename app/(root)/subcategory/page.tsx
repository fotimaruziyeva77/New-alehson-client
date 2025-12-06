'use client'

// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { API_REQUEST } from '@/services'
import Image from 'next/image'
import { Subcategory } from '@/interfaces'

function CategoryPage() {
  const [subcategories, setSubCategories] = useState<Subcategory>()
  const router = useRouter()

  useEffect(() => {
    axios
      .get(API_REQUEST.subcategories)
      .then(res => setSubCategories(res.data))
      .catch(err => console.error('Xatolik:', err))
  }, [])

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    // Dinamik route bilan yo'naltirish
    router.push(`/application/${subcategory.slug}`)
  }

  return (
    <div className='mt-10'>
      <div className='mx-auto'>
        {/* Banner */}
        <div
          className='w-full h-[400px] bg-cover bg-center relative'
          style={{ backgroundImage: "url('/edit.png')" }}
        >
          <h1 className='text-white text-5xl font-bold text-center pt-20'>
            Kategoriyalar
          </h1>

          <div className='flex justify-center mt-10 text-white'>
            <Breadcrumb>
              <BreadcrumbList className='text-white'>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/' className='hover:text-yellow-500'>
                    Bosh sahifa
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href='/category'
                    className='hover:text-yellow-500'
                  >
                    Kategoriyalar
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Subcategory grid */}
        {/* <div className='grid md:grid-cols-4 gap-6 p-6'>
          {subcategories.map(subcategory => (
            <Card key={subcategory.id} className='overflow-hidden shadow-lg'>
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/media/${subcategory.}`}
                alt={subcategory.title}
                width={300}
                height={300}
                className='w-full h-48 object-cover'
              />
              <CardContent className='p-4'>
                <h3 className='text-lg font-semibold mb-2'>
                  {subcategory.title}
                </h3>
                <div className='flex items-center justify-center mt-10'>
                  <Button
                    variant='outline'
                    className='border border-yellow-500 text-black bg-white hover:bg-yellow-500 hover:text-white py-5 px-8 rounded cursor-pointer'
                    onClick={() => handleSubcategoryClick(subcategory)}
                  >
                    Ko'rish
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}
      </div>
    </div>
  )
}

export default CategoryPage
