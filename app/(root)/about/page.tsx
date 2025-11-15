import Image from 'next/image';

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/ehson-no-text.png"
              alt="ALEHSON Logo"
              width={150}
              height={150}
              className="h-38 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Biz haqimizda</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ALEHSON — bu mehr va saxovat platformasi. Biz insonlarga yordam berish uchun
            ularni birlashtiramiz.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Missiyamiz</h2>
              <p className="text-gray-600 mb-4">
                Bizning missiyamiz - har bir yordamga muhtoj insonning ehtiyojlarini
                qondirish va ularga yordam berishni xohlovchi insonlar bilan
                bog'lab berish.
              </p>
              <p className="text-gray-600">
                ALEHSON platformasi orqali biz shaffof, ishonchli va samarali yordam
                mexanizmini yaratishga intilamiz.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src="/about-mission.jpg"
                alt="Our Mission"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <div className="order-2 md:order-1 relative h-80 rounded-lg overflow-hidden">
              <Image
                src="/about-vision.jpg"
                alt="Our Vision"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Vizyonimiz</h2>
              <p className="text-gray-600 mb-4">
                Kelajakda ALEHSON butun mamlakat bo'ylab eng ishonchli va keng
                qamrovli ehson platformasiga aylanishni maqsad qilgan.
              </p>
              <p className="text-gray-600">
                Biz jamiyatdagi har bir a'zoning o'z hissasini qo'shishi mumkin
                bo'lgan platforma yaratishni istaymiz.
              </p>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}