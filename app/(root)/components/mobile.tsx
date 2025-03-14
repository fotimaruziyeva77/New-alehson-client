"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLink } from "@/constants";

import { cn } from "@/lib/utils";
import { AlignJustify, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Mobile = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="p-2 md:hidden">
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <Separator className="my-3" />
        <div className="flex flex-col space-y-2">
          {navLink.map((nav) => (
            <Link
              key={nav.name}
              href={nav.path}
              className={cn(
                "hover:bg-gray-200 py-2 px-3 cursor-pointer rounded-sm transition-colors flex items-center gap-2",
                pathname === nav.path && "text-[#3A40D8] font-semibold"
              )}
            >
              {nav.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Mobile;
