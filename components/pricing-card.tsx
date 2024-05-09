import React from 'react';
import { Button } from './ui/button';
import { useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Check } from 'lucide-react';
const PricingCard = ({ title, description, price, period, features, variant, handleClick, mb, buttonText, userPlan, rota, titleColor, priceColor, priceId}: any) => {
  const { user } = useUser();
  const isPro = userPlan && userPlan.startsWith('pro');
  const planType = isPro ? 'pro' : 'business';

  return (
    <div className={cn(`bg-[#ffff] shadow-xl rounded-2xl p-8 ${variant === 'premium' ? 'border-gradient' : ''} ${mb}`)}>
      <h2 className={cn("text-2xl font-bold mb-4", titleColor)}>{title}</h2>
      <p className="mb-4 h-[110px] text-[#333]">{description}</p>
      <p className={cn("text-4xl font-bold mb-4", priceColor)}>${price}</p>
      <p className="mb-4">{period}</p>
      <p className="mb-4">Includes:</p>
      <div className="h-[250px]">
        <p className="font-bold mb-2 text-[#000]">{title}:</p>
        <ul className="list-disc list-inside mb-4 text-[#333]">
          {features.map((feature: any, index: any) => (
            <li key={index} className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500"/><span>{feature}</span></li>
            ))}
        </ul>
      </div>
      <div className="mb-4 flex justify-center">
      <Button
            variant={variant}
            className={`text-white px-4 py-2 rounded-full mb-4${variant === 'outline' ? 'bg-[#2B3945]' : ''} w-[250px]`}
            onClick={()=>handleClick(priceId)}
            >
           Buy Now
          </Button>
      </div>
    </div>
  );
};

export default PricingCard;
