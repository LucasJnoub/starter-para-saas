"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Montserrat } from 'next/font/google';
import { cn } from '@/lib/utils';
import { UserIcon, UserPlusIcon } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin']
});

export default function LandingSideBar() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  return (
    <div className=' py-4 flex-col h-full bg-[#111827] text-white'>
      <div className="px-3 py-2 flex-1">
        <Link href='/image' className='flex items-center pl-3 mb-14'>
          <div className="relative w-8 h-8 mr-4">
            <Image
              fill
              alt='logo'
              src='/logo.png'
            />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Genius
          </h1>
        </Link>

        <div className="space-y-1">
          {/* Adicione seus links de rota aqui */}
        </div>

        {/* Botões Sign-in e Sign-up */}
        <div className="mt-auto">
          <Link
            href={isSignedIn ? "/image" : "/sign-in"}
            className={cn(
              'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
              isSignedIn ? 'bg-white/10 text-white' : 'text-zinc-400'
            )}
          >
            <div className="flex items-center flex-1">
              {/* <UserIcon className="h-5 w-5 mr-3" /> */}
              Sign-in
            </div>
          </Link>
          <Link
            href={isSignedIn ? "/image" : "/sign-up"}
            className={cn(
              'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
              isSignedIn ? 'bg-white/10 text-white' : 'text-zinc-400' 
            )}
          >
            <div className="flex items-center flex-1">
              {/* <UserPlusIcon className="h-5 w-5 mr-3" /> */}
              Sign-up
            </div>
          </Link>
          <Link
            href={"/pricing"}
            className={cn(
              'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
              isSignedIn ? 'bg-white/10 text-white' : 'text-zinc-400'
            )}
          >
            <div className="flex items-center flex-1">
              {/* <UserPlusIcon className="h-5 w-5 mr-3" /> */}
              Pricing
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}