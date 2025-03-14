
"use client"
import { Button } from "@/components/ui/button";
import { API_REQUEST } from "@/lib/apiRequest";
import axios from "axios";
import { Edit2, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";



type News = {
  id: number;
  title: string;
  description: string;
  content: string;
  region: string;
  image: string;
  created_date: string;
  view_count: number;
  slug: string;
};
function NewsPage() {
const [news, setNews] = useState<News[]>([]);

useEffect(() => {
  const fetchData = async () => {
    await axios
      .get(API_REQUEST.news)
      .then((res) => setNews(res.data.results))
      .catch((err) => console.log(err));
  };
  fetchData();
}, []);
  return (
    <div className="px-10 mx-auto mt-25 ">
      <div className="relative w-full h-[600px] flex flex-col items-center overflow-hidden">
        <div className="absolute w-full p-5 overflow-hidden">
          <img
            src="https://picsum.photos/1200/600"
            alt="banner img"
            className="w-full h-[700px] object-cover"
          />
        </div>
        <div className="absolute bottom-10 w-4/5 left-1/2 -translate-x-1/2 text-white p-5 flex flex-col gap-7 ">
          <h2 className="text-2xl font-bold">
            Bizning yangiliklardan ogoh bo'ling
          </h2>
        </div>
      </div>
      <div className="w-full flex flex-wrap items-center justify-center gap-5 p-10">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Yangiliklar</h1>
      </div>
      {news.map((item) => (
        <div
          key={item.id}
          className="w-96 h-[500px] dark:bg-zinc-800 bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="w-full h-48 overflow-hidden">
            <img
              src={`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/media/${item.image}`}
              alt="news img"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5 flex flex-col gap-3">
            <div className="flex justify-between text-sm dark:text-white text-black">
            <h3 className="text-lg font-semibold dark:text-white text-black">
              {item.title}
            </h3>
             <div className="flex gap-2">
             <Eye />
             <span > {item.view_count}</span>
             </div>
            </div>
           
            <p>{item.description}</p>
            <div className="flex justify-between text-xs dark:text-white text-black">
              <span className="flex items-center gap-1">{item.region}</span>
              <span>{item.created_date.split("T")[1].slice(0, 5)}, {item.created_date.split("T")[0]}</span>
            </div>
            <div className="flex items-end justify-center gap-3 mt-5">
              <Link href={'/'}>
                <Button variant="outline">
                 Ko'proq ko'rish 
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default NewsPage;
