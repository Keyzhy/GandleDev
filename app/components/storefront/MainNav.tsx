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
      <div className="fixed top-6 left-0 right-0 z-50 bg-white shadow-md rounded-2xl max-w-6xl px-6 mx-auto">
        <div className="hidden md:flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center ml-2">
            <Image src="/logo.png" alt="logo" width={80} height={80} />
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-4 lg:gap-6">
            <NavbarLinks />
          </nav>

          {/* User Actions */}
          <div className="hidden sm:flex items-center space-x-2">
            {user ? (
              <>
                {(user.email === "yannisboulaid1@gmail.com" ||
                  user.email === "domecq.raphael@gmail.com") && (
                  <Link href="/dashboard" className="group p-2 flex items-center">
                    <Settings className="h-6 w-6 text-red-500 group-hover:text-red-600" />
                  </Link>
                )}
                <Link href="/bag" className="group p-2 flex items-center">
                  <ShoppingBag className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {total}
                  </span>
                </Link>
                <UserDropdown
                  email={user.email as string}
                  name={user.given_name as string}
                  userImage={
                    user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
                  }
                />
              </>
            ) : (
              <div className="flex items-center space-x-2">
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
      </div>
    );
}
