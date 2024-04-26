"use client"
import React from 'react'
import { Sheet, SheetTrigger, SheetContent} from './ui/sheet'
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import LandingSideBar from './landing-sidebar';

export default function MobileLandingMenu() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    
    <div>
      <Sheet>
          {isMounted &&(
            <SheetTrigger>
              <Button>
                <Menu/>
              </Button>
            </SheetTrigger>
          )}

           <SheetContent side={'right'} className='p-0' closeIconColor='white'>
            <LandingSideBar></LandingSideBar>
        </SheetContent>
      </Sheet>
    </div>
  )
}
