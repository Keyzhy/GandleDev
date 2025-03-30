import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/fadeIn';
import { PaintBucket } from 'lucide-react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-24 py-16">
      <div className="relative grid gap-16 lg:grid-cols-2 items-center">
        
        {/* Texte */}
        <div className="space-y-8">
          <h2 className="text-sm font-medium uppercase tracking-wider text-[#BFA48C]">
            À propos - Bougies artisanales
          </h2>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Chaque création est <span className="text-[#BFA48C]">unique</span> et façonnée à la main.
          </h1>

          <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
            <p>
              Toutes nos bougies sont confectionnées à la main avec amour et précision, en utilisant uniquement des ingrédients naturels et durables.
            </p>
            <p>
              Chaque pièce est le fruit d’un savoir-faire artisanal, alliant esthétique, authenticité et engagement écologique pour une expérience sensorielle unique.
            </p>
          </div>

          <Button size="lg" className="px-6 py-3 rounded-xl shadow-md">
            En savoir plus
          </Button>
        </div>

        {/* Image + minicarte en relief */}
        <div className="relative h-[500px]">
          {/* Image */}
          <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/Hero.jpeg"
              alt="Artisan créant une bougie"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Mini carte flottante */}
          <FadeIn delay={0.2}>
  <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md rounded-2xl bg-white/90 p-6 text-center shadow-xl backdrop-blur-sm border border-[#BFA48C]/20">
    <div className="mb-4 flex justify-center">
      <PaintBucket className="h-10 w-10 text-[#BFA48C]" />
    </div>
    <h3 className="text-xl font-semibold text-[#BFA48C] mb-2">
      Confectionné avec soin
    </h3>
    <p className="text-sm text-gray-700 leading-relaxed">
      Chaque bougie est minutieusement coulée et décorée à la main, pour une finition élégante et authentique.
    </p>
  </div>
</FadeIn>
        </div>
      </div>
    </section>
  );
}
