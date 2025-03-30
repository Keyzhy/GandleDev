import Image from "next/image";
import Link from "next/link";
import bougie from "@/public/bougie.jpg";
import fondant from "@/public/fondant.webp";
import diffuseur from "@/public/diffuseur.jpg";
import { FadeIn } from "@/components/ui/fadeIn";

const categories = [
  {
    name: "Bougies",
    description: "Créez une ambiance chaleureuse",
    href: "/products/bougies",
    image: bougie,
    span: "row-span-2",
  },
  {
    name: "Fondants",
    description: "Des parfums fondants à volonté",
    href: "/products/fondants",
    image: fondant,
    span: "",
  },
  {
    name: "Diffuseurs pour voiture",
    description: "Parfumez vos trajets",
    href: "/products/diffuseurs",
    image: diffuseur,
    span: "",
  },
];

export function CategoriesSelection() {
  return (
    <div className="py-16 max-w-6xl mx-auto px-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Nos catégories de produits
        </h2>
        <Link
          href="/products/all"
          className="text-sm font-semibold text-primary hover:text-primary/80"
        >
          Tous les produits &rarr;
        </Link>
      </div>

      {/* Grid */}
      <FadeIn>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 auto-rows-[280px] sm:auto-rows-[200px] lg:auto-rows-[240px]">
        {categories.map((category, index) => (
          <Link
            href={category.href}
            key={index}
            className={`group relative overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105 ${
              category.name === "Bougies" ? "sm:row-span-2 sm:h-full" : ""
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 group-hover:opacity-70 transition-opacity" />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-end p-6">
              <h3 className="text-white text-lg font-semibold">
                {category.name}
              </h3>
              <p className="mt-1 text-sm text-white">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
      </FadeIn>
    </div>
  );
}
