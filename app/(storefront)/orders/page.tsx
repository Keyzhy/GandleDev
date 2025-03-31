import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import OrderCard from "@/app/components/storefront/OrderCard"; 
import { Separator } from "@/components/ui/separator";

export default async function Orders() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

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
      id: true,
      amount: true,
      createdAt: true,
      orderNumber: true,
      statuscomm: true,
      LineItems: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const transformedOrders = await Promise.all(
    orders.map(async (order) => {
      const LineItemsWithImages = await Promise.all(
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
        LineItems: LineItemsWithImages,
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
            <p>Vous n&apos;avez pas encore passé de commandes.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {transformedOrders.map((order, index) => (
              <div key={order.id}>
                <OrderCard order={order} />
                {index < transformedOrders.length - 1 && (
                  <Separator className="my-6" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
