import { footerImages, footerLinks } from "@/constants";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#2A2A2A] text-gray-300 py-8">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Image src={"/ehson.png"} alt="ehson" width={80} height={80} />
          <p className="mt-3 text-sm">
            Lorem Ipsum is simply dummy text of the industry's since the
            unknown. Lorem Ipsum is simply dummy text of the industry.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Gallery</h3>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {footerImages.map((image) => (
              <Image
                key={image.id}
                src={image.image}
                alt={`Image ${image.id}`}
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
            {footerLinks.map((link, index) => (
              <a key={index} href="#" className="hover:text-white transition">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright & Socials */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center">
        <p className="text-sm">
          © All rights reserved 2023{" "}
          <span className="text-blue-400">Charityshay</span>
        </p>
        <div className="flex justify-center space-x-4 mt-3">
          <Facebook className="w-5 h-5 cursor-pointer hover:text-white" />
          <Instagram className="w-5 h-5 cursor-pointer hover:text-white" />
          <Linkedin className="w-5 h-5 cursor-pointer hover:text-white" />
          <Twitter className="w-5 h-5 cursor-pointer hover:text-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
