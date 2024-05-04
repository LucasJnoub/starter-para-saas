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
      router.push("/sign-up");
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
      description: 'Experimente o BgPretty e crie backgrounds de produtos com IA para até 10 imagens por mês. Sem necessidade de cartão de crédito.',
      price: 0,
      period: 'por mês',
      features: ['10 Backgrounds de IA', 'Acesso a templates básicos', 'Suporte via fórum', 'Visualizações de galeria e lista'],
      variant: 'ghost',
      handleClick: handleFreeClick,
      buttonText: user ? "Ir para o dashboard" : "Inscrever-se",
    },
    {
      title: 'Pro',
      description: 'Para profissionais e pequenas equipes; criação ilimitada de backgrounds, mais templates e suporte.',
      price: isAnnual ? '180' : '18',
      period: isAnnual ? 'por ano' : 'por mês',
      features: [
        'Templates Premium (R$24/mês cada)',
        'Usuários Adicionais (R$30/mês cada)',
        'Relatórios de Analytics',
        'Domínio Personalizado',
        'Posts Agendados Ilimitados',
        'Agendamento em Massa',
        'Link na Bio',
      ],
      variant: 'premium',
      handleClick: handleOnClick,
      isBusiness: false,
      buttonText: "Atualizar",
      titleColor: 'text-[#A655F7]',
      priceColor: "text-[#38B2AC]",
    },
    {
      title: 'Business',
      description: 'Para organizações maiores com necessidades extensas de mídia social; postagem ilimitada, analytics avançado, suporte prioritário e mais.',
      price: isAnnual ? '500' : '50',
      period: isAnnual ? 'por ano' : 'por mês',
      features: [
        'Conjuntos de Social Sets Ilimitados',
        'Analytics Avançado',
        'Suporte Prioritário',
        'Soluções Personalizadas',
        'Ferramentas de Colaboração em Equipe',
        'Acesso à API',
      ],
      variant: 'ghost',
      handleClick: handleBusinessClick,
      isBusiness: true,
      buttonText: "Atualizar",
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
