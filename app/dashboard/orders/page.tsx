import prisma from "@/app/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table,TableHeader, TableRow,TableHead, TableBody, TableCell } from "@/components/ui/table";
import { MoreHorizontal, Pencil } from "lucide-react";
import {unstable_noStore as noStore} from "next/cache";
import Link from "next/link";

const orderStatusMapping = {
    nontraite: "Non Traité",
    horsstock: "Hors Stock",
    delaisapporvisionnement: "Délai Approvisionnement",
    preparation: "Préparation",
    attenteenvoi: "Attente Envoi",
    communiquetransporteur: "Communiqué Transporteur",
  };

  const statusColorMapping = {
    nontraite: "text-orange-500",
    horsstock: "text-red-500",
    delaisapporvisionnement: "text-yellow-500",
    preparation: "text-blue-500",
    attenteenvoi: "text-indigo-500",
    communiquetransporteur: "text-green-500",
};
  

async function getData(){
    const data = await prisma.order.findMany({
        select:{
            amount: true,
            createdAt: true,
            status: true,
            id: true,
            statuscomm: true,
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
    noStore();
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
                                
                                <TableHead>Statut</TableHead>
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
                                
                                <TableCell className={statusColorMapping[item.statuscomm]}>
                                    {orderStatusMapping[item.statuscomm]}
                                    </TableCell>
                                <TableCell>{new Intl.DateTimeFormat('en-GB').format(item.createdAt)}</TableCell>
                                <TableCell className="text-right">{new Intl.NumberFormat('de-DE').format(item.amount / 100)} €</TableCell>
                                <TableCell className="text-end">
                                    <Link href={`/dashboard/orders/${item.id}`}>
                                    <Pencil className="group-hover:text-gray-600"/>
                                    </Link>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </CardHeader>
        </Card>
    )
}