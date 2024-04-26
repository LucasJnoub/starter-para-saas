import Heading from '@/components/heading'
import SubscriptionSButton from '@/components/subscription-button';
import { checkSubscription } from '@/lib/subscription';
import { Settings } from 'lucide-react'
import React from 'react'

export default async function SettingsPage() {
  const isPro = await checkSubscription();
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage Account Settings"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"        
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm flex flex-col gap-2">
          {isPro? 'You are currently subscribed to Genius Pro.' : 'You are currently not subscribed to Genius Pro.'}
          <SubscriptionSButton isPro={isPro} />
        </div>  
      </div> 
    </div>
  );
}
