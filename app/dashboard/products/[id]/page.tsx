import { EditForm } from "@/app/components/dashboard/EditForm";
import prisma from "@/app/lib/db"
import { notFound } from "next/navigation";
import {unstable_noStore as noStore} from "next/cache";

async function getData(productId: string) {
    const data = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    });

    if(!data) {
        return notFound();
    }
    return data;
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
        <EditForm productdata={data}/>
    )
} 