import { navLink } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Mobile from "./mobile";
import { Button } from "@/components/ui/button";

function Navbar() {

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center py-2 px-6 md:px-20">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link href={'/'}>
        <Image src={"/ehson.png"} alt="ehson" width={80} height={80} />
        </Link>
      </div>
      <div className="hidden md:flex space-x-4">
        {navLink.map((link) => (
          <Link
            key={link.id}
            href={link.path}
            className="text-gray-600 hover:text-yellow-500 transition"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <Link href="/help">
        <Button className="hidden md:block bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-400 transition cursor-pointer">
          Saytga yordam &rarr;
        </Button>
      </Link>

      <Mobile />
    </nav>
  );
}

export default Navbar;
