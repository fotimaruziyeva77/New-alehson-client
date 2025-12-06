"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy, 
  Check, 
  ArrowLeft,
  Calendar,
  Phone,
  MapPin,
  User,
  FileText,
  AlertCircle,
  Heart,
  Share2,
  Download,
  Eye,
  Video,
  Image as ImageIcon,
  Globe,
  Mail,
  MessageSquare
} from "lucide-react";
import {  Application, CategoryTypes } from "@/interfaces";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumb,BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { API_REQUEST } from '@/services';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const ApplicationDetailPage = () => {
  const [application, setApplication] = useState<Application | null>(null);
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("details");

  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  useEffect(() => {
    if (!slug) return;

    const fetchApplication = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_REQUEST.applications}${slug}/`);
        setApplication(response.data);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
        setError("Ma'lumot yuklashda xatolik yuz berdi.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [slug]);

  useEffect(() => {
    axios
      .get(API_REQUEST.categories)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocialMedia = (platform: string) => {
    const url = window.location.href;
    const title = application?.full_name || "Ehson qilish";
    const text = application?.description || "Mehribonlikdan ilhom oling";

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
    }
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.title || `Category ${categoryId}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'approved':
        return <Badge className="bg-green-500 text-white">Faol</Badge>;
      case 'pending':
      case 'in_review':
        return <Badge className="bg-yellow-500 text-white">Ko'rib chiqilmoqda</Badge>;
      case 'denied':
      case 'rejected':
        return <Badge className="bg-red-500 text-white">Rad etilgan</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Ma'lumotlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Xatolik yuz berdi</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button onClick={() => router.push('/helpme')}>
          <ArrowLeft className="mr-2" />
          Orqaga qaytish
        </Button>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <FileText className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ma'lumot topilmadi</h2>
        <p className="text-gray-600 mb-6">So'ralgan ariza topilmadi yoki o'chirilgan.</p>
        <Button onClick={() => router.push('/helpme')}>
          <ArrowLeft className="mr-2" />
          Ariza ro'yxatiga qaytish
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen   to-white max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative   text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-8 md:py-12">
          <Button
            variant="ghost"
            className="mb-6 text-white "
            onClick={() => router.push('/helpme')}
          >
            <ArrowLeft className="mr-2" />
            Orqaga
          </Button>
          
          <Breadcrumb className="mb-6">
            <BreadcrumbList className="text-white/90">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-white">
                  Bosh sahifa
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/helpme" className="hover:text-white">
                  Ehson qilish
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-white font-semibold">{application.full_name}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{application.full_name}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {getStatusBadge(application.status)}
                {/* <Badge variant="outline" className="text-white border-white/50">
                  {getCategoryName(application.category_title)}
                </Badge> */}
                <div className="flex items-center text-white/80">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>1.2k ko'rish</span>
                </div>
              </div>
              <p className="text-white/90 text-lg max-w-3xl">{application.description}</p>
            </div>
            
         
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Media & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image/Video */}
            <Card>
              <CardContent className="p-6">
                {application.images?.[activeImage] ? (
                  <div className="relative rounded-xl overflow-hidden ">
                    <Image
                      src={application.images[activeImage]}
                      alt={application.full_name}
                      width={800}
                      height={450}
                      className="w-full h-auto max-h-[500px] object-cover"
                    />
                    {application.images.length > 1 && (
                      <div className="absolute bottom-4 right-4">
                        <Button 
                          size="sm" 
                          variant="secondary"
                          className="bg-white/90 backdrop-blur-sm"
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          {application.images.length} ta rasm
                        </Button>
                      </div>
                    )}
                  </div>
                ) : application.images?.[0] ? (
                  <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                    <video
                      src={application.images[0]}
                      controls
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Rasm mavjud emas</p>
                    </div>
                  </div>
                )}

                {/* Thumbnails */}
                {application.images && application.images.length > 1 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mt-4">
                    {application.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                          activeImage === index 
                            ? 'border-primary ring-2 ring-primary/20' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Videos */}
                {application.images && application.images.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Video className="w-5 h-5 mr-2 text-primary" />
                      Videolar
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {application.images.map((video, index) => (
                        <div key={index} className="relative aspect-video bg-black rounded-lg overflow-hidden">
                          <video
                            src={video}
                            controls
                            className="w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tabs */}
            <Card>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="border-b">
                  <TabsList className="w-full justify-start px-6 pt-6 bg-transparent">
                    <TabsTrigger value="details">Batafsil ma'lumot</TabsTrigger>
                    <TabsTrigger value="story">Hikoya</TabsTrigger>
                    <TabsTrigger value="documents">Hujjatlar</TabsTrigger>
                    <TabsTrigger value="updates">Yangiliklar</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="details" className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <User className="w-5 h-5 mr-2 text-primary" />
                        Shaxs ma'lumotlari
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-32 text-gray-500">To'liq ismi:</div>
                          <div className="font-medium">{application.full_name}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-32 text-gray-500">Tug'ilgan sana:</div>
                          <div className="font-medium">{application.birth_date}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-32 text-gray-500">Pasport:</div>
                          <div className="font-medium">{application.passport_number}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-primary" />
                        Manzil
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-32 text-gray-500">Viloyat:</div>
                          <div className="font-medium">{application.region}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-32 text-gray-500">Manzil:</div>
                          <div className="font-medium">{application.location}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-primary" />
                        Aloqa ma'lumotlari
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-32 text-gray-500">Telefon:</div>
                          <div className="font-medium">{application.phone_number}</div>
                        </div>
                        {/* {application.email && (
                          <div className="flex items-center">
                            <div className="w-32 text-gray-500">Email:</div>
                            <div className="font-medium">{application.email}</div>
                          </div>
                        )} */}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-primary" />
                        Qo'shimcha ma'lumot
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-32 text-gray-500">Holati:</div>
                          {getStatusBadge(application.status)}
                        </div>
                        {application.denied_reason && (
                          <div className="flex items-start">
                            <div className="w-32 text-gray-500 pt-1">Rad sababi:</div>
                            <div className="font-medium text-red-600">{application.denied_reason}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="story" className="p-6">
                  <div className="prose max-w-none">
                    <h3 className="text-2xl font-bold mb-6">Arizaning hikoyasi</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {application.description || "Hikoya ma'lumotlari kiritilmagan."}
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                      <p className="text-blue-800 italic">
                        "Har bir mehribonlik har qanday shaklda bo'lsin, insoniyatni yaxshi tomonga o'zgartiradi."
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Yuklangan hujjatlar</h3>
                  {/* <div className="space-y-3">
                    {application.documents?.map((doc, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-3 text-gray-400" />
                            <div>
                              <p className="font-medium">Hujjat {index + 1}</p>
                              <p className="text-sm text-gray-500">PDF • {(Math.random() * 2 + 0.5).toFixed(1)} MB</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Yuklab olish
                          </Button>
                        </CardContent>
                      </Card>
                    )) || (
                      <p className="text-gray-500 text-center py-8">Hujjatlar mavjud emas</p>
                    )}
                  </div> */}
                </TabsContent>

                <TabsContent value="updates" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Ariza yangiliklari</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <p className="font-medium">Ariza tasdiqlandi</p>
                      <p className="text-sm text-gray-500">2 kun oldin</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-medium">Yangi hujjatlar qo'shildi</p>
                      <p className="text-sm text-gray-500">1 hafta oldin</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4 py-2">
                      <p className="font-medium">Ariza qabul qilindi</p>
                      <p className="text-sm text-gray-500">2 hafta oldin</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Donation Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-primary" />
                  Ehson qilish
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Bank kartasi orqali</h4>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">Karta raqami</span>
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy 
                          className="w-4 h-4 text-gray-400 hover:text-primary cursor-pointer"
                          onClick={() => copyToClipboard("8600 1234 5678 9012")}
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-lg font-bold">8600 1234 5678 9012</p>
                      <Image 
                        src="/cardchip.png" 
                        alt="Chip" 
                        width={40} 
                        height={40}
                        className="opacity-80"
                      />
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-500">Karta egasi</p>
                      <p className="font-semibold">{application.full_name}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Yoki boshqa usullar</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-auto py-3">
                      <Image src="/payme.png" alt="Payme" width={24} height={24} className="mr-2" />
                      Payme
                    </Button>
                    <Button variant="outline" className="h-auto py-3">
                      <Image src="/click.png" alt="Click" width={24} height={24} className="mr-2" />
                      Click
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Yig'ilgan mablag'</span>
                    <span className="font-bold text-primary">75 000 000 UZS</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Maqsad: 100 000 000 UZS</span>
                    <span>75%</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:opacity-90">
                  <Heart className="mr-2" />
                  Ehson qilish
                </Button>
              </CardContent>
            </Card>

            {/* Contact & Share */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                    Bog'lanish
                  </h4>
                  <Button className="w-full mb-3" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    {application.phone_number}
                  </Button>
                  {/* {application.email && (
                    <Button className="w-full" variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Email yozish
                    </Button>
                  )} */}
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Share2 className="w-5 h-5 mr-2 text-primary" />
                    Ulashish
                  </h4>
                  <div className="grid grid-cols-4 gap-3">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600"
                      onClick={() => shareOnSocialMedia('facebook')}
                    >
                      <Facebook />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="bg-blue-50 hover:bg-blue-100 text-blue-400"
                      onClick={() => shareOnSocialMedia('twitter')}
                    >
                      <Twitter />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700"
                      onClick={() => shareOnSocialMedia('linkedin')}
                    >
                      <Linkedin />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="bg-green-50 hover:bg-green-100 text-green-600"
                      onClick={() => shareOnSocialMedia('telegram')}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;