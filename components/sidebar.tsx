"use client"
import React, { useEffect, useRef, useState } from 'react';
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
//     href: '/image',
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
    label: 'Background Generator',
    icon: ImageIcon,
    href: '/image',
    color: 'text-pink-700'
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
  onMenuItemClick?: () => void
  
}

export default function SideBar({ apiLimitCount, isPro, onMenuItemClick}: SideBarProps) {
  const [credits, setCredits] = React.useState(0)
  const pathname = usePathname();
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  // const [socket, setSocket] = useState(undefined);

  // useEffect(() => {
  //   const wss = new WebSocket('ws://localhost:8080'); // Ajuste o endereço conforme necessário

  //   wss.onopen = () => {
  //     console.log('Conectado ao servidor WebSocket');
  //     // Envie o ID do usuário para o servidor
  //     if (userId) wss.send(userId);
  //   };

  //   wss.onmessage = (event) => {
  //     if (userId) wss.send(userId);
  //     const data = JSON.parse(event.data);
  //     if (data.credits) {
  //       setCredits(data.credits);
  //     }
  //   };

  //   wss.onerror = (error) => {
  //     console.error('Erro no WebSocket:', error);
  //   };

  //   return () => {
  //     wss.close(); 
  //   };
  // }, [userId]);

  
    // return () => {
    //   socket.off('credits');
    // };
  // }, []);
  

  // useEffect(()=>{
  //   const getCredits = async () =>{
  //     const response = await axios.get('/api/getcredits');
  //     setCredits(response.data);
  //   }

  //   getCredits();
  // }, [credits])

  // useEffect(() => {
  //   const getCredits = async () => {
  //     const response = await axios.get('/api/getcredits');
  //     setCredits(response.data);
  //   };
    
  //   getCredits();
  //   const interval = setInterval(getCredits, 500); 

  //   return () => clearInterval(interval); 

  // }, [credits]);

  
 


  return (
    <div className=' py-4 flex-col h-full bg-[#111827] text-white'>
      <div className="px-3 py-2 flex-1">
        <Link href='/image' className='flex items-center pl-3 mb-14'>
          <div className="relative w-8 h-8 mr-4">
            {/* <Image
              fill
              alt='logo'
              src='/logo.png'
            /> */}
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-pink-600 to-red-500">
      BgPretty
    </span>
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
      <div className="md:mt-20 flex justify-start"> 
      {/* <FreeCounter isPro={isPro}
          apiLimitCount={apiLimitCount}
        /> */}

      </div>
    </div>
  )
}
