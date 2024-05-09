"use client"
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { EmblaOptionsType } from 'embla-carousel'
import { useEffect } from 'react'



export function EmblaCarousel() {

//   const [emblaRef] = useEmblaCarousel({loop: true, },[Autoplay({delay: 2500})])
const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

useEffect(() => {
    if (!emblaApi) return;
    
    const play = () => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    };

    const interval = setInterval(play, 2500);

    return () => clearInterval(interval);
  }, [emblaApi]);


  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        <div className="flex-0 flex-grow-0 flex-shrink-0 w-full in-w-0"><img src={'/img/foto-1.jpg'} alt="logo" className='w-[100%] h-[100%]' ></img></div>
        <div className="flex-0 flex-grow-0 flex-shrink-0 w-full in-w-0"><img src={'/img/foto-2.jpg'} alt="logo" className='w-[100%] h-[100%]' ></img></div>
        <div className="flex-0 flex-grow-0 flex-shrink-0 w-full in-w-0"><img src={'/img/foto-3.jpg'} alt="logo" className='w-[100%] h-[100%]' ></img></div>
        <div className="flex-0 flex-grow-0 flex-shrink-0 w-full in-w-0"><img src={'/img/foto-4.jpg'} alt="logo" className='w-[100%] h-[100%]' ></img></div>
      </div>
    </div>
  )
}