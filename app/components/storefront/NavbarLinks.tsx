"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const navbarLinks = [
    {
        id: 0,
        name: 'Acceuil',
        href: "/",
    },
    {
        id:1,
        name:"Tous les produits",
        href:"/products/all",
    },
    {
        id:2,
        name:"Bougies",
        href:"/products/bougies",
    },
    {
        id:3,
        name:"Fondants",
        href:"/products/fondants",
    },
    {
        id:4,
        name:"Diffuseurs",
        href:"/products/diffuseurs"
    },
    {
        id:5,
        name:"Contact",
        href:"/contact"
    }
]



export function NavbarLinks(){
    const location = usePathname()
    return (
        <div className="hidden md:flex justify-center items-center gap-x-12 ml-24">
            {navbarLinks.map((item)=>(
                <Link 
                    href={item.href} 
                    key={item.id} 
                    className={cn(location === item.href 
                    ? 'bg-muted'
                    : "hover:bg-muted hover:bg-opacity-75", "group p-2 font-medium rounded-md")}>
                    {item.name}
                </Link>
            ))}
        </div>
    )
}