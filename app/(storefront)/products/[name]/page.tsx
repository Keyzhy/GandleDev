import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db"
import { notFound } from "next/navigation";

async function getData(productCategory: string){
    switch(productCategory){
        case "all": {
            const data = await prisma.product.findMany({
                select:{
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
                where: {
                    status: "publie",
                }
            });

            return {
                title: "Tous les produits",
                data: data,
            }
        } 
        case "bougies": {
            const data = await prisma.product.findMany({
                where: {
                    status: 'publie',
                    category:'bougies',
                },
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
            });

            return {
                title: 'Nos bougies',
                data: data,
            }
        } 
        case "fondants": {
            const data = await prisma.product.findMany({
                where: {
                    status: 'publie',
                    category:'fondants',
                },
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
            });

            return {
                title: 'Nos fondants',
                data: data,
            };
        }
        case "diffuseurs": {
            const data = await prisma.product.findMany({
                where: {
                    status: 'publie',
                    category:'desodorisants',
                },
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
            });

            return {
                title: 'Nos diffuseurs pour voiture',
                data: data,
            };
        } default: {
            return notFound()
        }
    }
}


export default async function CategoriesPage({params}: {params: {name : string}}){

    const {data, title} = await getData(params.name)
    return(
        <section>
            <h1 className="text-3xl font-semibold my-5 ml-10">{title}</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.map((item)=>(
                    <ProductCard item={item} key={item.id} />
                ))}

            </div>
        </section>
    )
}