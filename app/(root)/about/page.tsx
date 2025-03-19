"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AboutUsTypes } from "@/interfaces";
import { API_REQUEST } from "@/lib/apiRequest";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

function About() {
  const [about, setAbout] = useState<AboutUsTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(API_REQUEST.aboutsettings)
        .then((res) => setAbout(res.data))
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Banner Section */}
      <div
        className="w-full h-[300px] md:h-[400px] bg-center bg-cover flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/edit.png')" }}
      >
        <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
          Biz haqimizda
        </h1>
        <div className="mt-4 md:mt-10">
          <Breadcrumb>
            <BreadcrumbList className="text-white  text-lg md:text-xl">
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

      {/* Content Section */}
      <div className="w-full p-6 md:p-8">
        <h1 className="text-center text-2xl md:text-4xl font-bold mb-8">
          Alehson - Mehr va saxovatni ulashuvchi platforma
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-2">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <Image
              src="/image.png"
              alt="Helping hands"
              width={800}
              height={400}
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Saxovat va yordam berish uchun yaratilgan platforma
            </h2>
            <p className="text-gray-700 mb-6">
              Saxovat va mehr-shafqat har birimizning burchimiz! Har bir inson
              hayotida og‘ir kunlarni boshidan kechirishi mumkin. Kimdir moddiy
              yordamga muhtoj bo‘lsa, boshqalar mehr, e’tibor va insoniy
              qo‘llab-quvvatlashga ehtiyoj sezadi. Biz esa aynan shu
              mehr-oqibatni hayotimizning ajralmas qismiga aylantirishga harakat
              qilamiz. Bizning maqsadimiz – mehribon insonlar bilan yordamga
              muhtojlar o‘rtasida ko‘prik yaratish! Dunyoda ko‘plab insonlar
              yordamga muhtoj, lekin shuncha yaxshi niyatli insonlar ham bor.
              Biz saxovat madaniyatini yanada rivojlantirish, mehr va muruvvatni
              kundalik hayotimizning ajralmas qismiga aylantirish uchun ushbu
              platformani yaratdik. Ehson qilish hech qachon bunday oson
              bo‘lmagan! Biz saxovatli bo‘lishni xohlovchi insonlar uchun qulay,
              ishonchli va shaffof imkoniyatlarni taqdim etamiz. Har bir inson
              o‘z imkoniyatiga qarab yordam bera olishi, kimnidir hayotini
              o‘zgartirishga hissa qo‘sha olishi mumkin. Ehson – bu nafaqat
              moddiy yordam, balki samimiy e’tibor, mehr, iliq so‘z, hatto bitta
              tabassum ham bo‘lishi mumkin. Chunki kichik bir yaxshilik ham
              inson qalbini isitishga, unga umid bag‘ishlashga qodir!
            </p>

            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <div className="bg-red-500 text-white p-4 md:p-6 rounded-lg w-full md:w-1/2 shadow-md">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Bizning maqsadimiz
                </h3>
                <p className="text-sm">
                  Biz mehr va saxovatni keng targ‘ib qilish orqali jamiyatimizni
                  yanada adolatli va mehribon qilishni maqsad qilganmiz. Har bir
                  inson yordamga muhtoj bo‘lishi mumkin, va biz ularning umidi
                  bo‘lishni istaymiz. Platformamiz yordamida mehribon insonlar
                  va ehtiyojmandlar o‘rtasida ishonchli va shaffof ko‘prik
                  quramiz. Biz insonlarga nafaqat moddiy, balki ma’naviy dalda
                  berish, ularning hayotini yengillashtirishga ko‘maklashish
                  uchun ishlaymiz.
                </p>
              </div>
              <div className="bg-yellow-500 text-white p-4 md:p-6 rounded-lg w-full md:w-1/2 shadow-md">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Bizning niyatimiz
                </h3>
                <p className="text-sm">
                  Kelajakda hech kim muhtojlik ichida qolmasligi, saxovat va
                  yordam berish esa odatiy hayot tarziga aylanishini istaymiz.
                  Biz innovatsion yechimlar orqali ehson qilishni oson va
                  ishonchli qilishga harakat qilamiz. Bizning orzumiz –
                  jamiyatimizda har bir inson mehribonlik va qo‘llab-quvvatlash
                  muhitida yashashi, hammaning qalbida yaxshilik urug‘i
                  ekilishi!.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
