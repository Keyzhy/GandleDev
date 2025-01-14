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
        <section className="md:mt-40  container max-w-6xl mx-auto"> {/* Padding-top pour décaler sous la navbar */}
    <h1 className="text-3xl font-semibold my-5 ">{title}</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-x-6 gap-y-10 lg:gap-x-12 xl:gap-x-20 py-6 sm:px-24">
        {data.map((item) => (
            <ProductCard item={item} key={item.id} />
        ))}
    </div>
</section>

    );
}
