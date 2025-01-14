import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
      <div className="relative w-full h-screen z-0">
        {/* Image de fond */}
        <Image 
          priority
          fill
          quality={100}
          src={"/Hero.jpg"}
          alt="Hero Image"
          className="pointer-events-none select-none object-cover object-center"
        />
  
        {/* Contenu texte */}
        <div className="absolute z-20 top-28 sm:top-64 w-full">
          <div className="max-w-6xl mx-auto px-6"> {/* Alignement identique à la navbar */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-lg">
              Bienvenue dans notre boutique
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-lg">
              Découvrez notre collection exclusive et profitez d&apos;offres exceptionnelles.
            </p>
            <Button className="px-6 py-3">
              <Link href={'/products/all'}> Découvrir</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  