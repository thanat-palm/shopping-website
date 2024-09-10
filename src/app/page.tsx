import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" container mx-auto">
      <div className="flex flex-col sm:flex-row-reverse justify-center items-center sm:justify-around">
        <div className="size-[200px] sm:size-[300px] md:size-[400px] lg:size-[500px] my-5 sm:my-10 relative ">
          <Image 
            src="/android-chrome-512x512.png" 
            alt="" 
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl sm:text-start">WebShopping <br/> Online</h1>
      </div>
      <div className="">
        <div className="grid grid-cols-4 h-10 items-center text-center text-[16px] sm:text-[20px] border-2">
          <Link href="#" className=""><button className="bg-slate-400 w-full h-full hover:bg-slate-400/70">Categories</button></Link>
          <Link href="#" className=""><button className="bg-slate-400 w-full h-full hover:bg-slate-400/70">Promotion</button></Link>
          <Link href="#" className=""><button className="bg-slate-400 w-full h-full hover:bg-slate-400/70">Coupon</button></Link>
          <Link href="#" className=""><button className="bg-slate-400 w-full h-full hover:bg-slate-400/70">Contact us</button></Link>
        </div>
        <SearchBar/>
      </div>
      

    </main>
  );
}
