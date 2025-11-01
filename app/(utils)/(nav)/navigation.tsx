"use client"

import Link from "next/link"
import Image from 'next/image'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function Navigation() {
    const logged = true

  return (
    <div className="w-full flex justify-center align-center p-[0px] 
    bg-transparent bg-gradient-to-br from-blue-700 to-green-700 text-black focus-visible:ring-green-600/20">
        <NavigationMenu className="w-full">
            { logged &&
            <NavigationMenuList className="min-w-[80vw] flex justify-between items-center">
                        <NavigationMenuItem>
                            <Image
                                src="/chrismarketlogo.png" // caminho relativo à pasta public/
                                alt="Descrição da imagem"
                                width={100}
                                height={50}
                                className="bg-transparent p-0 m-0"
                                priority // (opcional) carrega primeiro
                            />
                        </NavigationMenuItem>
                        <NavigationMenuItem className="flex gap-3">
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/cart">Cart</Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/market" >Market</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>      
            </NavigationMenuList>
            }


            { !logged &&
            <NavigationMenuList className="min-w-[80vw] flex justify-between items-center">
                        <NavigationMenuItem>
                            <Image
                                src="/chrismarketlogo.png" // caminho relativo à pasta public/
                                alt="Descrição da imagem"
                                width={100}
                                height={50}
                                className="bg-transparent p-0 m-0"
                                priority // (opcional) carrega primeiro
                            />
                        </NavigationMenuItem>
                        <NavigationMenuItem className="flex gap-3">
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/login">Login</Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/register" >Register</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>      
            </NavigationMenuList>
            }
        </NavigationMenu>
    </div>
  )
}