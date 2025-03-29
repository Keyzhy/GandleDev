import { type ReactNode } from "react";

import { Footer } from "../components/storefront/Footer";
import {Playfair_Display} from 'next/font/google';

import { TailwindIndicator } from "../components/storefront/TailwindIndicator";
import Header from "../components/storefront/Header";
import { Toaster } from "sonner";


const playfair = Playfair_Display({
    subsets: ['latin'],
});


export default function StoreFrontLayout ({
    children,
    }:{
        children: ReactNode;
    }) {
    return (
        <>
        <div className="{playfair.className}bg-background">
        <Header/>
        
        <main className="">{children}</main>
        <TailwindIndicator/>
        <Footer/>
        <Toaster/>
        </div>
        </>
    )
}