"use client";

import React, { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Loader from '@/app/components/storefront/Loader';

export default function SuccessRoute() {
  return (
    <Suspense fallback={<Loader />}>
      <SuccessRouteContent />
    </Suspense>
  );
}

function SuccessRouteContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="bg-white p-10 sm:p-12 rounded-2xl shadow-xl w-full max-w-2xl text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Merci pour votre commande
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Votre commande a bien été confirmée et sera expédiée sous peu.
        </p>

        {/* Order number */}
        {orderNumber && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Numéro de commande</p>
            <p className="font-mono text-green-600 text-sm break-all">{orderNumber}</p>
          </div>
        )}

        {/* Confirmation note */}
        <p className="text-sm text-gray-500 mb-6">
          Un email de confirmation vous a été envoyé. Merci pour votre confiance.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/orders">Voir ma commande</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Continuer mes achats</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
