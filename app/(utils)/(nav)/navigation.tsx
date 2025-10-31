"use client"

import Link from "next/link"

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
    const logged = false

  return (
    <div className="w-[100%] flex justify-center align-center p-[10px] bg-gray-400/40">
        <NavigationMenu>
            <NavigationMenuList className="flex-wrap">
                {
                    logged && <div>

                    </div>
                }
                {
                    !logged && <div>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/login">Login</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/register" className="mx-3">Register</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                    </div>
                }
            </NavigationMenuList>
        </NavigationMenu>
    </div>
  )
}