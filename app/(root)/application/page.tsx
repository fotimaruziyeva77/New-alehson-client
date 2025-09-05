"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { API_REQUEST } from "@/lib/apiRequest";
import { CategoryTypes, SubCategoryTypes } from "@/interfaces";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { regions } from "@/constants";
import { toast } from "sonner";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

function ApplicationPage() {
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategoryTypes[]>([]);
  const [region, setRegion] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [districts, setDistricts] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files) as File[];
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageUrls((prevUrls) => [...prevUrls, ...urls]);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      await axios
        .get(API_REQUEST.categories)
        .then((res) => setCategories(res.data))
        .catch((err) => console.log(err));
    };

    const fetchSubCategories = async () => {
      await axios
        .get(API_REQUEST.subcategories)
        .then((res) => setSubCategories(res.data))
        .catch((err) => console.log(err));
    };

    fetchCategories();
    fetchSubCategories();
  }, []);

  const formSchema = z.object({
    fullName: z.string().min(2).max(50),
    phoneNumber: z.string().min(9).max(15),
    information: z.string().min(25).max(500),
    plasticCard: z.string().min(16).max(16),
    region1: z.string(),
    region2: z.string(),
    region3: z.string().min(10).max(150),
    category: z.string(),
    subCategory: z.string(),
    passportInfo: z.string().min(9).max(9),
    birthday: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      information: "",
      plasticCard: "",
      region1: "",
      region2: "",
      region3: "",
      category: "",
      subCategory: "",
      passportInfo: "",
      birthday: "",
    },
  });

  useEffect(() => {
    const selectedRegion = regions.find((obj) => obj.title === region);
    setDistricts(!!selectedRegion);
  }, [region]);

  const getDistrictOptions = () => {
    const selectedRegion = regions.find((obj) => obj.title === region);
    if (!selectedRegion) return [];

    return selectedRegion.items.map((district: string, index: number) => (
      <SelectItem value={district} key={index}>
        {district}
      </SelectItem>
    ));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("full_name", values.fullName);
    formData.append("phone_number", values.phoneNumber);
    formData.append("birthday", values.birthday);
    formData.append("information", values.information);
    formData.append("plastic_card", values.plasticCard);
    formData.append("region", `${region}, ${district}, ${values.region3}`);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("passport_number", values.passportInfo);
    imageFiles.forEach((file) => {
      formData.append(`image_urls`, file);
    });

    try {
      await axios.post(API_REQUEST.applications, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Muvaffaqiyatli yuborildi", {
        position: "top-center",
        richColors: true,
      });
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  }

  return (
    <div>
        <div
        className="w-full h-[300px] md:h-[400px] bg-center bg-cover flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/edit.png')" }}
      >
        <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
		  Ariza yuborish
        </h1>
        <div className="mt-4 md:mt-10">
          <Breadcrumb>
            <BreadcrumbList className="text-white  text-lg md:text-xl">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-yellow-500">
                  Bosh sahifa
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/about" className="hover:text-yellow-500">
				Ariza yuborish
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="bg-blue-400 max-w-7xl p-10 rounded-lg w-full mt-10 mb-10">
          <h2 className="text-5xl text-white mb-4">
            Ariza topshiring va yordam oling.
          </h2>
          <h3 className="text-3xl  mb-4 mt-15 text-white">
            Shaxsiy ma'lumotlaringizni kiriting
          </h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-10"
            >
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm font-medium">
                            Ism Familiya:
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-sm text-black bg-white"
                              placeholder="Ism Familiyangiz"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm font-medium">
                            Telefon raqamingiz:
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-sm text-black bg-white"
                              placeholder="Telefon raqam"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="birthday"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm font-medium">
                            Tug'ilgan kun, oy, yil:
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              className="w-full bg-white inline-block"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="passportInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm font-medium">
                            Passport seriya va raqam:
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-sm text-black bg-white"
                              placeholder="Passport seriyasi va raqami"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="plasticCard"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm font-medium">
                            Karta raqamingizni kiriting:
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-sm text-black bg-white"
                              placeholder="xxxx xxxx xxxx xxxx"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="region1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm font-medium">
                            Viloyat:
                          </FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              onValueChange={(value) => setRegion(value)}
                              value={region}
                            >
                              <SelectTrigger className="w-full bg-white text-black">
                                <SelectValue className="text-black" />
                              </SelectTrigger>
                              <SelectContent>
                                {regions.map((item) => (
                                  <SelectItem value={item.title} key={item.id}>
                                    {item.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div
                    className={cn(districts ? "block col-span-1 " : "hidden")}
                  >
                    <FormField
                      control={form.control}
                      name="region2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm font-medium">
                            Tuman:
                          </FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              onValueChange={(value) => setDistrict(value)}
                              value={district}
                            >
                              <SelectTrigger className="w-full bg-white text-black">
                                <SelectValue className="text-black" />
                              </SelectTrigger>
                              <SelectContent>
                                {getDistrictOptions()}
                              </SelectContent>
                            </Select>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="region3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm font-medium">
                            Manzilingiz:
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-sm text-black bg-white"
                              placeholder="Manzilingizni to'ldiring"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm font-medium">
                            Kategoriya:
                          </FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              onValueChange={(value) => setCategory(value)}
                            >
                              <SelectTrigger className="w-full bg-white">
                                <SelectValue className="text-black" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((item) => (
                                  <SelectItem
                                    value={`${item.id}`}
                                    key={item.id}
                                  >
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="subCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm font-medium">
                            Qism kategoriya:
                          </FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger className="w-full bg-white">
                                <SelectValue className="text-black" />
                              </SelectTrigger>
                              <SelectContent>
                                {subCategories.map((item) => {
                                  if (
                                    Number(Number(category) === item.category)
                                  ) {
                                    return (
                                      <SelectItem
                                        value={`${item.id}`}
                                        key={item.id}
                                      >
                                        {item.name}
                                      </SelectItem>
                                    );
                                  }
                                })}
                              </SelectContent>
                            </Select>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="information"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm font-medium">
                          O'ziz haqizda ma'lumot bering:
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="bg-white text-black text-2xl placeholder-white"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white mb-2 text-sm">Rasmlar</Label>
                  <Button className="bg-yellow-500 py-3 px-5 rounded-full hover:bg-white hover:text-black  border border-yellow-300 relative overflow-hidden w-min">
                    <span>Rasmlarni yuklash</span>
                    <Input
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </Button>
                  <div className="flex items-center gap-4 flex-wrap">
                    {imageUrls &&
                      imageUrls.map((item, idx) => (
                        <Image
                          className="aspect-video"
                          key={idx}
                          src={item}
                          alt={`Uploaded file ${idx}`}
                          width={250}
                          height={180}
                        />
                      ))}
                  </div>
                </div>
              </div>
              <Button type="submit" className="mt-4 flex border border-yellow-500 bg-white text-yellow-400 hover:bg-yellow-500 hover:text-white px-10 py-2 cursor-pointer">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ApplicationPage;
