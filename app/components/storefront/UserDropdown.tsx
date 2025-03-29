import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {LogoutLink} from '@kinde-oss/kinde-auth-nextjs/components';
import { User } from "lucide-react";
import Link from "next/link";

interface iAppProps {
    email: string;
    name: string;
    userImage: string;
}

export function UserDropdown({email,name,userImage}: iAppProps){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                    <User className="H-6 w-6 sm:h-7 sm:w-7 hover:text-gray-700"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="flex flex-col space-y-2">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    
                    <Link href={"/orders"}>Mes commandes</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <LogoutLink>Se déconnecter</LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}