"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SubmitButton } from "../SubmitButtons";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { orderSchema } from "@/app/lib/zodSchemas";
import { editOrder } from "@/app/actions";
import { type $Enums } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const shippingOptionMapping: { [key: string]: string } = {
    shr_1QXo9zDxDzTpTbnPWI4RsKJj: "Livraison gratuite",
    shr_1QXmvdDxDzTpTbnPY4BghtL7: "Livraison colissimo -250g",
    shr_1QXo8YDxDzTpTbnPyyosAb4D: "Livraison colissimo 250g-500g",
    shr_1QXo9ADxDzTpTbnPOS7MyPT4: "Livraison colissimo 500g-1kg",
    shr_1QXo9aDxDzTpTbnPtyd16sMC: "Livraison colissimo 1kg-2kg ou +2kg",
    shr_1QXoAdDxDzTpTbnPmtXoOWft: "Livraison chronopost 250g-1kg",
    shr_1QXoBEDxDzTpTbnPQb8Pc7H2: "Livraison chronopost +1kg",
};

interface iAppProps {
    orderdata: {
        id: string;
        status: string;
        amount: number;
        createdAt: Date;
        statuscomm: $Enums.OrderStatus;
        shippingName: string;
        shippingAdressLine1: string;
        shippingAdressLine2: string;
        shippingCity: string;
        shippingPostalCode: string;
        shippingCountry: string;
        shippingOption: string;
        LineItems: { description: string; quantity: number; price: number; images: string[] }[];
    };
}


export function EditOrderForm({ orderdata }: iAppProps) {
    const [lastResult, action] = useActionState(editOrder, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: orderSchema });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });
    const totalQuantity = orderdata.LineItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = orderdata.LineItems.reduce((acc, item) => acc + item.price, 0);
    

    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <input type="hidden" name="orderId" value={orderdata.id} />
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/orders">
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">Commandes</h1>
            </div>

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Modifier la commande</CardTitle>
                    <CardDescription>Ce formulaire permet de modifier une commande</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        {/* Status */}
                        
                        
                        {/* Nom complet */}
                        <div className="flex flex-col gap-3">
                            <Label className="text-lg text-bold">Nom complet</Label>
                            <Label className="text-m">{orderdata.shippingName}</Label>
                        </div>
                        <Separator />

                        {/* Adresse complète */}
                        <Label className="flex flex-col gap-3 text-lg text-extrabold -mb-2">Adresse complète :</Label>
                        <div className="flex flex-col gap-2">
                            <Label className="text-m">{orderdata.shippingAdressLine1},</Label>
                            {orderdata.shippingAdressLine2 && (
                                <Label className="text-m">{orderdata.shippingAdressLine2},</Label>
                            )}
                            <Label className="text-m">
                                {orderdata.shippingPostalCode}, {orderdata.shippingCity}
                            </Label>
                        </div>
                        <Separator />

                        {/* Option de livraison */}
                        <Label className="flex flex-col gap-3 text-lg text-extrabold -mb-2">
                            Option de livraison choisie :
                        </Label>
                        <div className="flex flex-col gap-2">
                            <Label className="text-m">{shippingOptionMapping[orderdata.shippingOption]}</Label>
                        </div>
                        <Separator />

                       
                        <div className="flex flex-col gap-3 w-fit">
                            <Label className="text-lg">Statut de la commande</Label>
                            <Select
                                key={fields.statuscomm.key}
                                name={fields.statuscomm.name}
                                defaultValue={orderdata.statuscomm}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="nontraite">Non traité</SelectItem>
                                    <SelectItem value="horsstock">Hors stock</SelectItem>
                                    <SelectItem value="delaisapporvisionnement">Délai d&apos;approvisionnement</SelectItem>
                                    <SelectItem value="preparation">Préparation</SelectItem>
                                    <SelectItem value="attenteenvoi">Attente d&apos;envoi</SelectItem>
                                    <SelectItem value="communiquetransporteur">Communiqué au transporteur</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-red-500">{fields.statuscomm.errors}</p>
                        </div>
                        <Separator />
                        <Label className="flex flex-col gap-3 text-lg text-extrabold -mb-2">Articles</Label>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold">Image Produit</TableHead>
                                    <TableHead className="font-semibold">Nom du produit</TableHead>
                                    <TableHead className="font-semibold">Prix</TableHead>
                                    <TableHead className="font-semibold">Quantité</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orderdata.LineItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Image alt="Product Image" src={item.images[0]} height={64} width={64} className="rounded-md object-cover h-16 w-16"/>
                                        </TableCell>
                                        <TableCell >{item.description}</TableCell>
                                        <TableCell >{item.price/100} €</TableCell>
                                        <TableCell className="font-bold">{item.quantity}</TableCell>
                                        </TableRow>
                                        ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={2} className="font-bold">Total:</TableCell>
                                    <TableCell >{totalPrice/100} €</TableCell>
                                    <TableCell className="font-bold">{totalQuantity}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                        <Separator />
                    </div>
                </CardContent>
                <CardFooter >
                    <SubmitButton text="Valider" />
                </CardFooter>
            </Card>
        </form>
    );
}
