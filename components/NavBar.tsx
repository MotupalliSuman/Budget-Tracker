"use client"

import React, { useState } from 'react'
import Logo, { LogoMobile } from './Logo'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import { ThemeSwitcherBtn } from './ThemeSwitcherBtn'
import { Menu } from 'lucide-react'
import { SheetTrigger ,Sheet, SheetContent} from './ui/sheet'

const NavBar = () => {
  return (
    <div>
        <DecktopNavbar/>
        <MobileNavbar />
    </div>
  )
}

const items =[
    {label:"Dashboard", link:"/"},
    {label:"Transctions",link:"/transactions"},
    {label:"manage",link:"/manage"},
];

        function MobileNavbar() {
            const [isOpen, setIsOpen] = useState(false);
          
            return (
              <div className='block border-separate border-b bg-background md:hidden'>
                <nav className='container flex px-8 justify-between items-center'>
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                      <Button variant={"ghost"} size={"icon"}>
                        <Menu />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className='w-5/6 sm:[w-540px]' side="left">
                      <LogoMobile />
                      <div className='flex flex-col gap-1 pt-4'>
                        {items.map((item) => (
                          <NavbarItem
                            key={item.label}
                            link={item.link}
                            label={item.label}
                            onClick={() => setIsOpen(false)}
                          />
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                  <div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
                    <LogoMobile />
                  </div>
                  <div className='flex items-center gap-2'>
                    <ThemeSwitcherBtn />
                    <UserButton afterSignOutUrl="/sign-in" />
                  </div>
                </nav>
              </div>
            );
          }


function DecktopNavbar(){
    return (
        <div className=' hidden border-separate border-b bg-background md:block'>
            <nav className=' container flex items-center justify-between px-8'>
                <div className=' flex h-[80px] min-h-[60px] items-center gap-x-4'>
                    <Logo/>
                    <div className=' h-full flex'>
                        {items.map((item)=>(
                            <NavbarItem key={item.label} link={item.link} label={item.label} />
                        ))}
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                <ThemeSwitcherBtn />
                <UserButton afterSignOutUrl="/sign-in" />

                 </div>

            </nav>
            
        </div>
    );
}

function NavbarItem({link,label}:{link:string; label:string; onClick?: () => void;}){
    const pathname =usePathname();
    const isActive =pathname === link;

    return (
        <div className='relative flex items-center'>
           <Link href={link} className={cn(buttonVariants({variant:"ghost"}), "w-full justify-start text-lg text-muted-foreground hover:text-foreground",isActive && "text-foreground")}>{label}</Link>
           {isActive && (<div className='absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block'/>)}
        </div>
    );

}

export default NavBar