import Link from "next/link";
import Image from "next/image";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession, LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Settings, ShoppingBag } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";

export default async function MainNav() {

    const { getUser } = getKindeServerSession();
      const user = await getUser();
    
      const cart: Cart | null = await redis.get(`cart-${user?.id}`);
      const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  return (
    <div className="hidden md:flex">
        
        <Link href="/" className="flex items-center  ml-12">
          <Image src="/logo.png" alt="logo" width={80} height={80} />
        </Link>

        <nav className="flex items-center gap-4 lg:gap-6 ml-28">
            <NavbarLinks />
        </nav>

        <div className="hidden sm:flex items-center ml-10">
        {user ? (
          <>
            {(user.email === "yannisboulaid1@gmail.com" || user.email === "domecq.raphael@gmail.com") && (
              <Link href="/dashboard" className="group p-2 flex items-center mr-2">
                <Settings className="h-6 w-6 text-red-500 group-hover:text-red-600" />
              </Link>
            )}
            <Link href="/bag" className="group p-2 flex items-center mr-2">
              <ShoppingBag className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{total}</span>
            </Link>
            <UserDropdown
              email={user.email as string}
              name={user.given_name as string}
              userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}
            />
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
    </div>
  )
}
