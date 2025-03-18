"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cardList } from "@/constants";
import { ChevronRight, MoveRight, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_REQUEST } from "@/lib/apiRequest";
import {
  ApplicationTypes,
  CategoryTypes,
  HomeTypes,
  NewsTypes,
} from "@/interfaces";

function Homepage() {
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [news, setNews] = useState<NewsTypes[]>([]);
  const [applications, setApplications] = useState<ApplicationTypes[]>([]);
  const [home, setHome] = useState<HomeTypes[]>([]);
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
        console.log("API Response:", res.data);
        setApplications(res.data.results || []);
        console.log("Applications State:", applications);
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
        .then((res) => setHome(res.data))
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
    <div className=" mx-auto px-4 sm:px-6 md:px-10 mt-20 pt-20">
      {home.map((homes) => (
        <div
          className="flex flex-col md:flex-row justify-around items-center gap-10"
          key={homes.id}
        >
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              {homes.title}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start md:flex-nowrap gap-4 mt-6">
             <Link href={'/helpme'}>
             <Button className="py-7 px-10 flex items-center gap-2 text-lg font-medium rounded-lg transition duration-300 ease-in-out bg-yellow-500 hover:bg-yellow-400  text-white border border-yellow-400 cursor-pointer">
              Ehsonga hissa qo'shish<ChevronRight />
              </Button>
             </Link>
              <Link href={'/help'}>
              <Button className="py-7 px-10 flex items-center gap-2 text-lg font-medium rounded-lg transition duration-300 ease-in-out bg-white text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-white cursor-pointer">
               Qo'llab-quvvatlash <ChevronRight /> 
              </Button>
              </Link>
            </div>
          </div>
          <div className="w-60 md:w-96">
            <img
              src={homes.image}
              alt="help"
              className=" object-cover w-[800] h-[400] md:w-full md:h-full"
            />
          </div>
        </div>
      ))}
      <br /> <br />
      <div>
        <h1 className="text-xl md:text-5xl mt-20 text-center">
          Bir inson hayotini o'zgartirishga tayyormisiz?
        </h1>
      </div>
      <div className="mt-20 px-4 sm:px-6 md:px-10 mx-auto">
      <Carousel className="w-full px-4 sm:px-6 md:px-10 mt-10 mb-5">
        <CarouselContent>
          {categories.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-full sm:basis-1/2 lg:basis-1/4"
            >
              <Card className="overflow-hidden shadow-lg">
                <img
                  src={item.image}
                  alt="item"
                  className="px-5 h-52 rounded object-cover w-full"
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-center mt-5">
                    <Link href={`/application/${item.id}`}>
                      <Button
                        variant="outline"
                        className="border border-yellow-200 text-yellow-500 hover:bg-yellow-500 bg-white hover:text-white py-5 px-8 rounded cursor-pointer"
                      >
                        Ko'proq ko'rish
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
      {home.map((item) => (
        <div
          key={item.id}
          className="max-w-8xl mx-auto p-10 bg-[#F4F1FA] rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <div className="w-full flex flex-col items-center gap-4 mb-10">
            <img
              src={item.image2}
              alt="children"
              width={600}
              height={200}
              className="rounded w-[600] h-[200] object-cover"
            />

            <div className="flex gap-4 flex-wrap justify-center">
              {item.image2 && (
                <img
                  src={item.image3}
                  alt="help"
                  className="rounded-lg shadow-md w-[290] h-[220] object-cover"
                />
              )}
              {item.image3 && (
                <img
                  src={item.image4}
                  alt="help"
                  className="rounded-lg shadow-md w-[290] h-[220] object-cover"
                />
              )}
            </div>
          </div>

          <section className="px-6 md:px-16 w-full">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 md:text-left">
                {item.titleAbaut}
              </h2>
              <p className="text-gray-600 mt-4 text-center md:text-left">
                {item.description}
              </p>
              <div className="flex justify-center md:justify-start">
                <Link href={'/helpme'} className="cursor-pointer">
                <Button className="mt-6 px-6 py-6 bg-yellow-500 border border-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-500 transition duration-300 cursor-pointer">
                 Ehsonga hissa qo‘shish
                </Button>
                </Link>
               
              </div>
            </div>
          </section>
        </div>
      ))}
      <div className="mt-20 px-4 sm:px-6 md:px-10 mx-auto">
      <div className="flex justify-between px-4 sm:px-6 md:px-10">
        <h1 className="text-xl text-gray-800">Kambag'al odamlar uchun xayriya qiling.</h1>
        <Link href={"/category"}>
          <Button className="border border-yellow-200 text-yellow-500 bg-white hover:bg-yellow-500 hover:text-white py-3 px-6 rounded cursor-pointer flex items-center gap-2">
            Barchasini ko'rish <MoveRight />
          </Button>
        </Link>
      </div>
      <Carousel className="w-full px-4 sm:px-6 md:px-10 mt-5">
        <CarouselContent className="flex gap-4 p-4 overflow-hidden">
          {applications.map((item) => (
            <CarouselItem key={item.id} className="basis-full sm:basis-1/2 lg:basis-1/4">
              <Card className="overflow-hidden shadow-lg">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.full_name}
                    className="h-48 px-2 w-full object-cover"
                  />
                ) : (
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <span>Rasm mavjud emas</span>
                  </div>
                )}
                <CardContent className="p-4">
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold">{item.full_name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{item.information}</p>
                  </div>
                  <div className="flex items-center justify-between mt-10">
                    <div className="flex items-center text-yellow-500 text-sm">
                      <User className="w-4 h-4 mr-1" /> {item.full_name}
                    </div>
                    <Link href={`/application/${item.petition_id}`}>
                      <Button
                        variant="outline"
                        className="border border-yellow-500 text-yellow-500 bg-white hover:bg-yellow-500 hover:text-white py-2 px-4 rounded cursor-pointer"
                      >
                        Ko'proq ko'rish
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
      <div className="mt-20 px-10 mx-auto">
        <div className="flex justify-between px-10 ">
          <h1 className="text-xl text-gray-800 ">Yangiliklar</h1>
          <Link href={"/category"}>
            <Button className="border border-yellow-300  text-yellow-500 bg-white  hover:bg-yellow-500 hover:text-white py-5 px-8 rounded cursor-pointer">
              Barchasini ko'rish <MoveRight />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-4 gap-6 p-6">
          {news.map((news) => (
            <Card key={news.id} className="overflow-hidden shadow-lg">
              <Link href={`/newsid/${news.id}`}>
                <img
                  src={`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/media/${news.image}`}
                  alt="item"
                  className="w-full h-48 object-cover cursor-pointer px-2 rounded"
                />
              </Link>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">{news.title}</h3>
                <p className="line-clamp-1">{news.description}</p>
                <div className="flex items-center justify-center mt-10">
                  <Button
                    variant="outline"
                    className="border border-yellow-300  text-yellow-500 bg-white  hover:bg-yellow-500 hover:text-white py-5 px-8 rounded cursor-pointer"
                  >
                    Read More →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
