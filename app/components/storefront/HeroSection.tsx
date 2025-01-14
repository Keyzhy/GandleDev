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
      <div className="absolute top-28 left-10 sm:top-64 sm:left-24  max-w-lg p-8 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Bienvenue dans notre boutique
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Découvrez notre collection exclusive et profitez d&aposoffres exceptionnelles.
        </p>
        <Button className="px-6 py-3">
        <Link href={'/products/all'}> Découvrir</Link>
        </Button>
      </div>
    </div>
  );
}
