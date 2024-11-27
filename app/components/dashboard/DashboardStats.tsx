import prisma from "@/app/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Euro, PartyPopperIcon, ShoppingBag, User2 } from "lucide-react";

async function getData(){

    const [user, products,order] = await Promise.all([
        prisma.user.findMany({
            select:{
                id: true,
            }
        }),
        prisma.product.findMany({
            select:{
                id: true,
            }
        }),
        prisma.order.findMany({
            select:{
                amount: true,
            }
        }),
    ])

    return {
        user,
        products,
        order,
    };
}

export async function  DashboardStats(){

    const {products,user,order} = await getData()

    const totalAmount = order.reduce((accumulator, currentValue) =>{
        return accumulator + currentValue.amount;
    }, 0);

    return(
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle>Ventes</CardTitle>
                    <Euro className="h-4 w-4 text-green-500"/>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{new Intl.NumberFormat('en-GB').format(totalAmount / 100)}€</p>
                    <p className="text-xs text-muted-foreground">{order.length} ventes</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle>Commandes</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-blue-500"/>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">+{order.length}</p>
                    <p className="text-xs text-muted-foreground">total des commandes</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle>Produits</CardTitle>
                    <PartyPopperIcon className="h-4 w-4 text-indigo-500"/>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{products.length}</p>
                    <p className="text-xs text-muted-foreground">total des produits</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle>Total des utilisateurs</CardTitle>
                    <User2 className="h-4 w-4 text-orange-500"/>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{user.length}</p>
                    <p className="text-xs text-muted-foreground">total des utilisateurs inscrits</p>
                </CardContent>
            </Card>
        </div>
    )
}