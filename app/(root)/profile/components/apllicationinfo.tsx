"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";


import {
	Form,
	FormControl,
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
import { API_REQUEST } from '@/services'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { CategoryTypes, Subcategory } from '@/interfaces'
import { ImageIcon, Video, Upload } from 'lucide-react'


function ApplicationInfo() {
	const [category, setCategory] = useState<string>("");
	const [subCategory, setSubCategory] = useState<string>("");
	const [categories, setCategories] = useState<CategoryTypes[]>([]);
	const [subCategories, setSubCategories] = useState<Subcategory[]>([]);
	const [region, setRegion] = useState<string>("");
	const [district, setDistrict] = useState<string>("");
	const [districts, setDistricts] = useState(false);
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const [videoFile, setVideoFile] = useState<File | null>(null);
	const [videoUrl, setVideoUrl] = useState<string>("");
	const [uploadType, setUploadType] = useState<"image" | "video">("image");

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		
		const files = Array.from(e.target.files) as File[];
		const urls = files.map((file) => URL.createObjectURL(file));
		setImageUrls((prevUrls) => [...prevUrls, ...urls]);
		setImageFiles((prevFiles) => [...prevFiles, ...files]);
	};

	// const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (!e.target.files) return;
		
	// 	const file = e.target.files[0];
	// 	if (file && file.type.startsWith('video/')) {
	// 		setVideoFile(file);
	// 		setVideoUrl(URL.createObjectURL(file));
	// 	} else {
	// 		toast.error("Faqat video fayllarni yuklash mumkin", {
	// 			position: "top-center",
	// 		});
	// 	}
	// };

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await axios.get(API_REQUEST.categories);
				setCategories(res.data);
			} catch (err) {
				console.log(err);
			
				setCategories([]);
			}
		};

		fetchCategories();
	
	}, []);

	const formSchema = z.object({
		fullName: z.string().min(2, "Ism familiya kamida 2 ta belgidan iborat bo'lishi kerak").max(50),
		phoneNumber: z.string().min(9, "Telefon raqami noto'g'ri").max(15, "Telefon raqami juda uzun"),
		information: z.string().min(25, "Ma'lumot kamida 25 ta belgidan iborat bo'lishi kerak").max(500),
		plasticCard: z.string().min(16, "Karta raqami 16 ta raqamdan iborat bo'lishi kerak").max(16),
		region1: z.string().min(1, "Viloyatni tanlash shart"),
		region2: z.string().min(1, "Tumanni tanlash shart"),
		region3: z.string().min(10, "Manzil kamida 10 ta belgidan iborat bo'lishi kerak").max(150),
		category: z.string().min(1, "Kategoriyani tanlash shart"),
		subCategory: z.string().min(1, "Pastki kategoriyani tanlash shart"),
		passportInfo: z.string().min(9, "Passport ma'lumoti 9 ta belgidan iborat bo'lishi kerak").max(9),
		birthday: z.string().min(1, "Tug'ilgan sana kiritilishi shart"),
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
		if (!selectedRegion) {
			setDistrict("");
			form.setValue("region2", "");
		}
	}, [region, form]);

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
		
		if (videoFile) {
			formData.append("video", videoFile);
		}

		try {
			await axios.post(API_REQUEST.applications, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			
			toast.success("Arizangiz muvaffaqiyatli yuborildi!", {
				position: "top-center",
			});
			
			// Reset form after successful submission
			form.reset();
			setCategory("");
			setSubCategory("");
			setRegion("");
			setDistrict("");
			setImageFiles([]);
			setImageUrls([]);
			setVideoFile(null);
			setVideoUrl("");
		} catch (error) {
			console.error("Xatolik yuz berdi:", error);
			toast.error("Ariza yuborishda xatolik yuz berdi. Iltimos, qayta urunib ko'ring.", {
				position: "top-center",
			});
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
		
			
			<div className="container mx-auto px-4 pb-4">
				<div className="max-w-7xl mx-auto">
					<Card className="border-0 shadow-lg overflow-hidden">
						<div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
							<h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
								Ariza topshiring va yordam oling
							</h2>
							<p className="text-center opacity-90">
								Shaxsiy ma'lumotlaringizni kiriting
							</p>
						</div>
						
						<CardContent className="p-6">
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-6"
								>
									<div className="flex flex-col gap-6">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<FormField
												control={form.control}
												name="fullName"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="text-sm font-medium">
															Ism Familiya:
														</FormLabel>
														<FormControl>
															<Input
																className="text-sm"
																placeholder="Ism Familiyangiz"
																{...field}
															/>
														</FormControl>
														<FormMessage className="text-red-500 text-xs" />
													</FormItem>
												)}
											/>
											
											<FormField
												control={form.control}
												name="phoneNumber"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="text-sm font-medium">
															Telefon raqamingiz:
														</FormLabel>
														<FormControl>
															<Input
																className="text-sm"
																placeholder="+998 XX XXX XX XX"
																{...field}
															/>
														</FormControl>
														<FormMessage className="text-red-500 text-xs" />
													</FormItem>
												)}
											/>
										</div>
										
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<FormField
												control={form.control}
												name="birthday"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="text-sm font-medium">
															Tug'ilgan sana:
														</FormLabel>
														<FormControl>
															<Input
																type="date"
																className="w-full"
																{...field}
															/>
														</FormControl>
														<FormMessage className="text-red-500 text-xs" />
													</FormItem>
												)}
											/>
											
											<FormField
												control={form.control}
												name="passportInfo"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="text-sm font-medium">
															Passport seriya va raqam:
														</FormLabel>
														<FormControl>
															<Input
																className="text-sm"
																placeholder="AA1234567"
																{...field}
															/>
														</FormControl>
														<FormMessage className="text-red-500 text-xs" />
													</FormItem>
												)}
											/>
											
											<FormField
												control={form.control}
												name="plasticCard"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="text-sm font-medium">
															Karta raqamingiz:
														</FormLabel>
														<FormControl>
															<Input
																className="text-sm"
																placeholder="8600 1234 5678 9012"
																{...field}
															/>
														</FormControl>
														<FormMessage className="text-red-500 text-xs" />
													</FormItem>
												)}
											/>
										</div>
										
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<FormField
												control={form.control}
												name="region1"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="text-sm font-medium">
															Viloyat:
														</FormLabel>
														<FormControl>
															<Select
																onValueChange={(value) => {
																	setRegion(value);
																	field.onChange(value);
																}}
																value={region}
															>
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Viloyatni tanlang" />
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
														<FormMessage className="text-red-500 text-xs" />
													</FormItem>
												)}
											/>
											
											<FormField
												control={form.control}
												name="region2"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="text-sm font-medium">
															Tuman:
														</FormLabel>
														<FormControl>
															<Select
																onValueChange={(value) => {
																	setDistrict(value);
																	field.onChange(value);
																}}
																value={district}
																disabled={!region}
															>
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Tumanni tanlang" />
																</SelectTrigger>
																<SelectContent>
																	{getDistrictOptions()}
																</SelectContent>
															</Select>
														</FormControl>
														<FormMessage className="text-red-500 text-xs" />
													</FormItem>
												)}
											/>
										</div>
										
										<FormField
											control={form.control}
											name="region3"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm font-medium">
														To'liq manzilingiz:
													</FormLabel>
													<FormControl>
														<Input
															className="text-sm"
															placeholder="Ko'cha, uy, xonadon raqami"
															{...field}
														/>
													</FormControl>
													<FormMessage className="text-red-500 text-xs" />
												</FormItem>
											)}
										/>
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
																{/* {subCategories.map((item) => {
																	if (
																		Number(Number(category) === item.categories)
																	) {
																		return (

																			<SelectItem
																				value={item.id.toString()}
																				key={item.id}
																			>
																				{item.title}
																			</SelectItem>
																		))} */}
																</SelectContent>
															</Select>
														</FormControl>
														<FormMessage className="text-red-500 text-xs" />
													</FormItem>
												)}
											/>
										</div>
										
										<FormField
											control={form.control}
											name="information"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm font-medium">
														O'zingiz haqingizda ma'lumot bering:
													</FormLabel>
													<FormControl>
														<Textarea
															className="min-h-[120px] resize-none"
															placeholder="Yordam so'ragan sababingiz, hozirgi ahvolingiz va ehtiyojlaringiz haqida batafsil ma'lumot bering..."
															{...field}
														/>
													</FormControl>
													<FormMessage className="text-red-500 text-xs" />
												</FormItem>
											)}
										/>
										
										<div className="flex flex-col gap-2">
											<Label className="mb-2 text-sm font-medium">Media kontent (ixtiyoriy)</Label>
											
											<Tabs defaultValue="image" className="w-full" onValueChange={(value: string) => setUploadType(value as "image" | "video")}>
												<TabsList className="grid w-full grid-cols-2">
													<TabsTrigger value="image" className="flex items-center gap-2">
														<ImageIcon size={16} />
														Rasm
													</TabsTrigger>
													<TabsTrigger value="video" className="flex items-center gap-2">
														<Video size={16} />
														Video
													</TabsTrigger>
												</TabsList>
												
												<TabsContent value="image" className="space-y-4 mt-4">
													<Button 
														type="button"
														variant="outline"
														className="w-full md:w-auto border-blue-500 text-blue-500 hover:bg-blue-50 relative overflow-hidden"
													>
														<Upload size={16} className="mr-2" />
														<span>Rasmlarni yuklash</span>
														<Input
															type="file"
															multiple
															accept="image/*"
															onChange={handleImageChange}
															className="absolute inset-0 opacity-0 cursor-pointer"
														/>
													</Button>
													
													{imageUrls.length > 0 && (
														<div className="mt-4">
															<p className="text-sm mb-2">Yuklangan rasmlar:</p>
															<div className="flex items-center gap-4 flex-wrap">
																{imageUrls.map((item, idx) => (
																	<div key={idx} className="relative group">
																		<div className="w-24 h-24 relative rounded-md overflow-hidden border">
																			<Image
																				className="object-cover"
																				src={item}
																				alt={`Uploaded file ${idx}`}
																				fill
																				sizes="96px"
																			/>
																		</div>
																		<button
																			type="button"
																			className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
																			onClick={() => {
																				setImageUrls(imageUrls.filter((_, i) => i !== idx));
																				setImageFiles(imageFiles.filter((_, i) => i !== idx));
																			}}
																		>
																			×
																		</button>
																	</div>
																))}
															</div>
														</div>
													)}
												</TabsContent>
												
												<TabsContent value="video" className="space-y-4 mt-4">
													<Button 
														type="button"
														variant="outline"
														className="w-full md:w-auto border-blue-500 text-blue-500 hover:bg-blue-50 relative overflow-hidden"
													>
														<Upload size={16} className="mr-2" />
														<span>Video yuklash</span>
														<Input
															type="file"
															accept="video/*"
															// onChange={handleVideoChange}
															className="absolute inset-0 opacity-0 cursor-pointer"
														/>
													</Button>
													
													{videoUrl && (
														<div className="mt-4">
															<p className="text-sm mb-2">Yuklangan video:</p>
															<div className="relative group">
																<div className="aspect-video max-w-md mx-auto bg-black rounded-md overflow-hidden">
																	<video 
																		src={videoUrl} 
																		controls 
																		className="w-full h-full"
																	/>
																</div>
																<button
																	type="button"
																	className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
																	onClick={() => {
																		setVideoFile(null);
																		setVideoUrl("");
																	}}
																>
																	×
																</button>
															</div>
														</div>
													)}
												</TabsContent>
											</Tabs>
										</div>
									</div>
									
									<Button 
										type="submit" 
										className="w-full md:w-auto border border-blue-500 bg-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 px-10 py-3 cursor-pointer text-lg font-medium transition-colors"
										disabled={form.formState.isSubmitting}
									>
										{form.formState.isSubmitting ? "Yuborilmoqda..." : "Arizani yuborish"}
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default ApplicationInfo;