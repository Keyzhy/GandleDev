import { EditOrderForm } from "@/app/components/dashboard/EditOrderForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(orderId: string) {
    const data = await prisma.order.findUnique({
        where: { id: orderId },
        select: {
            id: true,
            status: true,
            amount: true,
            createdAt: true,
            statuscomm: true,
            shippingName: true,
            shippingAdressLine1: true,
            shippingAdressLine2: true,
            shippingCity: true,
            shippingPostalCode: true,
            shippingCountry: true,
            shippingOption: true,
            LineItems: true, // Récupère les items de la commande
        },
    });

    if (!data) {
        return notFound();
    }

    // Transformer les LineItems pour inclure les images des produits
    const transformedLineItems = await Promise.all(
        data.LineItems.map(async (item: any) => {
            const product = await prisma.product.findFirst({
                where: { name: item.description }, // Supposons que "name" correspond au champ de description
                select: { images: true }, // Sélectionner uniquement les images
            });

            return {
                description: item.description || "",
                quantity: item.quantity || 0,
                price: item.price || 0,
                images: product?.images || [], // Ajoute les images du produit ou une liste vide
            };
        })
    );

    return {
        ...data,
        LineItems: transformedLineItems,
    };
}

interface Params {
    id: string;
}

export default async function EditRoute({
    params,
}: {
    params: Promise<Params>;
}) {
    noStore();
    const { id } = await params;
    const data = await getData(id);

    return <EditOrderForm orderdata={data} />;
}
