import prisma from "@/app/lib/db";
import { formatCurrency } from "@/app/lib/formatCurrency";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

// Définir un type pour les clés de statut
type OrderStatus =
    | "nontraite"
    | "horsstock"
    | "delaisapprovisionnement"
    | "preparation"
    | "attenteenvoi"
    | "communiquetransporteur";

const orderStatusMapping: Record<OrderStatus, string> = {
    nontraite: "Commande confirmée",
    horsstock: "Hors Stock",
    delaisapprovisionnement: "Délai Approvisionnement",
    preparation: "En préparation",
    attenteenvoi: "Commande préparée",
    communiquetransporteur: "Commande expédiée",
};

export default async function Orders() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // Vérifiez si l'utilisateur est authentifié
    if (!user || !user.id) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
                        Mes commandes
                    </h1>
                    <div className="text-center text-gray-600">
                        <p>Vous devez être connecté pour voir vos commandes.</p>
                    </div>
                </div>
            </div>
        );
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: user.id,
        },
        select: {
            amount: true,
            createdAt: true,
            orderNumber: true,
            statuscomm: true,
            LineItems: true,
            User: {
                select: {
                    id: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const transformedOrders = await Promise.all(
        orders.map(async (order) => {
            const transformedLineItems = await Promise.all(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                order.LineItems.map(async (item: any) => {
                    const product = await prisma.product.findFirst({
                        where: { name: item.description },
                        select: { images: true },
                    });

                    return {
                        description: item.description || "",
                        quantity: item.quantity || 0,
                        price: item.price || 0,
                        images: product?.images || [],
                    };
                })
            );

            return {
                ...order,
                LineItems: transformedLineItems,
            };
        })
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:mt-32">
            <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
                    Mes commandes
                </h1>
                {transformedOrders.length === 0 ? (
                    <div className="text-center text-gray-600">
                        <p>Vous n`&apos;`avez pas encore passé de commandes.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {transformedOrders.map((order, index) => (
                            <div key={order.orderNumber}>
                                <div
                                    className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden"
                                >
                                    <div className="p-4 sm:p-6 border-b border-gray-200">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1 font-bold">
                                                    Numéro de commande
                                                </p>
                                                <p className="font-mono text-sm text-green-600 break-all">
                                                    {order.orderNumber}
                                                </p>
                                            </div>
                                            <div className="sm:text-right">
                                                <p className="text-sm text-gray-600 mb-1">Date de commande</p>
                                                <p className="font-medium">
                                                    {order.createdAt
                                                        ? new Date(order.createdAt).toLocaleDateString("fr-FR")
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                                            <div className="flex items-center">
                                                <span className="text-sm mr-2">Statut:</span>
                                                <span>
                                                    {orderStatusMapping[order.statuscomm as OrderStatus]}
                                                </span>
                                            </div>
                                            <div className="sm:text-right">
                                                <p className="text-sm text-gray-600 mb-1">Montant total</p>
                                                <p className="font-bold text-lg">
                                                    {formatCurrency(order.amount / 100, "EUR")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex-col justify-start items-start gap-10 flex">
                                        <div className="w-full py-9  border-b  flex-col justify-start items-start flex mt-4">
                                            <div className="w-full flex-col justify-center sm:items-center items-start gap-8 flex">
                                                <ol className="flex sm:items-center items-start w-full sm:gap-0 gap-5">
                                                    {["nontraite", "preparation", "attenteenvoi", "communiquetransporteur"].map(
                                                        (status, index) => (
                                                            <li
                                                                key={index}
                                                                className={`flex w-full relative justify-center text-base font-semibold ${
                                                                    index === 0 && order.statuscomm === "nontraite"
                                                                        ? "text-[#BFA48C] after:bg-[#BFA48C]"
                                                                        : index <= 1 && order.statuscomm === "preparation"
                                                                        ? "text-[#BFA48C] after:bg-[#BFA48C]"
                                                                        : index <= 2 && order.statuscomm === "attenteenvoi"
                                                                        ? "text-[#BFA48C] after:bg-[#BFA48C]"
                                                                        : index <= 3 && order.statuscomm === "communiquetransporteur"
                                                                        ? "text-[#BFA48C]"
                                                                        : "text-gray-500"
                                                                } ${index === 3 ? "" : "after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-4 after:top-4 md:after:left-28 sm:after:left-20 after:left-16"}`}
                                                            >
                                                                <div className="sm:whitespace-nowrap z-10 flex flex-col items-center text-center">
                                                                    <span
                                                                        className={`w-8 h-8 flex justify-center items-center mx-auto mb-1 rounded-full text-base font-bold ${
                                                                            index === 0 && order.statuscomm === "nontraite"
                                                                                ? "bg-[#BFA48C] text-white"
                                                                                : index <= 1 && order.statuscomm === "preparation"
                                                                                ? "bg-[#BFA48C] text-white"
                                                                                : index <= 2 && order.statuscomm === "attenteenvoi"
                                                                                ? "bg-[#BFA48C] text-white"
                                                                                : index <= 3 && order.statuscomm === "communiquetransporteur"
                                                                                ? "bg-[#BFA48C] text-white"
                                                                                : "bg-gray-300 text-gray-500"
                                                                        }`}
                                                                    >
                                                                        {index + 1}
                                                                    </span>
                                                                    {orderStatusMapping[status as OrderStatus]}
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 sm:px-6 sm:py-4">
                                        <p className="text-sm font-semibold text-gray-600 mb-3 sm:mb-4">
                                            Articles commandés
                                        </p>
                                        <div className="space-y-3 sm:space-y-4">
                                            {order.LineItems.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-0"
                                                >
                                                    <div className="flex items-center gap-3 sm:gap-4">
                                                        {item.images.length > 0 && (
                                                            <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden">
                                                                <Image
                                                                    src={item.images[0]}
                                                                    alt={item.description}
                                                                    className="object-cover"
                                                                    fill
                                                                />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="font-medium text-sm sm:text-base">
                                                                {item.description}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Quantité: {item.quantity ?? "N/A"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="font-medium text-right">
                                                        {item.price && item.quantity
                                                            ? formatCurrency(
                                                                (item.price / 100) * item.quantity,
                                                                "EUR"
                                                              )
                                                            : "N/A"}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Ajouter un séparateur entre les commandes */}
                                {index < transformedOrders.length - 1 && <Separator className="my-6" />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
