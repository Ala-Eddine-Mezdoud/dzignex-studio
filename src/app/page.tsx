import Image from "next/image";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { MarqueeDemo } from "@/components/Marquee";
import LogoSlider from "@/components/LogoSlider";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden container m-auto">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 h-screen w-full bg-red-500"
        style={{
          backgroundImage: "url('/HeroBackgound.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
  <div className="absolute bottom-0 inset-x-0 h-80 bg-gradient-to-t from-black to-black/0" />
      </div>


      {/* Foreground content */}
      <div className="flex items-center justify-center h-screen text-white flex-wrap ">
        <div className="flex flex-wrap justify-center items-center h-[50%] relative top-10">
        <div>

          
        <ShimmerButton className="shadow-2xl gap-2">
          <Image
            src='/Icon.png' alt="Icon"
            width={35}
            height={35}
          />
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
            Proudly Serving 40+ Clients
          </span>
        </ShimmerButton>
        </div>



        <div className="flex justify-center flex-wrap gap-8"> 
          <h1 className="text-7xl w-[80%]  text-center ">Simplifying brands and driving Success through strategic design</h1>
          <p className="text-xl w-[35%]  text-gray-400  text-center ">We craft bold identities and digital experiences for brands ready to make their mark.</p>

        </div>


        <div>
         <button className="bg-gray-100 text-black p-2 pr-8 pl-8 rounded-md  text-lg font-semibold">
            Book Free Consultaion
          </button>
        </div>
        
        </div>
        
        <div className="w-full justify-center flex relative bottom-30">

        </div>



      </div>
    </div>
  );
}
