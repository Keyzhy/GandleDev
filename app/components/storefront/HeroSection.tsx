import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fadeIn";
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
        src="/Hero.jpg"
        alt="Hero Image"
        className="pointer-events-none select-none object-cover object-center"
      />

      {/* Overlay foncé léger pour meilleure lisibilité */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Contenu texte aligné avec la navbar */}
      <div className="absolute z-20 top-28 sm:top-64 w-full px-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-center sm:justify-start">
          <FadeIn>
            <div className="bg-white/50 backdrop-blur-md px-8 py-6 rounded-2xl shadow-xl inline-block max-w-lg">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Bienvenue dans <br /> notre boutique
              </h1>
              <p className="text-base md:text-lg text-gray-800 mb-6 leading-relaxed">
                Découvrez nos créations uniques et parfumées, pensées pour
                embellir vos intérieurs avec douceur.
              </p>
              <Button className="px-6 py-3 rounded-xl shadow-md">
                <Link href="/products/all">Découvrir</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
