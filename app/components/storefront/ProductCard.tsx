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



export function ProductCard({item}: iAppProps){
    
    return(
        <div className="rounded-2xl w-full max-w-xs sm:w-80 h-auto mt-3 relative bg-white shadow-lg ">

            
            <Carousel className="w-full mx-auto">
                <CarouselContent>
                    
                    {item.images.map((item, index) =>(
                        <CarouselItem key={index}>
                            <div className="relative h-[380px]">
                                <Image src={item} alt="Product Image" fill className="object-cover object-center w-full h-full rounded-t-2xl"/>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                
                <CarouselPrevious className="ml-16"/>
                <CarouselNext className="mr-16"/>
            </Carousel>
            <Link href={`/product/${item.id}`}>
            <div className="flex justify-between items-center mt-2">
            
                <h1 className="font-semibold text-xl pl-2">{item.name}</h1>
            
                <h3 className="inline-flex  items-center rounded-md bg-[]/10 px-2 py-1 text-s font-medium text-primary ring-1 ring-primary/10">{item.price} €</h3>
            </div>
            <div className="m-2 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500"/>
          </div>
            <Link href={`/product/${item.id}`}>
            <span className=" absolute top-2 right-2 bg-[#BFA48C] text-white rounded-lg cursor-pointer">
                <Plus className="w-10 h-10"/>
            </span>
            </Link>
            </Link>
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