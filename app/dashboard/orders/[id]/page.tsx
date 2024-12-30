import { EditOrderForm } from "@/app/components/dashboard/EditOrderForm";
import prisma from "@/app/lib/db"
import { notFound } from "next/navigation";
import {unstable_noStore as noStore} from "next/cache";

async function getData(orderId: string) {
    const data = await prisma.order.findUnique({
        where: {id: orderId},
        select:{
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
            LineItems: true,
        }
    });

    if(!data) {
        return notFound();
    }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedLineItems = data.LineItems.map((item: any)=> ({
        description: item.description ||"",
        quantity: item.quantity || 0,
        price: item.price || 0, 
    }));
    return{
        ...data,
        LineItems: transformedLineItems,
    }
}

interface Params{
    id: string;
}


export default async function EditRoute({
    params,
}:{params: Promise<Params>;

}) {
    noStore();
    const {id} = await params;
    const data = await getData(id);

    return (
        <EditOrderForm orderdata={data}/>
    )
} 