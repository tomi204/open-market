"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "./ModeToggle"
import {useTranslations} from 'next-intl'
import LanguageToggle from "./LanguageToggle"
import { MainNav } from "./main-nav"
import { UserNav } from "./user-nav"


export function NavBarFinal() {
  const t = useTranslations('Navbar');

  return (
    <div className="border-b">
    <div className="flex h-16 items-center px-4">
      <MainNav className="mx-6" />
      <div className="ml-auto flex items-center space-x-4">
        <UserNav />
        <LanguageToggle />
        <ModeToggle />
      </div>
    </div>
</div>
    
  )
}

