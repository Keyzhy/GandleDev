import prisma from "@/app/lib/db"
import { LoadingProductCard, ProductCard } from "./ProductCard";
import { Suspense } from "react";
import {unstable_noStore as noStore} from "next/cache";

async function getData(){
    const data = await prisma.product.findMany({
        where:{
            status:'publie',
            isFeatured: true,
        },
        select:{
            id: true,
            name:true,
            description:true,
            images: true,
            price: true
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 3
    });

    return data;
}


export  function FeaturedProducts(){
    return(
        <>
            <div className="max-w-6xl mx-auto py-7 ">
            <h2 className="text-2xl font-extrabold tracking-tight">Nouveautés</h2>
            <Suspense fallback={<LoadingRows/>}>
            <LoadFeaturedProducts />
            </Suspense>
            </div>
        </>
    )
}

async function LoadFeaturedProducts(){
    noStore();
    const data = await getData()
    return(
        <div className="max-w-6xl mx-auto "> 
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5  ">
                {data.map((item)=>(
                    <ProductCard key={item.id} item={item}/>
                ))}

        </div>
        </div>
    )
}

function LoadingRows(){
    return(
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <LoadingProductCard/>
        <LoadingProductCard/>
        <LoadingProductCard/>
    </div>
    );
}