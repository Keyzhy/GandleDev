import OrdersPageWrapper from "@/app/components/dashboard/OrdersPageWrapper";
import prisma from "@/app/lib/db";

export default async function OrdersPageServer() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
      id: true,
      orderNumber: true,
      statuscomm: true,
      User: {
        select: {
          firstname: true,
          email: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <OrdersPageWrapper orders={data} />;
}
