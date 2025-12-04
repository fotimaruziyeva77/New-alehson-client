"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Facebook, Twitter, Linkedin, Copy, Check } from "lucide-react";
import { ApplicationTypes } from "@/interfaces";
import axios from "axios";
// import { API_REQUEST } from "@/lib/apiRequest";
import Image from 'next/image'

const BlogPage = () => {
  const [copied, setCopied] = useState(false);
  const [applications, setApplications] = useState<ApplicationTypes[]>([]);

  // useEffect(() => {
  //   const fetchApplicationById = async (petition_id:number) => {
  //     try {
  //       const response = await axios.get(`${API_REQUEST.applications}/${petition_id}/`);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Xatolik yuz berdi:", error);
  //     }
  //   };
  
  //   fetchApplicationById(24); 
  // }, []);
  
  const copyTextToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("1234 5678 9012 3456");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Nusxalashda xatolik yuz berdi.");
    }
  };

  return (
    <div className="mt-20">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {
            applications.map((application) => (
              <div className="md:col-span-2" key={application.petition_id}>
              <Card>
                <Image
                  src={application.images}
                  alt="Smiling children"
                  className="w-full  rounded-t-xl"
                />
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold">
                    {application.full_name}
                  </h2>
                  <p className="text-gray-600 mt-4">
                  {application.information}
                  </p>
                  <div className="bg-gray-100 p-4 mt-4 rounded-lg">
                    <blockquote className="text-green-700 font-semibold">
                      Mehribonlikdan Ilhom Oling, Yaxshilik Ulashing
                    </blockquote>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Image
                      src={application.images}
                      alt="Child"
                      className="w-1/2 rounded-lg"
                    />
                    <Image
                      src="/img-5.png"
                      alt="Happy child"
                      className="w-1/2 rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            ))  
          }
        
          <aside className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">Category</h3>
                <ul className="mt-2 space-y-2">
                  <li>Donations</li>
                  <li>Education</li>
                  <li>Fundraising</li>
                  <li>Medical Help</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 items-center w-full">
                  <div className="bg-white text-black w-11/12 p-4 rounded-2xl shadow-lg">
                    <h1 className="text-lg text-right">Visa</h1>
                    <div className="flex flex-col gap-5">
                      <Image src="/cardchip.png" alt="Chip" className="w-10" />
                      <span className="flex items-center justify-between w-full">
                        <p className="text-lg font-mono">1234 5678 9012 3456</p>
                        {copied ? (
                          <Check className="text-green-500 text-xl" />
                        ) : (
                          <Copy
                            onClick={copyTextToClipboard}
                            className="text-red-500 cursor-pointer text-xl"
                          />
                        )}
                      </span>
                      <h2 className="text-lg font-semibold">Rustamov Istam</h2>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="space-x-2">
            <Button variant="outline">
              <Facebook size={18} />
            </Button>
            <Button variant="outline">
              <Twitter size={18} />
            </Button>
            <Button variant="outline">
              <Linkedin size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
