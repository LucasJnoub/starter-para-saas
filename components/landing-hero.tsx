"use client"
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
import { EmblaCarousel } from "./landing-carousel";
export const LandingHero = ()=>{
  const {isSignedIn} = useAuth();

  return (
    <div className="text-[#333] font-bold py-20 text-center space-y-5">
      <div className="text-4xl-sm:text  sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1 className="text[#333]">The Best AI Tool for </h1>
        <div className="">
        {/* <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> */}
          {/* <TypewriterComponent
          options={{
            strings:['Product Background Generation'],
            autoStart:true,
            loop:true
          }}
          
          
        /> */}
          <h1>Product Background Generation</h1>
        </div>
      </div>

      <div className="text-md md:text-xl font-light text-[#000]">
        Create amazing product background images
      </div>
      {/* <div className="text-sm md:text-xl font-light text-zinc-400">
        Create amazing product background images
      </div> */}

      <div className="">
        <Link
        href={isSignedIn? "/image" : "/sign-up"}
        >
          <Button variant={"premium"} className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Start Generating For Free
          </Button>
        
        </Link>
          {/* <EmblaCarousel></EmblaCarousel>  */}
      </div>

      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
  </div>)
}