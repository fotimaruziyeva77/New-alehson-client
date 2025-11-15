"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLink } from "@/constants";

import { cn } from "@/lib/utils";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Mobile = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="p-2 md:hidden">
          <AlignJustify size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64 sm:w-72">
        <div className="mt-6 flex flex-col">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
              <span className="text-[#055fad]">A</span>
              <span className="text-yellow-500">E</span>
            </div>
          </div>
          
          <Separator className="my-3" />
          <div className="flex flex-col space-y-3">
            {navLink.map((nav) => (
              <Link
                key={nav.id}
                href={nav.path}
                className={cn(
                  "hover:bg-gray-100 py-3 px-4 cursor-pointer rounded-lg transition-colors flex items-center gap-3 text-base",
                  pathname === nav.path && "bg-blue-50 text-[#3A40D8] font-semibold"
                )}
              >
                {nav.name}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Mobile;