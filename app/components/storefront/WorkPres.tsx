import { Button } from '@/components/ui/button'
import { PaintBucket } from 'lucide-react'

import Image from "next/image"
import Link from 'next/link'

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-7xl px-10 sm:px-24 py-12 md:py-16 lg:py-24">
      <div className="relative">
        {/* Header */}
        <h2 className="mb-4 text-lg font-medium uppercase tracking-wide text-[#BFA48C]">
          A propos - Bougies artisanales
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            {/* Main Title */}
            <h1 className="text-4xl font-bold  md:text-5xl lg:text-6xl">
              Chaque création est unique !
            </h1>

            {/* Main Text */}
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. In rem hic maiores repudiandae tenetur doloremque. 
                Illum iste voluptas repellendus ipsam minima consectetur possimus, explicabo distinctio consequatur ea atque. 
                Ab, ratione?
              </p>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. In rem hic maiores repudiandae tenetur doloremque. 
                Illum iste voluptas repellendus ipsam minima consectetur possimus, explicabo distinctio consequatur ea atque. 
                Ab, ratione?Illum iste voluptas repellendus ipsam minima consectetur possimus, explicabo distinctio consequatur ea atque. 
                Ab, ratione?
              </p>
            </div>

            {/* Button */}
            <Button size="xl" className="px-6 py-3">
              En savoir plus
            </Button>
          </div>

          <div className="relative space-y-8">
            {/* Main Image */}
            <div className="relative h-[400px] overflow-hidden rounded-2xl">
              <Image
                src="/Hero.jpeg"
                alt="Artisan working with epoxy resin"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Card */}
            <div className="relative mx-auto max-w-md -translate-y-24 rounded-xl bg-white/95 p-6 text-center shadow-lg backdrop-blur">
              <div className="mb-4 flex justify-center">
                <PaintBucket className="h-12 w-12 text-[#BFA48C]" />
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-[#BFA48C]">
                Confectionné avec soin
              </h3>
              <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. In rem hic maiores repudiandae tenetur doloremque. 
                Illum iste voluptas repellendus ipsam minima consectetur possimus, explicabo distinctio consequatur ea atque. 
                Ab, ratione?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

