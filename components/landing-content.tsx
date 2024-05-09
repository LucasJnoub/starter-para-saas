"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { EmblaCarousel } from './landing-carousel';

export default function LandingContent() {
  const testimonials = [
    {
      name: "Antonio",
      avatar: "A",
      title: "Engenheiro de Software",
      description: "Esta é a melhor aplicação que já usei. Adoro-a tanto. Mal posso esperar para ver o que vem a seguir para ela."
    },
    {
      name: "Maria",
      avatar: "M",
      title: "Designer de UX",
      description: "Estou maravilhada com a simplicidade e eficácia desta aplicação. Ela melhorou muito o meu fluxo de trabalho e produtividade."
    },
    {
      name: "João",
      avatar: "J",
      title: "Gestor de Produto",
      description: "Esta aplicação revolucionou a forma como nossa equipe colabora e se comunica. É um jogo mudador!"
    },
    {
      name: "Carolina",
      avatar: "C",
      title: "Desenvolvedora Web",
      description: "A aplicação é incrível! Ela simplificou muito meu trabalho e me ajudou a entregar projetos de alta qualidade mais rapidamente."
    }
  ];
  

  return (
    <div className='px-10 pb-20'>
      <div className="mb-10">
      <EmblaCarousel></EmblaCarousel>
      </div>
      {/* <h2 className='text-center text-4xl text-[#333333] font-extrabold mb-10'>
        Testimonials
      </h2> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* {testimonials.map((item)=>(
            <Card key={item.description} className='bg-[#F0F4F9] border-none text-[#333]'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-x-2'>
                    <div className="">
                      <p className="text-lg">{item.name}</p>
                      <p className="text-zinc-400 text-sm">{item.title}</p>
                    </div>
                  </CardTitle>
                  <CardContent className='pt-4 px-0'>
                    {item.description}
                  </CardContent>
                </CardHeader>
            </Card>
          ))} */}
      </div>
    </div>
  )
}
