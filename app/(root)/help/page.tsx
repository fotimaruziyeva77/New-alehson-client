"use client";
import { Button } from "@/components/ui/button";
import { HelpTypes } from "@/interfaces";
import { API_REQUEST } from "@/lib/apiRequest";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function HelpPage() {
  const [help, setHelp] = useState<HelpTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchHome = async () => {
      await axios
        .get(API_REQUEST.helpsettings)
        .then((res) => setHelp(res.data))
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
    <div className="mt-32 mb-20">
      {help.map((item) => (
        <div className="flex items-center justify-center flex-wrap gap-5 mt-20  px-10">
          <div className="flex-shrink-0">
            <img
              src={item.image}
              alt="help-img"
              className="w-[600px] h-[400px] rounded-lg mb-10"
            />
          </div>

          <div className="w-[800px] flex flex-col items-center justify-center p-16">
            <h1 className="text-2xl font-bold mb-2.5">{item.title}</h1>
            <p className="text-base text-gray-600 leading-relaxed">
              {item.description}
            </p>
            <br />
            <Link href={"/help"}>
              <Button className=" w-[300px] p-6 bg-blue-400 hover:bg-blue-500 cursor-pointer">
                Savobli ishga hissa qo'shing
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HelpPage;
