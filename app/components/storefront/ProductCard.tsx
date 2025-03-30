import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import {Plus, StarIcon} from 'lucide-react';

interface iAppProps{
    item:{
        id: string;
        name: string;
        description: string;
        price: number;
        images: string[];
    }
}



export function ProductCard({ item }: iAppProps) {
    return (
        <div className="rounded-2xl w-full max-w-xs sm:w-80 h-auto mt-3 relative bg-white shadow-md hover:shadow-xl transition-shadow duration-300">

        {/* Carousel */}
        <Carousel className="w-full mx-auto">
          <CarouselContent>
            {item.images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[380px] overflow-hidden rounded-t-2xl">
                  <Image
                    src={img}
                    alt={item.name}
                    fill
                    className="object-cover object-center transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>
  
        {/* + Icon */}
        <Link href={`/product/${item.id}`}>
          <span className="absolute top-2 right-2 bg-[#BFA48C] text-white rounded-lg cursor-pointer shadow-md hover:scale-105 transition-transform">
            <Plus className="w-10 h-10 p-2" />
          </span>
        </Link>
  
        {/* Text content */}
        <div className="p-4">
          <Link href={`/product/${item.id}`}>
            <div className="flex justify-between items-center mb-2">
              <h1 className="font-semibold text-lg text-gray-800">{item.name}</h1>
              <span className="rounded-full bg-[#BFA48C]/10 text-[#BFA48C] text-sm font-medium px-3 py-1">
                {item.price} €
              </span>
            </div>
  
            <div className="flex items-center gap-1 mb-2">
              {[...Array(4)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              ))}
              <StarIcon className="h-4 w-4 text-yellow-500" />
            </div>
  
            <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
          </Link>
        </div>
      </div>
    );
  }
  

export function LoadingProductCard(){
    return(
        <div className="flex flex-col">
            <Skeleton className="w-full h-[380px]"/>
            <div className="flex flex-col mt-2 gap-y-2">
                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-6 w-full"/>
            </div>
            <Skeleton className="w-full h-10 mt-5"/>
        </div>
    )
}