"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cardList, helpOptions } from "@/constants";
import { ChevronRight, MoveRight, User, Heart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  ApplicationTypes,
  CategoryTypes,
  HomeTypes,
  NewsTypes,
} from "@/interfaces";
import { API_REQUEST } from '@/services'
import Hero from './_components/hero'

function Homepage() {
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [news, setNews] = useState<NewsTypes[]>([]);
  const [applications, setApplications] = useState<ApplicationTypes[]>([]);
  const [home, setHome] = useState<HomeTypes>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // categories
  useEffect(() => {
    axios
      .get(API_REQUEST.categories)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  // news
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(API_REQUEST.news)
        .then((res) => setNews(res.data.results))
        .catch((err) => console.log(err));
      setLoading(false);
    };
    fetchData();
  }, []);

  // applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(API_REQUEST.applications);
        setApplications(res.data.results || []);
      } catch (err) {
        console.error("Xatolik yuz berdi:", err);
      }
      setLoading(false);
    };
    fetchApplications();
  }, []);

  // home
  useEffect(() => {
    const fetchHome = async () => {
      await axios
        .get(API_REQUEST.homesettings)
        .then((res) => setHome(res.data[0]))
        .catch((err) => console.log(err));
      setLoading(false);
    };

    fetchHome();
  }, []);
 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
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
    <>
     <Hero/>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      {/* Hero Section */}
     
      {/* <section className="flex flex-col md:flex-row justify-between items-center gap-10 py-12 md:py-20">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-blue-600">"Ehson"</span> – ezgulikning <br />
            cheksiz manbai
          </h1>
          <p className="text-lg text-gray-600 max-w-xl">
            Har bir ehson jamiyatimizni yaxshilash va ehtiyojmandlarga yordam berish uchun qadam hisoblanadi.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/helpme">
              <Button className="py-4 px-6 flex items-center gap-2 text-base font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition">
                Ehsonga hissa qo'shish <ChevronRight size={20} />
              </Button>
            </Link>
            <Link href="/help">
              <Button variant="outline" className="py-4 px-6 flex items-center gap-2 text-base font-medium rounded-lg border-blue-600 text-blue-600 hover:bg-blue-50 transition">
                Qo'llab-quvvatlash <ChevronRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full opacity-70"></div>
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-yellow-100 rounded-full opacity-70"></div>
            <Image
              src="/5.png"
              alt="help"
              width={400}
              height={400}
              className="relative z-10 object-cover w-full h-auto rounded-full shadow-xl"
            />
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Bir inson hayotini o'zgartirishga tayyormisiz?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {helpOptions.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-6 line-clamp-2">
                {item.description}
              </p>
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                Batafsil
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 my-16">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src="/1.png"
                alt="children"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="relative h-30 rounded-xl overflow-hidden">
                <Image
                  src="/2.png"
                  alt="help"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-30 rounded-xl overflow-hidden">
                <Image
                  src="/3.png"
                  alt="help"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Yordam bering, umid ulashing!
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Alehson – mehr-shafqat va saxovat tamoyillariga asoslangan notijorat tashkilot bo'lib, 
              ehtiyojmand bolalarning hayotiga ijobiy ta'sir ko'rsatishga intiladi. Bizning asosiy maqsadimiz 
              har bir bolaning xavfsiz muhitda yashashi, sog'lom rivojlanishi va sifatli ta'lim olish 
              imkoniyatiga ega bo'lishini ta'minlashdir.
            </p>
            <Link href="/helpme">
              <Button className="bg-blue-600 hover:bg-blue-700 py-3 px-6">
                Ehsonga hissa qo'shish <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="my-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Kambag'al odamlar uchun xayriya qiling.
          </h2>
          <Link href="/category">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 flex items-center gap-2">
              Barchasini ko'rish <MoveRight size={18} />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {applications.slice(0, 4).map((application) => (
            <Card key={application.petition_id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={application.images[0]}
                  alt={application.full_name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{application.full_name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{application.information}</p>
                <Link href={`/news/${application.petition_id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Ko'proq ko'rish
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section className="my-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">Oxirgi yangiliklar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.slice(0, 4).map((newsItem) => (
            <Card key={newsItem.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/media/${newsItem.image}`}
                  alt={newsItem.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{newsItem.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{newsItem.description}</p>
                <Link href={`/news/${newsItem.id}`}>
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                    Ko'proq ko'rish
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white my-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Bizning yutuqlarimiz</h2>
          <p className="max-w-2xl mx-auto">Har bir raqam ortida yordamga muhtoj insonlarning baxtli hayoti yashiringan</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-2">1,250+</div>
            <p>Yordam olganlar</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-2">350+</div>
            <p>Loyihalar</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-2">45+</div>
            <p>Hamkorlar</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-2">12</div>
            <p>Yillik tajriba</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="my-20 text-center">
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Yangiliklardan xabardor bo'ling</h2>
          <p className="text-gray-600 mb-6">Email orqali obuna bo'ling va yangi loyihalarimizdan xabardor bo'ling</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Email manzilingiz" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 py-3 px-6">
              Obuna bo'lish
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

export default Homepage;