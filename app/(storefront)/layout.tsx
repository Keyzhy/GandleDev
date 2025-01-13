import { type ReactNode } from "react";
import { Navbar } from "../components/storefront/Navbar";
import { Footer } from "../components/storefront/Footer";
import {Playfair_Display} from 'next/font/google';

import { TailwindIndicator } from "../components/storefront/TailwindIndicator";
import Header from "../components/storefront/Header";


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
        <div className="{playfair.className} pt-5 bg-background">
        <Header/>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
        <TailwindIndicator/>
        <Footer/>
        </div>
        </>
    )
}