import { addItem } from "@/app/actions";
import { ShoppingBagButton } from "@/app/components/SubmitButtons";
import { FeaturedProducts } from "@/app/components/storefront/FeaturedProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import prisma from "@/app/lib/db";

import { Leaf, ShieldCheck, StarIcon, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QuantitySelector } from "@/app/components/storefront/QuantitySelector";
import Link from "next/link";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      composition: true,
      tempscombustion: true,
      contenance: true,
      parfum: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

interface Params {
  id: string;
}

export default async function ProductIdRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  noStore();
  const { id } = await params;
  const data = await getData(id);
  const addProducttoShoppingCart = addItem.bind(null, data.id);
  return (
    <>
   <div className="sm:px-24 mt-[140px]">
   <div className="flex items-center text-sm text-gray-500 gap-1">
    <Link href="/" className="hover:text-gray-700 flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
      </svg>
      Accueil
    </Link>

    <span className="mx-1">›</span>

    <Link href="/products/all" className="hover:underline hover:text-gray-700">
      Tous les produits
    </Link>

    <span className="mx-1">›</span>

    <span className="text-gray-700 font-medium truncate">{data.name}</span>
  </div>
</div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6 sm:px-24">
        
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 text-gray-900">{data.price} € </p>
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500" />
          </div>
          <p className="text-base text-gray-700 mt-6">{data.description}</p>

          <Accordion type="multiple" className="mt-6">
            <AccordionItem value="item-1">
              <AccordionTrigger>Contenance: </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700">
                {" "}
                {data.contenance}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Temps de combustion </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700">
                {" "}
                {data.tempscombustion}{" "}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Caractère </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700">
                {" "}
                {data.parfum}{" "}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Composition et informations réglementaires{" "}
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700">
                {" "}
                {data.composition}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <p className="text-base text-gray-700 mt-6">Parfum: {data.parfum}</p>

          <form action={addProducttoShoppingCart}>
            <QuantitySelector />
            <div className="mt-4">
              <ShoppingBagButton />
            </div>
          </form>
          <div className="mt-6 flex gap-6 text-sm text-gray-600">
  <div className="flex items-center gap-2">
    <Truck className="w-4 h-4 text-[#BFA48C]" />
    <span>Livraison 48h</span>
  </div>
  <div className="flex items-center gap-2">
    <Leaf className="w-4 h-4 text-[#BFA48C]" />
    <span>100% cire végétale</span>
  </div>
  <div className="flex items-center gap-2">
    <ShieldCheck className="w-4 h-4 text-[#BFA48C]" />
    <span>Paiement sécurisé</span>
  </div>
</div>

        </div>

      </div>
      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
