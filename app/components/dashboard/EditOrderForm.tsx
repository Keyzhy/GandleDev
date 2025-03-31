"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SubmitButton } from "../SubmitButtons";
import { useActionState, useEffect, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { orderSchema } from "@/app/lib/zodSchemas";
import { editOrder } from "@/app/actions";
import { type $Enums } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import jsPDF from "jspdf";

const shippingOptionMapping: { [key: string]: string } = {
  shr_1QXo9zDxDzTpTbnPWI4RsKJj: "Livraison gratuite",
  shr_1QXmvdDxDzTpTbnPY4BghtL7: "Livraison colissimo -250g",
  shr_1QXo8YDxDzTpTbnPyyosAb4D: "Livraison colissimo 250g-500g",
  shr_1QXo9ADxDzTpTbnPOS7MyPT4: "Livraison colissimo 500g-1kg",
  shr_1QXo9aDxDzTpTbnPtyd16sMC: "Livraison colissimo 1kg-2kg ou +2kg",
  shr_1QXoAdDxDzTpTbnPmtXoOWft: "Livraison chronopost 250g-1kg",
  shr_1QXoBEDxDzTpTbnPQb8Pc7H2: "Livraison chronopost +1kg"
};

const statusColors: Record<$Enums.OrderStatus, string> = {
  nontraite: "bg-gray-300 text-gray-800",
  horsstock: "bg-red-200 text-red-800",
  delaisapporvisionnement: "bg-yellow-200 text-yellow-800",
  preparation: "bg-blue-200 text-blue-800",
  attenteenvoi: "bg-orange-200 text-orange-800",
  communiquetransporteur: "bg-green-200 text-green-800"
};

interface iAppProps {
  orderdata: {
    id: string;
    status: string;
    orderNumber: string;
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
    LineItems: {
      description: string;
      quantity: number;
      price: number;
      images: string[];
    }[];
    history: {
      id: string;
      status: $Enums.OrderStatus;
      changedAt: Date;
    }[];
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
    shouldRevalidate: "onInput"
  });

  const totalQuantity = orderdata.LineItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = orderdata.LineItems.reduce((acc, item) => acc + item.price, 0);

  function downloadInvoice() {
    const doc = new jsPDF();
    const totalTTC = orderdata.amount / 100;
    const totalHT = totalTTC / 1.2;
    const TVA = totalTTC - totalHT;
    const date = new Date(orderdata.createdAt).toLocaleDateString("fr-FR");
    const logo = document.createElement("img");
    logo.src = "/logo.png";

    logo.onload = () => {
      doc.addImage(logo, "PNG", 20, 10, 30, 25);
      doc.setFontSize(18);
      doc.text("Reçu de commande", 105, 22, { align: "center" });

      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Date : ${date}`, 20, 40);
      doc.text(`Commande ID : ${orderdata.orderNumber}`, 20, 47);
      doc.text(`Client : ${orderdata.shippingName}`, 20, 54);
      doc.text(`Adresse : ${orderdata.shippingAdressLine1}, ${orderdata.shippingPostalCode} ${orderdata.shippingCity}`, 20, 61);
      doc.line(20, 67, 190, 67);

      doc.setFontSize(13);
      doc.setTextColor(0);
      doc.text("Produit", 20, 75);
      doc.text("Quantité", 120, 75);
      doc.text("Prix TTC", 160, 75);

      let y = 83;
      doc.setFontSize(12);
      orderdata.LineItems.forEach((item) => {
        doc.text(item.description, 20, y);
        doc.text(`${item.quantity}`, 125, y);
        doc.text(`${(item.price / 100).toFixed(2)} €`, 160, y);
        y += 8;
      });

      doc.line(20, y, 190, y);
      y += 10;

      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text(`Total HT : ${totalHT.toFixed(2)} €`, 160, y, { align: "right" });
      y += 8;
      doc.text(`TVA (20%) : ${TVA.toFixed(2)} €`, 160, y, { align: "right" });
      y += 8;
      doc.text(`Total TTC : ${totalTTC.toFixed(2)} €`, 160, y, { align: "right" });
      doc.save(`recu_commande_${orderdata.id}.pdf`);
    };
  }

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} className="space-y-4">
      <input type="hidden" name="orderId" value={orderdata.id} />

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/orders">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Commande #{orderdata.orderNumber}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détails de la commande</CardTitle>
          <CardDescription>Suivi, édition et historique de la commande client.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <Label className="text-lg font-semibold">Nom complet</Label>
            <p>{orderdata.shippingName}</p>
          </div>

          <div>
            <Label className="text-lg font-semibold">Adresse complète</Label>
            <p>{orderdata.shippingAdressLine1}</p>
            {orderdata.shippingAdressLine2 && <p>{orderdata.shippingAdressLine2}</p>}
            <p>{orderdata.shippingPostalCode}, {orderdata.shippingCity}</p>
          </div>

          <div>
            <Label className="text-lg font-semibold">Option de livraison</Label>
            <p>{shippingOptionMapping[orderdata.shippingOption]}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-semibold">Statut de la commande</Label>
            <Select
              key={fields.statuscomm.key}
              name={fields.statuscomm.name}
              defaultValue={orderdata.statuscomm}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir un statut" />
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
            <p className="text-red-500 text-sm">{fields.statuscomm.errors}</p>
          </div>

          <Separator />

          <Label className="text-lg font-semibold">Historique des statuts</Label>
          <ul className="text-sm space-y-1">
            {orderdata.history?.length > 0 ? (
              orderdata.history.map(h => (
                <li key={h.id} className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[h.status]}`}>{h.status}</span>
                  <span className="text-muted-foreground">{new Date(h.changedAt).toLocaleString("fr-FR")}</span>
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">Aucun changement de statut pour cette commande.</li>
            )}
          </ul>

          <Separator />

          <Label className="text-lg font-semibold">Articles</Label>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Quantité</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderdata.LineItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Image src={item.images[0]} alt="" width={64} height={64} className="rounded-md object-cover" />
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.price / 100} €</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} className="font-semibold">Total :</TableCell>
                <TableCell>{totalPrice / 100} €</TableCell>
                <TableCell>{totalQuantity}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
          <SubmitButton text="Valider les modifications" />
          <Button variant="outline" onClick={downloadInvoice}>Télécharger le reçu</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
