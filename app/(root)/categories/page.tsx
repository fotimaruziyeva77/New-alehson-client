'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface CategoryTypes {
  id: number;
  title: string;
  image: string;
  link: string;
  subcategories?: any[];
}

const defaultCategories = [
  {
    id: 1,
    title: "Yordamga muhtoj oilalar",
		image:"/5.png",
    link: "/subcategory?categoryId=1",
  },
  {
    id: 2,
    title: "Kasallarga yordam",
  	image:"/5.png",
    link: "/subcategory?categoryId=2",
  },
  {
    id: 3,
    title: "Bolalar uyiga yordam",
    	image:"/5.png",
    link: "/subcategory?categoryId=3",
  },
  {
    id: 4,
    title: "Keksalar uchun yordam",
    	image:"/5.png",
    link: "/subcategory?categoryId=4",
  },
  {
    id: 5,
    title: "Nogironlar",
   	image:"/5.png",
    link: "/subcategory?categoryId=5",
  },
  {
    id: 6,
    title: "Masjid va madrasa qurilishi",
   	image:"/5.png",
    link: "/subcategory?categoryId=6",
  },
  {
    id: 7,
    title: "Toza ichimlik suvi",
   	image:"/5.png",
    link: "/subcategory?categoryId=7",
  }
];

const CategoryPage = () => {
  const [categories, setCategories] = useState<CategoryTypes[]>(defaultCategories);
  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // const handleCategoryClick = (category: CategoryTypes) => {
  //   router.push(category.link);
  // };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 bg-cover bg-center">
        <Image
          src="/slider.png"
          alt="Ehson imkoniyatlari"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4 animate-fade-in">
            Ehson imkoniyatlari
          </h1>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
              // onClick={() => handleCategoryClick(category)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                  {category.title}
                </h3>
                <button className="w-full py-2 px-4 border-2 border-blue-500 text-blue-500 bg-white hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-lg font-medium">
                  Ko'rish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;