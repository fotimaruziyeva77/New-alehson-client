import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";


function About() {
  return (
    <div className="px-10">
      {/* Banner */}
      <div className="relative w-full h-60 md:h-80 lg:h-96 mt-30">
                <Image
                  src="/about.png"
                  alt="About Us Image"
                  className="w-full h-full object-cover"
                  layout="fill"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl md:text-6xl lg:text-8xl font-bold text-center">
                Biz haqimizda
                </div>
              </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Alehsonga - Ezgulik Yo'lida Bir Qadam
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Dunyoni yaxshilik qutqaradi! AlehSonga - mehr va saxovatni jamlagan zamonaviy ehson platformasi.
          Biz insonlarga o'zaro yordam berish, muhtojlarga ko'maklashish va jamiyatda ezgulikni keng yoyish
          imkoniyatini taqdim etamiz.
        </p>
      </div>

      {/* Differentials */}
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <Check className="text-green-600 text-3xl mb-3" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ishonchli va Shaffof</h3>
          <p className="text-gray-700">
            Har bir ehson qayerga yo'naltirilayotganini kuzatish imkoniyati.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <Check className="text-green-600 text-3xl mb-3" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Oson va Qulay</h3>
          <p className="text-gray-700">
            Atigi bir necha bosqichda xayriya qilish mumkin.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <Check className="text-green-600 text-3xl mb-3" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Har Kim Uchun Ochiq</h3>
          <p className="text-gray-700">
            Yordamingiz katta yoki kichik bo'lishidan qat'iy nazar, har bir saxovat muhim!
          </p>
        </div>
      </div>

      {/* How it Works */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <h3 className="text-3xl font-semibold text-green-600">Qanday Ishlaydi?</h3>
        <ul className="mt-6 space-y-4 text-lg text-gray-700 text-left">
          <li><strong>1.</strong> Platformaga kiring va yordamga muhtoj loyihalar bilan tanishing.</li>
          <li><strong>2.</strong> O'zingiz xohlab tanlagan sohaga ehson qiling.</li>
          <li><strong>3.</strong> Xayriyangiz real hayotda o'zgarish qilishiga guvoh bo'ling.</li>
        </ul>
      </div>
    </div>
  );
}

export default About;