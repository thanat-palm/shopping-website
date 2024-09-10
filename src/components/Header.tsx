import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full h-20 bg-black text-white ">
      <div className="container h-full mx-auto px-2 sm:px-0 flex items-center justify-between">
        <a className="pr-2 relative w-10 h-10" href="/">
          <Image 
            src="/android-chrome-192x192.png" 
            alt="" 
            fill
            className="object-contain"
          />
        </a>
        <div className="flex gap-2 ">
          <Link href="/signin">
            <button className="w-14 h-8 sm:w-20 sm:h-10 rounded-md bg-green-600 hover:bg-green-600/80 text-[12px] sm:text-[16px] text-nowrap">Sign in</button>       
          </Link>
          <Link href="/signup">
            <button className="w-14 h-8 sm:w-20 sm:h-10 rounded-md bg-blue-600 hover:bg-blue-600/80 text-[12px] sm:text-[16px] text-nowrap">Sign up</button>       
          </Link>
          </div>
      </div>
    </div>
  );
}
