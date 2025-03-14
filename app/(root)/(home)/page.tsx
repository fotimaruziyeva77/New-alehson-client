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

type Category = {
  id: number;
  image: string;
  name: string;
};
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
function Homepage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [news, setNews] = useState<News[]>([]);
  useEffect(() => {
    axios
      .get(API_REQUEST.categories)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Xatolik:", err));
  }, []);
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
    <div className=" mx-auto px-10 mt-20 pt-20">
      <div className="flex flex-col md:flex-row justify-around items-center gap-10">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
            <span className="text-yellow-400">"Ehson"</span> – yurakdan <br />
            yurakka yetuvchi nur! <br />
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-10 mt-6">
            <Button className="py-7 px-10 flex items-center gap-2 text-lg font-medium rounded-lg transition duration-300 ease-in-out bg-yellow-500 hover:bg-yellow-400  text-white border border-yellow-400 cursor-pointer">
              All Causes <ChevronRight />
            </Button>
            <Button className="py-7 px-10 flex items-center gap-2 text-lg font-medium rounded-lg transition duration-300 ease-in-out bg-white text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-white cursor-pointer">
              Donate Now <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="w-60 md:w-96">
          <Image
            src={"/5.png"}
            alt="help"
            width={500}
            height={500}
            className="rounded-full object-cover"
          />
        </div>
      </div>{" "}
      <br /> <br />
      <div>
        <h1 className="text-xl md:text-5xl mt-20 text-center">
          Bir inson hayotini o'zgartirishga tayyormisiz?
        </h1>
      </div>
      <div className=" w-full px-10 flex flex-wrap items-center justify-center  gap-40 mt-10 mb-10 text-center">
        {cardList.map((card) => (
          <div
            key={card.id}
            className="bg-white shadow-md rounded-lg  border border-[#5A5A5A] overflow-hidden flex flex-col justify-center items-center p-10"
          >
            <Image
              src={card.image}
              alt={card.title}
              width={50}
              height={50}
              className="flex justify-center"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mt-2 ">{card.title}</h2>
              <p className="mt-3 container text-[#5A5A5A] ">
                You can contribute your time, <br />
                skills and knowledge through <br />
                volunteering with the UN.
              </p>
              <Button className="mt-6 border border-[#3A40D8] text-[#3A40D8] bg-white  hover:bg-[#2E34A7] hover:text-white py-5 px-8 rounded cursor-pointer">
                Read More
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-8xl mx-auto p-10 bg-[#F4F1FA] rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-full flex flex-col items-center gap-4 mb-10">
          <Image
            src="/1.png"
            alt="children"
            width={600}
            height={200}
            className=" rounded"
          />

          <div className="flex gap-4 flex-wrap justify-center">
            <Image
              src="/help2.png"
              alt="help"
              width={290}
              height={220}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/help.png"
              alt="help"
              width={290}
              height={220}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        <section className="px-6 md:px-16 w-full">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900  md:text-left">
              Givest is The Non Profitable Organization
            </h2>
            <p className="text-gray-600 mt-4 text-center md:text-left">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry orem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown. Lorem Ipsum is simply dummy
              text of the printing and typesetting industry orem Ipsum has been
              the industry's standard dummy text ever since the 1500s, when an
              unknown.Ipsum has been the industry's standard dummy text ever
              since the 1500s, when an unknown. Contrary to popular belief,
              Lorem Ipsum is not simply random text. It has roots in a piece of
              classical Latin literature from 45 BC, making it over 2000 years
              old. Richard McClintock, a Latin professor at Hampden-Sydney
              College in Virginia, looked up one of the more obscure Latin
              words, consectetur, from a Lorem Ipsum passage, and going through
              the cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
              1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
              and Evil) by Cicero, written in 45 BC. This book is a treatise on
              the theory of ethics, very popular during the Renaissance. The
              first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
              from a line in section 1.10.32. The standard chunk of Lorem Ipsum
              used since the 1500s is reproduced below for those interested.
              Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
              by Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H.
              Rackham.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8 border-t border-gray-300 pt-6">
              <div className="flex items-center space-x-2">
                <div className="border-r-4 border-blue-500 pr-3"></div>
                <p className="text-lg font-semibold text-gray-900">
                  Every small item makes a big difference.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="border-r-4 border-blue-500 pr-3"></div>
                <p className="text-lg font-semibold text-gray-900">
                  Help us provide a better future for children.
                </p>
              </div>
            </div>

            <div className="flex justify-center md:justify-start">
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
                Donate Now →
              </button>
            </div>
          </div>
        </section>
      </div>
      <div className="mt-20 px-10 mx-auto">
        <div className="flex justify-between  px-10">
          <h1 className="text-xl text-gray-800">
            Kambag'al Odamlar Uchun Xayriya Qiling.
          </h1>
          <Link href={"/category"}>
            <Button className="border border-[#3A40D8] text-[#3A40D8] bg-white hover:bg-[#2E34A7] hover:text-white py-5 px-8 rounded cursor-pointer">
              Barchasini ko'rish <MoveRight />
            </Button>
          </Link>
        </div>
        <Carousel className="w-full px-10 mt-5">
          <CarouselContent>
            {categories.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/4">
                <Card className="overflow-hidden shadow-lg">
                  <img
                    src={item.image}
                    alt="item"
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-600 text-sm">
                        <User className="w-4 h-4 mr-1" /> Adam
                      </div>
                      <Button
                        variant="outline"
                        className="border border-[#3A40D8] text-[#3A40D8] bg-white hover:bg-[#2E34A7] hover:text-white py-5 px-8 rounded cursor-pointer"
                      >
                        Donate Now →
                      </Button>
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
            <Button className="border border-[#3A40D8] text-[#3A40D8] bg-white  hover:bg-[#2E34A7] hover:text-white py-5 px-8 rounded cursor-pointer">
              Barchasini ko'rish <MoveRight />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-4 gap-6 p-6">
          {news.map((news) => (
            <Card key={news.id} className="overflow-hidden shadow-lg">
              <img
                src={`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/media/${news.image}`}
                alt="item"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
                <p>{news.description}</p>
                <div className="flex items-center justify-center mt-10">
                  <Button
                    variant="outline"
                    className="border border-[#3A40D8] text-[#3A40D8] bg-white  hover:bg-[#2E34A7] hover:text-white py-5 px-8 rounded cursor-pointer"
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
