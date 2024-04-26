import React from 'react';
import { Button } from './ui/button';
import { useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const PricingCard = ({ title, description, price, period, features, variant, handleClick, mb, buttonText, userPlan, rota, titleColor, priceColor}: any) => {
  const { user } = useUser();
  const isPro = userPlan && userPlan.startsWith('pro');
  const planType = isPro ? 'pro' : 'business';

  return (
    <div className={cn(`bg-[#1E293B] p-8 ${variant === 'premium' ? 'border-gradient' : ''} ${mb}`)}>
      <h2 className={cn("text-2xl font-bold mb-4", titleColor)}>{title}</h2>
      <p className="mb-4 h-[110px] text-[#CBD5E0]">{description}</p>
      <p className={cn("text-4xl font-bold mb-4", priceColor)}>${price}</p>
      <p className="mb-4">{period}</p>
      <p className="mb-4">Includes:</p>
      <div className="h-[250px]">
        <p className="font-bold mb-2 text-[#CBD5E0]">What you get with {title}:</p>
        <ul className="list-disc list-inside mb-4 text-[#CBD5E0]">
          {features.map((feature: any, index: any) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4 flex justify-center">
        {user? (userPlan ? (
          <Button
            variant={variant}
            className={`text-white px-4 py-2 rounded-full mb-4${variant === 'outline' ? 'bg-[#2B3945]' : ''} w-[250px]`}
            onClick={handleClick}
            >
            Manage Subscription 
          </Button>
        ) : (

          <Button
            variant={variant}
            className={`text-white px-4 py-2 rounded-full mb-4${variant === 'outline' ? 'bg-[#2B3945]' : ''} w-[250px]`}
            onClick={handleClick}
            
            >
            {buttonText}
          </Button>
        )):
        <Link
        href={'/sign-up'}
        >
        <Button
          variant={variant}
          className={`text-white px-4 py-2 rounded-full mb-4${variant === 'outline' ? 'bg-[#2B3945]' : ''} w-[250px]`}

          >
          {buttonText}
        </Button>
        </Link>
        }
      </div>
    </div>
  );
};

export default PricingCard;
