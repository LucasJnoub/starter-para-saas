"use client";
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetClose, SheetTrigger, SheetOverlay } from './ui/sheet';
import SideBar from './sidebar';

interface MobileSideBarProps {
  apiLimitCount: number;
  isPro: boolean;
}

export default function MobileSideBar({ apiLimitCount = 0, isPro = false }: MobileSideBarProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

   const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={handleToggleSidebar}>
      {isMounted && (
        <SheetTrigger>
          <Button variant={'ghost'} size={'icon'} className='md:hidden'>
            <Menu />
          </Button>
        </SheetTrigger>
      )}
        <SheetClose onClick={handleCloseSidebar} />
      <SheetContent side={'left'} className='p-0' closeIconColor='white'>
        <SideBar isPro={isPro} apiLimitCount={apiLimitCount}  onMenuItemClick={handleToggleSidebar} />
      </SheetContent>
      <SheetOverlay onClick={handleCloseSidebar} />
    </Sheet>
  );
}