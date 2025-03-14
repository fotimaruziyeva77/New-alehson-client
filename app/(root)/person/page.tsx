"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Facebook, Twitter, Linkedin, Copy, Check } from "lucide-react";

const BlogPage = () => {
  const [copied, setCopied] = useState(false);

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
          <div className="md:col-span-2">
            <Card>
              <img
                src="/img-5.png"
                alt="Smiling children"
                className="w-full  rounded-t-xl"
              />
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">
                  See Your Impact: Transparent Donation Tracking
                </h2>
                <p className="text-gray-600 mt-4">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quaerat explicabo quos voluptatum. Soluta alias nesciunt autem
                  voluptatem inventore corporis esse beatae! Deserunt, totam
                  repellendus! Eligendi soluta rem eveniet. Fugiat sequi,
                  voluptatibus ratione cupiditate autem ipsam quae, ut obcaecati
                  numquam impedit eum. Ea amet quisquam saepe soluta magnam.
                  Quidem ea fugiat vel quia, magnam veritatis iusto quo
                  molestias laudantium rerum repellendus dolorem, in distinctio
                  voluptatem, adipisci nobis laboriosam vitae reprehenderit rem
                  aliquid corrupti. Doloremque eos, facilis doloribus
                  accusantium laudantium error qui. Dignissimos explicabo iure
                  omnis quaerat ducimus necessitatibus totam eum asperiores
                  recusandae architecto. Inventore, excepturi praesentium
                  voluptatibus modi porro repellat in!
                </p>
                <div className="bg-gray-100 p-4 mt-4 rounded-lg">
                  <blockquote className="text-green-700 font-semibold">
                    Mehribonlikdan Ilhom Oling, Yaxshilik Ulashing
                  </blockquote>
                </div>
                <div className="flex space-x-2 mt-4">
                  <img
                    src="/img-5.png"
                    alt="Child"
                    className="w-1/2 rounded-lg"
                  />
                  <img
                    src="/img-5.png"
                    alt="Happy child"
                    className="w-1/2 rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

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
                      <img src="/cardchip.png" alt="Chip" className="w-10" />
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
