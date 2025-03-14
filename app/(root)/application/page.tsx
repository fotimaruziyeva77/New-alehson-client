"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function ApplicationPage() {
  const [date, setDate] = React.useState<Date>();
  const [category, setCategory] = React.useState<string>("");
  const [subcategory, setSubcategory] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="w-full p-4 mt-25">
        <div className="relative w-full h-60 md:h-80 lg:h-96">
          <Image
            src="/about.png"
            alt="About Us Image"
            className="w-full h-full object-cover"
            layout="fill"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl md:text-6xl lg:text-8xl font-bold text-center">
          Ariza topshirish
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-blue-400 max-w-7xl p-10 rounded-lg w-full mt-10 mb-10">
          <h2 className="text-5xl text-white mb-4">
          Ariza topshiring va yordam oling.
          </h2>
          <h3 className="text-3xl  mb-4 mt-15 text-white">Shaxsiy ma'lumotlaringizni kiriting</h3>
          <form className="space-y-4 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 text-xl">Ism Familiya:</Label>
                <Input
                  className="p-6 text-white text-2xl placeholder-white"
                  type="text"
                />
              </div>
              <div>
                <Label className="text-white mb-2 text-xl">
                  Telefon raqam:
                </Label>
                <Input
                  className="p-6 text-white text-2xl placeholder-white"
                  type="tel"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <Label className="text-white mb-2 text-xl">
                  Tug'ilgan kun, oy, yil:
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className={cn(
                        "p-6 w-full text-left bg-white",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Sanani tanlang</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            <div>
                <Label className="text-white mb-2 text-xl">
                  Passport seriya va raqam:
                </Label>
                <Input className="p-6 text-white text-2xl placeholder-white" />
              </div>
              
              <div>
                <Label className="text-white mb-2 text-xl">
                 Karta raqamingizni kiriting:
                </Label>
                <Input className="p-6 text-white text-2xl placeholder-white" />
              </div>
            </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
                <Label className="text-white mb-2 text-xl">Viloyat</Label>
                <Select>
                  <SelectTrigger className="w-full p-6">
                    <SelectValue className="text-white" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Toshkent">Toshkent</SelectItem>
                    <SelectItem value="Navoiy">Navoiy</SelectItem>
                    <SelectItem value="Samarqand">Samarqand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white mb-2 text-xl">Tuman</Label>
                <Select>
                  <SelectTrigger className="w-full p-6">
                    <SelectValue className="text-white" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Toshkent">Toshkent</SelectItem>
                    <SelectItem value="Navoiy">Navoiy</SelectItem>
                    <SelectItem value="Samarqand">Samarqand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Category */}
              <div>
                <Label className="text-white mb-2 text-xl">Category</Label>
                <Select onValueChange={setCategory} value={category}>
                  <SelectTrigger className="w-full p-6">
                    <SelectValue className="text-white" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Environment">Environment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Subcategory */}
              <div>
                <Label className="text-white mb-2 text-xl">Subcategory</Label>
                <Select onValueChange={setSubcategory} value={subcategory}>
                  <SelectTrigger className="w-full p-6">
                    <SelectValue className="text-white" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="School">School</SelectItem>
                    <SelectItem value="Hospital">Hospital</SelectItem>
                    <SelectItem value="Cleanup">Cleanup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Description */}
              <div className="col-span-2">
                <Label className="text-white mb-2 text-xl">
                  O'ziz haqizda ma'lumot bering:
                </Label>
                <Textarea
                  className="p-6 text-white text-2xl placeholder-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {/* Image Upload */}
              <div className="">
                <Label className="text-white mb-2 text-xl">Rasm</Label>

                <Button className="bg-yellow-500 p-6 rounded-full hover:bg-white hover:text-black  border border-yellow-300 relative overflow-hidden">
                  <span>Upload File</span>
                  <Input
                    type="file"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </Button>
              </div>
         </div>
            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                className="p-6 text-xl bg-yellow-500 hover:bg-yellow-400 cursor-pointer"
              >
                Submit
              </Button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default ApplicationPage;
