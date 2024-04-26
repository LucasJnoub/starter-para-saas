  "use client"
  import React from 'react'
  import { Button } from './ui/button'
  import { Zap } from "lucide-react";
  import axios from 'axios';
  import { useState } from 'react';

  interface SubscriptionSButtonProps {
    isPro:boolean
  }

  export default function SubscriptionSButton({
    isPro,
  }: SubscriptionSButtonProps) {
    const [loading, setLoading] = useState(false);
    const onClick = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/stripe');
        window.location.href = response.data.url;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    return (
      <Button
        variant={isPro ? 'default' : 'premium'}
        size={'lg'}
        className="w-[312px]"
        onClick={onClick}
        disabled={loading}
      >
        {isPro ? 'Manage subscription' : 'Subscribe to Genius Pro'}
        {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
      </Button>
    );
  }
