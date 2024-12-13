import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table,TableHeader, TableRow,TableHead, TableBody, TableCell } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
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
                                <TableHead>Type</TableHead>
                                <TableHead>Status du paiement</TableHead>
                                <TableHead>Statut de la commande</TableHead>
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
                                <TableCell>{orderStatusMapping[item.statuscomm]}</TableCell>
                                <TableCell>{new Intl.DateTimeFormat('en-GB').format(item.createdAt)}</TableCell>
                                <TableCell className="text-right">{new Intl.NumberFormat('de-DE').format(item.amount / 100)} €</TableCell>
                                <TableCell className="text-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost">
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem asChild><Link href={`/dashboard/orders/${item.id}`}>Modifier</Link></DropdownMenuItem>
                                            <DropdownMenuItem asChild><Link href={`/dashboard/orders/${item.id}/delete`}>Supprimer</Link></DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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