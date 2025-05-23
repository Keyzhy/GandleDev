import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu, Settings, ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession, LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
  
export default async function MobileNav() {

    const { getUser } = getKindeServerSession();
      const user = await getUser();
    
      const cart: Cart | null = await redis.get(`cart-${user?.id}`);
      const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  return (
    <div className="md:hidden container flex items-center bg-white shadow-md rounded-2xl px-4 py-2 mx-auto">
        <Link href="/" className="flex items-center  justify-center flex-auto">
          <Image src="/logo.png" alt="logo" width={80} height={80} />
        </Link>
        <Sheet>
            <SheetTrigger className="flex  items-center justify-end ">
                <Menu/>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
               
            <div className=" flex items-center ml-2">
            {user ? (
          <>
            
            <UserDropdown
              email={user.email as string}
              name={user.given_name as string}
              userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}
            />
            
            <Link href="/bag" className="group p-2 flex items-center ml-4">
              <ShoppingBag className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{total}</span>
            </Link>
            
            {(user.email === "yannisboulaid1@gmail.com" || user.email === "domecq.raphael@gmail.com") && (
              <Link href="/dashboard" className="group p-2 flex items-center mr-2">
                <Settings className="h-4 w-4 text-red-500 group-hover:text-red-600" />
              </Link>
            )}
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button variant="ghost" asChild>
              <LoginLink>Se connecter</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200"></span>
            <Button variant="ghost" asChild>
              <RegisterLink>Créer un compte</RegisterLink>
            </Button>
          </div>
        )}
      </div>
      <NavbarLinks/>
            </SheetContent>
        </Sheet>
    </div>
  )
}
