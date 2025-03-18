  "use client";
  import { Button } from "@/components/ui/button";
  import { NewsTypes } from "@/interfaces";
  import { API_REQUEST } from "@/lib/apiRequest";
  import axios from "axios";
  import { Eye } from "lucide-react";
  import Link from "next/link";
  import React, { useEffect, useState } from "react";
  import { format } from "date-fns";

  function NewsPage() {
    const [news, setNews] = useState<NewsTypes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(API_REQUEST.news);
          setNews(response.data.results);
        } catch (err) {
          console.error("Failed to fetch news:", err);
          setError("Failed to load news. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
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
      <div className="px-10 mx-auto mt-25">
        {/* Banner Section */}
        <div className="relative w-full h-[600px] flex flex-col items-center overflow-hidden">
          <div className="absolute w-full p-5 overflow-hidden">
            <img
              src="https://picsum.photos/1200/600"
              alt="News banner"
              className="w-full h-[700px] object-cover"
            />
          </div>
          <div className="absolute bottom-10 w-4/5 left-1/2 -translate-x-1/2 text-white p-5 flex flex-col gap-7">
            <h2 className="text-2xl font-bold">
              Bizning yangiliklardan ogoh bo'ling
            </h2>
          </div>
        </div>

        {/* News List Section */}
        <div className="w-full flex flex-wrap items-center justify-center gap-5 p-10">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Yangiliklar</h1>
          </div>
          {news.map((item) => (
            <div
              key={item.id}
              className="w-96 h-[500px] dark:bg-zinc-800 bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* News Image */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/media/${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* News Content */}
              <div className="p-5 flex flex-col gap-3">
                {/* Title and View Count */}
                <div className="flex justify-between text-sm dark:text-white text-black">
                  <h3 className="text-lg font-semibold dark:text-white text-black line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex gap-2">
                    <Eye size={16} />
                    <span>{item.view_count}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {item.description}
                </p>

                {/* Region and Date */}
                <div className="flex justify-between text-xs dark:text-white text-black">
                  <span className="flex items-center gap-1">{item.region}</span>
                  <span>
                    {format(new Date(item.created_date), "HH:mm, dd MMM yyyy")}
                  </span>
                </div>

                {/* Read More Button */}
                <div className="flex items-end justify-center gap-3 mt-5">
                  <Link href={`/news/${item.id}`}>
                    <Button variant="outline">Ko'proq ko'rish</Button>
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
