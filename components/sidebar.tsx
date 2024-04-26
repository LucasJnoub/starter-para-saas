"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Montserrat } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, MusicIcon, SettingsIcon, VideoIcon } from 'lucide-react';
import FreeCounter from './free-counter';
import { Progress } from './ui/progress';

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin']
});

// const routes = [
//   {
//     label: 'Dashboard',
//     icon: LayoutDashboard,
//     href: '/dashboard',
//     color: 'text-sky-500'
//   }, {
//     label: 'Conversation',
//     icon: MessageSquare,
//     href: '/conversation',
//     color: 'text-violet-500'
//   }, {
//     label: 'Image Generation',
//     icon: ImageIcon,
//     href: '/image',
//     color: 'text-pink-700'
//   }, {
//     label: 'Video Generation',
//     icon: VideoIcon,
//     href: '/video',
//     color: 'text-orange-700'
//   }, {
//     label: 'Music Generation',
//     icon: MusicIcon,
//     href: '/music',
//     color: 'text-emerald-500'
//   }, {
//     label: 'Code Generation',
//     icon: CodeIcon,
//     href: '/code',
//     color: 'text-green-700'
//   }, {
//     label: 'Settings',
//     icon: SettingsIcon,
//     href: '/settings',
//     // color:'text-green-700'
//   },
// ];
const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: ' '
  },
  {
    label: '',
    icon: LayoutDashboard,
    href: '',
    color: ' '
  },
  {
    label: '',
    icon: LayoutDashboard,
    href: '',
    color: ' '
  },
  {
    label: '',
    icon: LayoutDashboard,
    href: '',
    color: ' '
  },
  {
    label: '',
    icon: LayoutDashboard,
    href: '',
    color: ' '
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    href: '/settings',
    color: 'text-white'
  },
];



interface SideBarProps {
  apiLimitCount: number
  isPro: boolean
  onMenuItemClick: () => void
  
}

export default function SideBar({ apiLimitCount, isPro,  onMenuItemClick}: SideBarProps) {
  const pathname = usePathname();
  return (
    <div className=' py-4 flex-col h-full bg-[#111827] text-white'>
      <div className="px-3 py-2 flex-1">
        <Link href='/dashboard' className='flex items-center pl-3 mb-14'>
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
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition'
                ,
                pathname === route.href ? 'bg-white/10 text-white' : 'text-zinc-400')
              }
              onClick={onMenuItemClick} // Chama a função quando o usuário clica em um item do menu

              >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)}
                />
                {route.label}
              </div>

            </Link>
          ))}
        </div>

      </div>
      <div className="md:mt-20"> 
      <FreeCounter isPro={isPro}
          apiLimitCount={apiLimitCount}
        />
      </div>
    </div>
  )
}
