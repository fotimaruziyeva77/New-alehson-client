"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Facebook, Twitter, Linkedin, Copy, Check, MoveLeft } from "lucide-react";
import { ApplicationTypes, CategoryTypes } from "@/interfaces";
import axios from "axios";
import { API_REQUEST } from "@/lib/apiRequest";
import { usePathname } from "next/navigation";
import Link from "next/link";

const BlogPage = () => {
  const [applications, setApplications] = useState<ApplicationTypes | null>(
    null
  );
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const petition_id = pathname.split("/").pop();
 const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
  useEffect(() => {
    if (!petition_id) return;
    console.log("Fetching news for ID:", petition_id);

    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${API_REQUEST.applications}/${petition_id}/`
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
        setError("Ma'lumot yuklashda xatolik yuz berdi.");
      }
      setLoading(false);
    };

    fetchApplications();
  }, [petition_id]);
  useEffect(() => {
    axios
      .get(API_REQUEST.categories)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Xatolik:", err));
  }, []);
  if (!applications) {
    return <p className="text-center mt-20 text-gray-500"></p>;
  }

  const copyTextToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(applications.plastic_card);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Nusxalashda xatolik yuz berdi.");
    }
  };
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
    <div className="mt-20">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <img
                src={applications.images?.[0]}
                alt="Smiling children"
                className=" px-8 rounded-t-xl w-full md:w-full object-cover"
              />
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">{applications.full_name}</h2>
                <p className="text-gray-600 mt-4">{applications.information}</p>

                <div className="flex space-x-2 mt-4">
                  {applications.images?.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {applications.images?.map((url) => (
                        <img
                          key={url.id}
                          src={url}
                          alt={`Image ${url.id + 1}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-gray-100 p-4 mt-4 rounded-lg">
                  <blockquote className="text-yellow-500 font-semibold">
                    Mehribonlikdan ilhom Oling, yaxshilik ulashing
                  </blockquote>
                </div>
              </CardContent>
              <Link href={`/helpme`} className="px-6 cursor-pointer ">
                <Button className=" border border-yellow-500   text-black bg-white hover:bg-yellow-400 hover:text-white cursor-pointer px-8 py-4 rounded ">
                   <MoveLeft/> Orqaga
                </Button>
              </Link>
            </Card>

          </div>

          <aside className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">Kategoriyalar</h3>
                {categories.map((category) => (
                  <ul className="mt-2 space-y-2">
                    <Link href={`/category/${category.id}`}>
                      <li>{category.name}</li>
                    </Link>
                  </ul>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 items-center w-full">
                  <div className="bg-white text-black w-11/12 p-4 rounded-2xl shadow-lg">
                    <h1 className="text-lg text-right">Visa</h1>
                    <div className="flex flex-col gap-5">
                      <img src="/cardchip.png" alt="Chip" className="w-10" />
                      <span className="flex items-center justify-between w-full">
                        <p className="text-lg font-mono">
                          {applications.plastic_card}
                        </p>
                        {copied ? (
                          <Check className="text-green-500 text-xl" />
                        ) : (
                          <Copy
                            onClick={copyTextToClipboard}
                            className="text-red-500 cursor-pointer text-xl"
                          />
                        )}
                      </span>
                      <h2 className="text-lg font-semibold">
                        {applications.full_name}
                      </h2>
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
