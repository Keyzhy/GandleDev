"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links= [
    {
        name: "Accueil",
        href: "/",
    },
    {
        name: "Dashboard",
        href: "/dashboard",
    },
    {
        name: "Commandes",
        href: "/dashboard/orders",
    },
    {
        name: "Produits",
        href: "/dashboard/products",
    },
    {
        name: "Bannière",
        href: "/dashboard/banner",
    },

];

export function DashboardNavigation(){
    const pathname =usePathname();
    return(
        <> 
            {links.map((link)=> (
                <Link key={link.href} href={link.href} className={cn(link.href === pathname ? 'text-foreground' : 'text-muted-foreground hover:text-foreground')}>
                    {link.name}
                </Link>
            ))}
        </>
    )
}