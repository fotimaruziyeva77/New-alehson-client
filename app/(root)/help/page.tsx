import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function HelpPage() {
  return (
    <div className="flex w-full items-center justify-center bg-white rounded-lg shadow-lg gap-5 mt-20">
    <div className="flex-shrink-0">
      <img src="/help3.png" alt="help-img" className="w-[800px] h-auto rounded-lg" />
    </div>
    <div className="w-[800px] flex flex-col items-center justify-center p-16">
      <h1 className="text-2xl font-bold mb-2.5">
        Sizning bir ezgu amalingiz ertaga kimningdir umididir 🌱
      </h1>
      <p className="text-base text-gray-600 leading-relaxed">
        Dunyoda ezgu amallar bilan yashash insoniylikning eng yuksak namunalaridan biridir. Har bir inson hayotida qiyinchiliklarga duch keladi, biroq saxovat va mehr bilan bu to'siqlar yengiladi. Bugun qilgan ehsoningiz ertaga kimningdir hayotini o'zgartirishi mumkin. Ehson qilish faqat moddiy yordam berish degani emas. Bir kishining qalbini iliqlik bilan to'ldirish, unga mehribonlik ko'rsatish, qo'llab-quvvatlash ham ehsonning eng go'zal turlaridan biridir. Ba'zan oddiy bir tabassum ham kishiga umid bag'ishlaydi, uni hayotga bo'lgan ishonchini mustahkamlaydi. Ehson - bu yurakdan qilinadigan amaldir. Chin dildan berilgan yordam hech qachon zoye ketmaydi. Balki siz bugun birovga yordam qo'lini cho'zsangiz, ertaga sizga ham kimdir mehribonlik qiladi. Shuning uchun yaxshilik qilishdan to'xtamang! Har bir insonning qadrini bilish, uni tushunish va unga mehr bilan munosabatda bo'lish - bu eng katta saxovatdir. Hayotning eng go'zal jihatlaridan biri shunchaki, bir odamning qilgan yaxshiligi minglab qalblarga umid bag'ishlashi mumkin. Bugun siz qilgan kichik bir yaxshilik ertasiga kimningdir hayotini o'zgartirishi, unga umid bag'ishlashi mumkin. Yaxshilik zanjiri hech qachon uzilmasin! Saxovat bilan dunyoni yanada go'zal qilaylik.
      </p>
      <br />
      <Link href={'/help'}>
      <Button className=" w-[300px] p-6 bg-blue-400 hover:bg-blue-500 cursor-pointer">
        Savobli ishga hissa qo'shing
      </Button>
      </Link>
      
    </div>
  </div>
  )
}

export default HelpPage