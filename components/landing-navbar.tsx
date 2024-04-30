"use client"
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { SignOutButton, UserButton, useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import MobileLandingMenu from "./mobile-landing-menu";


const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
})

function LandingNavBar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center"
      >
        {/* <div className="relative h-8 w-8 mr-4">
          <Image
            fill
            alt="Logo"
            src="/logo.png"
          />

        </div> */}
        <h1 className={cn("text-2xl font-bold", font.className)}>
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-pink-600 to-red-500">
      BgPretty
    </span>
  </h1>
      </Link>
      <div className="flex items-center gap-x-2 flex-row">
  <div className="hidden sm:flex gap-x-5">
     <div className="text-white flex flex-row  items-center gap-3">
      <ul className="flex flex-row gap-3">
        <a href="/pricing">
        <li>Pricing</li>
        </a>
        {!isSignedIn && (
          <a href="/sign-in">
          <li>Sign in</li>
          </a>
        )}
        
      </ul>
    </div>
    <Link href={isSignedIn ? "/image" : "/sign-up"}>
      <Button variant="ghost" className="rounded-full text-white border border-solid-red">
         {isSignedIn ? "Dashboard" : "Get Started"} 
      </Button>
    </Link>

  </div>
  <div className="sm:hidden">
    <MobileLandingMenu></MobileLandingMenu>
  </div>
</div>
    </nav>)
}

export default LandingNavBar;