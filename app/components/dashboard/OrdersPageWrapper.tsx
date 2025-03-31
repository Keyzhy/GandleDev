"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const orderStatusMapping = {
  nontraite: "Non Traité",
  horsstock: "Hors Stock",
  delaisapporvisionnement: "Délai Approvisionnement",
  preparation: "Préparation",
  attenteenvoi: "Attente Envoi",
  communiquetransporteur: "Communiqué Transporteur",
} as const;

const statusColorMapping = {
  nontraite: "text-orange-500",
  horsstock: "text-red-500",
  delaisapporvisionnement: "text-yellow-500",
  preparation: "text-blue-500",
  attenteenvoi: "text-indigo-500",
  communiquetransporteur: "text-green-500",
} as const;

type OrderStatus = keyof typeof orderStatusMapping;

interface Order {
  id: string;
  amount: number;
  createdAt: Date;
  status: string;
  orderNumber: string;
  statuscomm: OrderStatus;
  User: {
    firstname: string;
    email: string;
    profileImage: string;
  } | null;
}

export default function OrdersPageWrapper({ orders }: { orders: Order[] }) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Commandes</CardTitle>
        <CardDescription>Commandes récentes de la boutique</CardDescription>
      </CardHeader>
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
            {orders.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => router.push(`/dashboard/orders/${item.id}`)}
                className="cursor-pointer hover:bg-muted hover:border-l-4 hover:border-[#BFA48C] hover:shadow-sm hover:scale-[1.01] transition-all duration-200"
              >
                <TableCell className="font-medium">
                  <p>{item.User?.firstname}</p>
                  <p className="hidden md:flex text-sm text-muted-foreground">
                    {item.User?.email}
                  </p>
                </TableCell>

                <TableCell className={statusColorMapping[item.statuscomm]}>
                  {orderStatusMapping[item.statuscomm]}
                </TableCell>

                <TableCell>
                  {new Intl.DateTimeFormat("fr-FR").format(
                    new Date(item.createdAt)
                  )}
                </TableCell>

                <TableCell className="text-right">
                  {new Intl.NumberFormat("fr-FR").format(item.amount / 100)} €
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
