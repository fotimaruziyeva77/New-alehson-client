"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { About } from '@/interfaces'
import { API_REQUEST } from '@/services'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

function About() {
  const [about, setAbout] = useState<About[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_REQUEST.about);
        setAbout(res.data);
      } catch (err) {
        console.error("Xatolik yuz berdi:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {about.map((about, index) => (
        <div key={index}>
         <div className="relative w-full h-[300px] md:h-[400px]">
  <Image
    src={about.main_image}
    alt='Hello'
    layout="fill"
    objectFit="cover"
    priority
  />
  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50">
    <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
      Biz haqimizda
    </h1>
    <div className="mt-4 md:mt-10">
      <Breadcrumb>
        <BreadcrumbList className="text-white text-lg md:text-xl">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="hover:text-yellow-500">
              Bosh sahifa
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/about" className="hover:text-yellow-500">
              Biz haqimizda
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </div>
</div>
          <div className="w-full p-6 md:p-8">
            <h1 className="text-center text-2xl md:text-4xl font-bold mb-8">
             {about.main_title}
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-2">
            
              <div className="w-full md:w-1/2">
                <Image
                  src={about.main_image}
                  alt="Helping hands"
                  width={800}
                  height={400}
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                 {about.main_title}
                </h2>
                <p className="text-gray-700 mb-6">
                {about.description}
                </p>

                <div className="mt-6 flex flex-col md:flex-row gap-4">
                  <div className="bg-red-500 text-white p-4 md:p-6 rounded-lg w-full md:w-1/2 shadow-md">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">
                      {about.hero_title}
                    </h3>
                    <p className="text-sm">
                     {about.description}
                    </p>
                  </div>
              
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default About;
