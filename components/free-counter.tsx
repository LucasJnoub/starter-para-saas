"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card';
import { MAX_FREE_COUNTS } from '@/constants';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import { useProModal } from '@/hooks/user-pro-modal';
import Link from 'next/link';

interface FreeCounterProps{
  apiLimitCount:number
  isPro:boolean
}

export default function FreeCounter({apiLimitCount, isPro}: FreeCounterProps) {
const [mounted, setMounted] = useState(false);
const proModal = useProModal(); 
useEffect(()=>{
  setMounted(true)
},[])

if(!mounted) return null;

if(isPro) return null;
  return (
    <div className='px-3'>
      <Card className='bg-white/10 border-0'>
        <CardContent className='py-6'>
          <div className="text-center text-sm text-white mb-4 s"  >
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS}    Free generations
            </p>

            <Progress className='h-3'
            value={(apiLimitCount/MAX_FREE_COUNTS)* 100}
            />


          </div>
          
          <Link href='/pricing'>
          <Button  className='w-full' variant={"premium"}>Upgrade <Zap className='w-4 h-4 ml-2 fill white'/></Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
