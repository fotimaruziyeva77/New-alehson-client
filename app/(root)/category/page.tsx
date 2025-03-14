"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { donationCards } from '@/constants'
import { API_REQUEST } from '@/lib/apiRequest'
import axios from 'axios'
import { MoveRight, User } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


type Category = {
    id: number;
    image: string;
    name: string;
  };
function CategoryPage() {
 const [categories, setCategories] = useState<Category[]>([]);
 useEffect(() => {
    axios
      .get(API_REQUEST.categories)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Xatolik:", err));
  }, []);


  return (
    <div className='mt-30'>
    <div className=" px-10 mx-auto">
    <div className="flex justify-between px-10 ">
    <h1 className="text-xl text-gray-800 ">Category</h1>
    <Link  href={'/category'}>
    <Button className="border border-[#3A40D8] text-[#3A40D8] bg-white  hover:bg-[#2E34A7] hover:text-white py-5 px-8 rounded cursor-pointer">Barchasini ko'rish <MoveRight/></Button>
    </Link>
    </div>
      <div className="grid md:grid-cols-4 gap-6 p-6">
        {categories.map((donation) => (
          <Card key={donation.id} className="overflow-hidden shadow-lg">
            <img
              src={donation.image}
              alt="donation"
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{donation.name}</h3>
              <p className="text-gray-500 text-sm mb-4">
              </p>
              <div className="flex items-center justify-between">
                    <div className="flex items-center text-blue-600 text-sm">
                      <User className="w-4 h-4 mr-1" /> Adam
                    </div>
                    <Button variant="outline" className="border border-[#3A40D8] text-[#3A40D8] bg-white hover:bg-[#2E34A7] hover:text-white py-5 px-8 rounded cursor-pointer">
                      Donate Now →
                    </Button>
                  </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </div>
  )
}

export default CategoryPage