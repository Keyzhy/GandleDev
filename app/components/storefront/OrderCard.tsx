"use client";

import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/app/lib/formatCurrency";
import { Separator } from "@/components/ui/separator";

interface Order {
  id: string;
  orderNumber: string;
  createdAt: Date;
  amount: number;
  statuscomm: string;
  LineItems: {
    description: string;
    quantity: number;
    price: number;
    images: string[];
  }[];
}

const statusSteps = [
  { key: "nontraite", label: "Commande confirmée" },
  { key: "preparation", label: "En préparation" },
  { key: "attenteenvoi", label: "Commande préparée" },
  { key: "communiquetransporteur", label: "Commande expédiée" },
];

export default function OrderCard({ order }: { order: Order }) {
  const currentStepIndex = statusSteps.findIndex(
    (step) => step.key === order.statuscomm
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
      <div className="p-5 sm:p-6 border-b border-gray-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Numéro de commande
            </p>
            <p className="font-mono text-sm font-semibold text-green-500">
              {order.orderNumber}
            </p>
          </div>
          <div className="text-sm text-right text-muted-foreground">
            <p>Date</p>
            <p className="font-medium text-gray-900">
              {new Date(order.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative w-full max-w-2xl mx-auto mt-8 px-6">
          {/* Progress bar */}
          <div className="absolute left-[13%] right-[13%] top-4 h-1 bg-gray-200 z-0 rounded-full">
            <div
              className="h-1 bg-[#BFA48C] rounded-full transition-all duration-500"
              style={{
                width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Steps */}
          <div className="relative z-10 flex justify-between items-center">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              return (
                <div
                  key={step.key}
                  className="relative flex flex-col items-center text-center w-1/4"
                >
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold z-20
                      ${isCompleted ? "bg-[#BFA48C] text-white" : "bg-gray-300 text-gray-600"}`}
                  >
                    {index + 1}
                  </div>
                  <p
                    className={`text-xs sm:text-sm font-medium text-center max-w-[80px] mt-2
                      ${isCompleted ? "text-[#BFA48C]" : "text-gray-500"}`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total */}
        <div className="mt-6 text-right">
          <p className="text-sm text-gray-600 mb-1">Montant total</p>
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(order.amount / 100, "EUR")}
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="px-5 py-4">
        <p className="text-sm font-semibold text-muted-foreground mb-3">
          Articles commandés
        </p>
        <div className="space-y-3">
          {order.LineItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-3 last:border-none"
            >
              <div className="flex items-center gap-4">
                {item.images[0] ? (
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.description}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                    Pas d’image
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Quantité: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-800">
                {formatCurrency((item.price / 100) * item.quantity, "EUR")}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Separator />
    </div>
  );
}
