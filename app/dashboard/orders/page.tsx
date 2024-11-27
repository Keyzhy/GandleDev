import prisma from "@/app/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table,TableHeader, TableRow,TableHead, TableBody, TableCell } from "@/components/ui/table";

async function getData(){
    const data = await prisma.order.findMany({
        select:{
            amount: true,
            createdAt: true,
            status: true,
            id: true,
            User: {
                select:{
                    firstname: true,
                    email: true,
                    profileImage: true,
                },
            },
        },
        orderBy:{
            createdAt: 'desc',
        },
    });

    return data;
}


export default async function OrdersPage(){

    const data = await getData();

    return(
        <Card>
            <CardHeader className="px-7">
                <CardTitle>Commandes</CardTitle>
                <CardDescription>Commandes récentes de la boutique</CardDescription>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Montant</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) =>(
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">
                                    <p>{item.User?.firstname}</p>
                                    <p className="hidden md:flex text-sm text-muted-foreground">{item.User?.email}</p>
                                </TableCell>
                                <TableCell> Commande </TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>{new Intl.DateTimeFormat('en-GB').format(item.createdAt)}</TableCell>
                                <TableCell className="text-right">{new Intl.NumberFormat('de-DE').format(item.amount / 100)} €</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </CardHeader>
        </Card>
    )
}