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
        orderNumber: true,
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
        statusHistory: {
          orderBy: { changedAt: "desc" },
          select: {
            id: true,
            status: true,
            changedAt: true,
          },
        },
      },
    });
  
    if (!data) {
      return notFound();
    }
  
    const transformedLineItems = await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.LineItems.map(async (item: any) => {
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
      ...data,
      LineItems: transformedLineItems,
      history: data.statusHistory, 
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
