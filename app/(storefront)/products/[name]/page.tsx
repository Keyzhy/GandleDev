import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productCategory: string) {
    switch (productCategory) {
        case "all": {
            const data = await prisma.product.findMany({
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
                where: {
                    status: "publie",
                },
            });

            return {
                title: "Tous les produits",
                data: data,
            };
        }
        case "bougies": {
            const data = await prisma.product.findMany({
                where: {
                    status: "publie",
                    category: "bougies",
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
                title: "Nos bougies",
                data: data,
            };
        }
        case "fondants": {
            const data = await prisma.product.findMany({
                where: {
                    status: "publie",
                    category: "fondants",
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
                title: "Nos fondants",
                data: data,
            };
        }
        case "diffuseurs": {
            const data = await prisma.product.findMany({
                where: {
                    status: "publie",
                    category: "desodorisants",
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
                title: "Nos diffuseurs pour voiture",
                data: data,
            };
        }
        default: {
            return notFound();
        }
    }
}

interface Params {
    name: string;
}

export default async function CategoriesPage({
    params,
}: {
    params: Promise<Params>;
}) {
    noStore();
    const { name } = await params;
    const { data, title } = await getData(name);

    return (
        <section className="md:mt-40 md:px-24">
    <h1 className="text-3xl font-semibold my-5 md:ml-12 lg:ml-24">{title}</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 items-start gap-6 px-4 sm:px-8 lg:px-12">
        {data.map((item) => (
            <ProductCard item={item} key={item.id} />
        ))}
    </div>
</section>


    );
}
