import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {unstable_noStore as noStore} from "next/cache";

async function getData() {
    const data = await prisma.banner.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return data;
}

export default async function BannerRoute(){
    noStore();
    const data = await getData();

    return(
        <>
            <div className="flex items-center justify-end">
                <Button asChild className="flex gap-x-2">
                    <Link href="/dashboard/banner/create">
                    <PlusCircle className="h-3.5 w-3.5"/>
                    <span> Ajouter une Bannière</span>
                    </Link>
                </Button>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Bannières</CardTitle>
                    <CardDescription>Ajouter ou modifier des Bannières</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Titre</TableHead>
                                <TableHead className="text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data.map((item)=> (
                                <TableRow key={item.id}>
                                <TableCell>
                                    <Image 
                                        alt="Image Produit" 
                                        src={item.imageString} 
                                        width={64} 
                                        height={64}
                                        className="rounded-lg object-cover h-16 w-16"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{item.title}</TableCell>
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
                                            <DropdownMenuItem asChild><Link href={`/dashboard/banner/${item.id}/delete`}>Supprimer</Link></DropdownMenuItem>
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