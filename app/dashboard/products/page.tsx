import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle,UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(){
    const data = await prisma.product.findMany({
        orderBy: {
            createdAt:'desc',
        },
    });

    return data;
}

export default async function ProductsRoute(){
    const data = await getData()
    return (
        <>
            <div className="flex items-center justify-end">
                <Button asChild className="flex items-center gap-x-2">
                    <Link href="/dashboard/products/create">
                    <PlusCircle className="w-3.5 h-3.5"/>
                    <span>Ajouter un produit</span></Link>
                </Button>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Produits </CardTitle>
                    <CardDescription>Modifier les produits et voir les performances</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Nom</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Prix</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) =>(
                                <TableRow key={item.id}>
                                <TableCell>
                                    <Image alt="Product Image" src={item.images[0]} height={64} width={64} className="rounded-md object-cover h-16 w-16"/>
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text-green-600">{item.status}</TableCell>
                                <TableCell>{item.price} €</TableCell>
                                <TableCell>{item.stock}</TableCell>
                                <TableCell>{new Intl.DateTimeFormat("en-GB").format(item.createdAt)}</TableCell>
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
                                            <DropdownMenuItem asChild><Link href={`/dashboard/products/${item.id}`}>Modifier</Link></DropdownMenuItem>
                                            <DropdownMenuItem asChild><Link href={`/dashboard/products/${item.id}/delete`}>Supprimer</Link></DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}