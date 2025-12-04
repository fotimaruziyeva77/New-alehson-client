"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { ApplicationTypes,  } from '@/interfaces'
import { API_REQUEST } from ''
import axios from 'axios'
import { MoveRight, User } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function HelpMepage() {
  const [applications, setApplications] = useState<ApplicationTypes[]>([]);
   const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(API_REQUEST.applications);
        console.log("API Response:", res.data.results);
        setApplications(res.data.results || []);
        console.log("Applications State:", applications);
      } catch (err) {
        console.error("Xatolik yuz berdi:", err);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className='mt-40 mb-20'>
      <div className="mt-20 px-10 mx-auto">
        <div className="flex justify-between px-10">
          <h1 className="text-xl text-gray-800">
            Kambag'al Odamlar Uchun Xayriya Qiling.
          </h1>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-10 mt-5">
          {applications.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[0]}
                  alt={item.full_name}
                  className="h-48 px-2 w-full object-cover"
                />
              ) : (
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  <span>Rasm mavjud emas</span>
                </div>
              )}
              <CardContent className="p-4">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold">
                    {item.full_name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.information}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-10">
                  <div className="flex items-center text-yellow-400 text-sm">
                    <User className="w-4 h-4 mr-1" /> {item.full_name}
                  </div>
                  <Link href={`/application/${item.petition_id}`}>
                    <Button
                      variant="outline"
                      className="border border-yellow-500 text-black bg-white hover:bg-yellow-400 hover:text-white py-2 px-4 rounded cursor-pointer"
                    >
                      Ko'proq ko'rish
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className='flex justify-end mt-10 px-10'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default HelpMepage
