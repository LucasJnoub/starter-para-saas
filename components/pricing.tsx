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


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/checksubscription");
        if (response.status === 200) {
          const data = await response.data;
          setUserPlan(data.plan);
          setLoading(false);
        } else {
          setUserPlan(null);
          setLoading(false);
          console.log("Failed to fetch user subscription. Status code:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user subscription:", error);
        setUserPlan(null);
        setLoading(false);
      }
    };
  
    fetchData();  
  }, []);
  

  const handleToggle = () => {
    setIsAnnual(!isAnnual);
    setIsMonthly(!isMonthly);
  };

  const handleBusinessClick = () => {
    setIsBusiness(true);
    handleOnClick(true);
  };

  const handleFreeClick = async () => {
    if (user) {
      // Se o usuário estiver logado, redirecione para a rota dashboard
      router.push("/image");
    } else {
      // Se o usuário não estiver logado, redirecione para a página de signup
      router.push("/signup");
    }
  };
  

  const handleOnClick = async (isBusiness = false) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/stripe?isAnnual=${isMonthly}&isBusiness=${isBusiness}`);
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  

  const pricingCards = [
    {
      title: 'Free',
      description: 'Try out Pallyy and schedule 15 posts per month, for a single brand. No credit card required.',
      price: 0,
      period: 'per month',
      features: ['1 Social Set', '15 Scheduled posts', 'Feed Planner', 'Reports', 'Calendar, board & table views'],
      variant: 'ghost',
      handleClick: handleFreeClick, // Alterado para handleFreeClick
      isBusiness: false,
      buttonText: user?"Go to dashboard":"Sign Up",
    },
      
    {
      title: 'Pro',
      description: 'For social media agencies with multiple brands; unlimited posting, add more brands & more.',
      price: isAnnual ? '180' : '18',
      period: isAnnual ? 'per year' : 'per month',
      features: [
        'Additional Social Sets ($18/month each)',
        'Additional Users ($23/month each)',
        'Custom Analytics Reports',
        'Custom Domain',
        'Unlimited Scheduled Posts',
        'Bulk Scheduling',
        'Bio Link',
      ],
      variant: 'premium',
      handleClick: handleOnClick,
      isBusiness: false,
      buttonText: "Upgrade",
      titleColor:'text-[#A655F7]',
      priceColor:"text-[#38B2AC]", 
    },
    {
      title: 'Business',
      description:
        'For large organizations with extensive social media needs; unlimited posting, advanced analytics, priority support, and more.',
      price: isAnnual ? '500' : '50',
      period: isAnnual ? 'per year' : 'per month',
      features: [
        'Unlimited Social Sets',
        'Advanced Analytics',
        'Priority Support',
        'Custom Solutions',
        'Team Collaboration Tools',
        'API Access',
      ],
      variant: 'ghost',
      handleClick: handleBusinessClick,
      isBusiness: true,
      buttonText: "Upgrade",
    },
  ];

  return (
    <div className="bg-[#111827] text-white p-8 ">
      <h1 className="text-4xl font-bold mb-8 text-center">Pricing</h1>
      {/* <p className="mb-8 text-center">
        Start scheduling on our Free plan - no credit card required, or trial Premium for unlimited scheduling, multiple
        social sets & more.
      </p> */}
      <div className="flex items-center justify-center flex-wrap mb-8">
  <span className="mr-2">Monthly</span>
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
  </label>
  <span className="ml-2">Annually</span>
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
            period={card.period}
            features={card.features}
            variant={card.variant}
            handleClick={card.handleClick}
            isBusiness={card.isBusiness}
            buttonText={card.buttonText}
            userPlan={userPlan}
            titleColor={card.titleColor}
            priceColor={card.priceColor}
            />
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
