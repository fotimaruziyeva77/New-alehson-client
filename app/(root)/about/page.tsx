"use client";
import { AboutUsTypes } from "@/interfaces";
import { API_REQUEST } from "@/lib/apiRequest";
import axios from "axios";
import  { useEffect, useState } from "react";


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
{
    about.map((item) => (
      <div className="px-10">
      {/* Banner */}
      <div className="relative w-full h-60 md:h-80 lg:h-96 mt-30">
                <img
               src={item.image}
                  alt="About Us Image"
                  className="w-full h-full object-cover"
      
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl md:text-6xl lg:text-8xl font-bold text-center">
                Biz haqimizda
                </div>
              </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
         {item.title}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
        {item.description}
        </p>
      </div>
    </div>
    ))
}
    </div>
   
  );
}

export default About;