import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobileSideBar from './mobile-sidebar'
import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
export default async function NavBar() {
  const apiLimitCount = (await getApiLimitCount()) || 0;
  const isPro = await checkSubscription();
  return (
    <div className='flex items-center p-4'>
      <MobileSideBar isPro={isPro} apiLimitCount={apiLimitCount}></MobileSideBar>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl='/'></UserButton>
      </div>
    </div>
  )
}
