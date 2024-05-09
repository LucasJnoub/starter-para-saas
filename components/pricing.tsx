"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import PricingCard from './pricing-card';
import { env } from 'process';
import { useRouter } from 'next/navigation';


const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isMonthly, setIsMonthly] = useState(true);
  const [userPlan, setUserPlan] = useState(null);
  const [isBusiness, setIsBusiness] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const router = useRouter();


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get("/api/checksubscription");
  //       if (response.status === 200) {
  //         const data = await response.data;
  //         setUserPlan(data.plan);
  //         setLoading(false);
  //       } else {
  //         setUserPlan(null);
  //         setLoading(false);
  //         console.log("Failed to fetch user subscription. Status code:", response.status);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user subscription:", error);
  //       setUserPlan(null);
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchData();  
  // }, []);
  




  const handleOnClick = async (planTitle:string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/stripe?plan=${planTitle}`);
      // const response = await axios.get(`/api/stripe?isAnnual=${isMonthly}&isBusiness=${isBusiness}`);
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  
  // const pricingCards = [
  //   {
  //     title: 'Pacote Inicial',
  //     description: 'Perfeito para quem está começando e precisa de backgrounds simples e eficientes.',
  //     price: '7',
  //     features: [
  //       'Até 7 fotos geradas',
  //       'Backgrounds Personalizados',
  //       'Sem suporte premium'
  //     ],
  //     variant: 'custom',
  //     handleClick: handleOnClick,
  //     isBusiness: false,
  //     buttonText: "Atualizar",
  //     priceId :'i',
  //     titleColor: 'text-[#000000]',
  //     priceColor: "text-[#000000]"

  //   },
  //   {
  //     title: 'Pacote Profissional',
  //     description: 'Ideal para pequenos negócios e empreendedores que querem backgrounds mais elaborados.',
  //     price: '10',
  //     features: [
  //       'Até 10 fotos geradas',
  //       'Backgrounds personalizados',
  //       'Suporte premium'
  //     ],
  //     variant: 'premium',
  //     handleClick: handleOnClick,
  //     isBusiness: false,
  //     buttonText: "Atualizar",
  //     titleColor: 'text-[#A655F7]',
  //     priceColor: "text-[#A655F7]",
  //     priceId :'p'

  //   },
  //   {
  //     title: 'Pacote Premium',
  //     description: 'Para empresas e agências que precisam de backgrounds de alta qualidade em grande quantidade.',
  //     price: '50',
  //     features: [
  //       'Até 50 fotos geradas',
  //       'Backgrounds personalizados',
  //       'Suporte premium'
  //     ],
  //     variant: 'custom',
  //     handleClick: handleOnClick,
  //     isBusiness: true,
  //     buttonText: "Atualizar",
  //     priceId :'pr',
  //     titleColor: 'text-[#000000]',
  //     priceColor: "text-[#000000]"

  //   },
  // ];
  

  const pricingCards = [
    {
      title: 'Starter',
      description: 'Perfect for those who are starting out and need simple and efficient backgrounds.',
      price: '1,50',
      features: [
        'Up to 7 generated photos',
        'Customized Backgrounds',
      ],
      variant: 'custom',
      handleClick: handleOnClick,
      isBusiness: false,
      buttonText: "Upgrade",
      priceId :'i',
      titleColor: 'text-[#000000]',
      priceColor: "text-[#000000]"

    },
    {
      title: 'Professional',
      description: 'Ideal for small businesses and entrepreneurs who want more elaborate backgrounds.',
      price: '2,00',
      features: [
        'Up to 10 generated photos',
        'Customized Backgrounds'
      ],
      variant: 'premium',
      handleClick: handleOnClick,
      isBusiness: false,
      buttonText: "Upgrade",
      titleColor: 'text-[#A655F7]',
      priceColor: "text-[#A655F7]",
      priceId :'p'

    },
    {
      title: 'Premium',
      description: 'For companies and agencies that need high-quality backgrounds in large quantities.',
      price: '10,00',
      features: [
        'Up to 50 generated photos',
        'Customized Backgrounds'
      ],
      variant: 'custom',
      handleClick: handleOnClick,
      isBusiness: true,
      buttonText: "Upgrade",
      priceId :'pr',
      titleColor: 'text-[#000000]',
      priceColor: "text-[#000000]"

    },
  ];


  return (
    <div className="bg-[#ffffff] text-white p-8 ">
      <h1 className="text-4xl font-bold mb-8 text-center">Pricing</h1>
      {/* <p className="mb-8 text-center">
        Start scheduling on our Free plan - no credit card required, or trial Premium for unlimited scheduling, multiple
        social sets & more.
      </p> */}
      <div className="flex items-center justify-center flex-wrap mb-8">
  {/* <span className="mr-2">Monthly</span>
  <label htmlFor="toggle" className="flex items-center cursor-pointer relative">
    <input
      type="checkbox"
      id="toggle"
      className="sr-only"
      checked={isMonthly}
      onChange={handleToggle}
    />
    <div className="w-10 h-6 bg-gray-400 rounded-full transition"></div>
    <span
      className={`absolute w-4 h-4 bg-white rounded-full transition transform ${
        isAnnual ? 'translate-x-6' : 'translate-x-1'
      }`}
    ></span>
  </label> */}
  {/* <span className="ml-2">Annually</span> */}
  <br className="hidden md:block" />
  {/* <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-full mt-2 md:mt-0">
    2 months for free on annual plan
  </span> */}
</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingCards.map((card, index) => (
          <PricingCard
          mb={card.variant === 'premium' ? 'mb-8' : 'mt-5'}
            key={index}
            title={card.title}
            description={card.description}
            price={card.price}
            features={card.features}
            variant={card.variant}
            handleClick={card.handleClick}
            isBusiness={card.isBusiness}
            buttonText={card.buttonText}
            userPlan={userPlan}
            titleColor={card.titleColor}
            priceColor={card.priceColor}
            priceId={card.priceId}
            />
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
