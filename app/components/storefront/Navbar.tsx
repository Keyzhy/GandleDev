import Image from "next/image";
import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag, Settings } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";

// ShadCN Components
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetClose } from "@/components/ui/sheet";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="relative rounded-2xl w-full z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={80} height={80} />
        </Link>
        {/* Desktop links */}
        <div className="hidden sm:flex items-center ml-10">
          <NavbarLinks />
        </div>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex items-center">
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

      {/* Mobile Sidebar */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2">
              <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-800"></div>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-4 bg-white">
            <SheetHeader>
              <SheetClose asChild>
              </SheetClose>
              
            </SheetHeader>
            <div className="mt-6">
              {user ? (
                <>
                  {(user.email === "yannisboulaid1@gmail.com" || user.email === "domecq.raphael@gmail.com") && (
                    <Link href="/dashboard" className="block py-2 text-gray-800 hover:text-gray-900">
                      <Settings className="h-6 w-6 text-red-500 group-hover:text-red-600" />
                    </Link>
                  )}
                  <Link href="/bag" className="block py-2 text-gray-800 hover:text-gray-900">
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
                <>
                  <LoginLink>
                    <Button variant="ghost" className="w-full text-left">
                      Se connecter
                    </Button>
                  </LoginLink>
                  <RegisterLink>
                    <Button variant="ghost" className="w-full text-left">
                      Créer un compte
                    </Button>
                  </RegisterLink>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
