import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import  LandingNavBar  from '@/components/landing-navbar'
import { LandingHero } from '@/components/landing-hero'
import LandingContent from '@/components/landing-content'

 function LandingPage() {
  return (
    <div className='h-full'>
      <LandingNavBar></LandingNavBar>
      <LandingHero></LandingHero>
      <LandingContent></LandingContent>
    </div>
  )
}

export default LandingPage;