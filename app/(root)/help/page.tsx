"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { HelpTypes } from "@/interfaces";
import { API_REQUEST } from "@/lib/apiRequest";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function HelpPage() {
  const [help, setHelp] = useState<HelpTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchHome = async () => {
      await axios
        .get(API_REQUEST.helpsettings)
        .then((res) => setHelp(res.data))
        .catch((err) => console.log(err));
      setLoading(false);
    };

    fetchHome();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  return (
    <div className="mt-20 mb-20">
       <div
        className="w-full h-[400px] bg-cover bg-center "
        style={{ backgroundImage: "url('/edit.png')"  }}
      >
        <h1 className="text-white text-5xl font-bold text-center pt-20 ">
          Saytga yordam
        </h1>
        <div className="flex justify-center mt-10 text-white">
        <Breadcrumb>
        <BreadcrumbList className="text-white">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="hover:text-yellow-500">Bosh sahifa</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/help" className="hover:text-yellow-500">Saytga yordam</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
        </div>
      
      
      </div>

        <div className="flex items-center justify-center flex-wrap gap-5 mt-20  px-10">
         <div className="w-full md:w-1/2">
                    <Image
                      src="/image.png"
                      alt="Helping hands"
                      width={800}
                      height={400}
                    />
                  </div>
          <div className="w-[800px] flex flex-col items-center justify-center p-16">
            <h1 className="text-2xl font-bold mb-2.5">Sizning bir ezgu amalingiz ertaga
            kimningdir umididir</h1>
            <p className="text-base text-gray-600 leading-relaxed">
            Dunyoda ezgu amallar bilan yashash insoniylikning eng yuksak 
              namunalaridan biridir. Har bir inson hayotida qiyinchiliklarga 
              duch keladi, biroq saxovat va mehr bilan bu to'siqlar yengiladi. 
              Bugun qilgan ehsoningiz ertaga kimningdir hayotini o'zgartirishi 
              mumkin. Ehson qilish faqat moddiy yordam berish degani emas. Bir 
              kishining qalbini iliqlik bilan to'ldirish, unga mehribonlik 
              ko'rsatish, qo'llab-quvvatlash ham ehsonning eng go'zal turlaridan 
              biridir. Ba'zan oddiy bir tabassum ham kishiga umid bag'ishlaydi, 
              uni hayotga bo'lgan ishonchini mustahkamlaydi. Ehson - bu yurakdan 
              qilinadigan amaldir. Chin dildan berilgan yordam hech qachon zoye 
              ketmaydi. Balki siz bugun birovga yordam qo'lini cho'zsangiz, 
              ertaga sizga ham kimdir mehribonlik qiladi. Shuning uchun 
              yaxshilik qilishdan to'xtamang! Har bir insonning qadrini bilish, 
              uni tushunish va unga mehr bilan munosabatda bo'lish - bu eng 
              katta saxovatdir. Hayotning eng go'zal jihatlaridan biri shunchaki, 
              bir odamning qilgan yaxshiligi minglab qalblarga umid bag'ishlashi 
              mumkin. Bugun siz qilgan kichik bir yaxshilik ertasiga kimningdir 
              hayotini o'zgartirishi, unga umid bag'ishlashi mumkin. Yaxshilik 
              zanjiri hech qachon uzilmasin! Saxovat bilan dunyoni yanada go'zal 
              qilaylik.
            </p>
            <br />
            <Link href={"/help"}>
              <Button className=" w-[300px] p-6 bg-blue-400 hover:bg-blue-500 cursor-pointer">
                Savobli ishga hissa qo'shing
              </Button>
            </Link>
          </div>
        </div>
    
    </div>
  );
}

export default HelpPage;
