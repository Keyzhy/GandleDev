import { addItem } from "@/app/actions";
import { ShoppingBagButton } from "@/app/components/SubmitButtons";
import { FeaturedProducts } from "@/app/components/storefront/FeaturedProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import prisma from "@/app/lib/db";

import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

interface Params{
  id: string;
}

export default async function ProductIdRoute({
  params,
}:{
  params: Promise<Params>;
}) {
  noStore();
  const {id} = await params;
  const data = await getData( id);
  const addProducttoShoppingCart = addItem.bind(null, data.id);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
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
            <StarIcon className="h-4 w-4 text-yellow-500"/>
          </div>
          <p className="text-base text-gray-700 mt-6">{data.description}</p>

          <Accordion type="multiple" className="mt-6" >
            <AccordionItem value="item-1">
              <AccordionTrigger>Contenance: </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700"> {data.contenance}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Temps de combustion </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700"> {data.tempscombustion} </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Caractère </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700"> {data.parfum} </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Composition et informations réglementaires </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700"> {data.composition}</AccordionContent>
            </AccordionItem>
          </Accordion>

          
          <p className="text-base text-gray-700 mt-6">Parfum: {data.parfum}</p>

          <form action={addProducttoShoppingCart}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>
      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
      