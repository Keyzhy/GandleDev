"use server";

import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { stripe } from "@/app/lib/stripe";
import OrderConfirmationEmail from "@/emails/orderConfirmation";
import { headers } from "next/headers";
import { Resend } from "resend";
import Stripe from "stripe";

export const config = {
  maxDuration: 20, // Augmente ce chiffre si tu es sur un plan Pro
};

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_SECRET_WEBHOOK as string
      );
    } catch (error) {
      console.error("🚨 Erreur de validation Stripe :", error);
      return new Response("Webhook Error", { status: 400 });
    }

    if (event.type !== "checkout.session.completed") {
      console.warn("⚠️ Événement Stripe non géré :", event.type);
      return new Response("Événement ignoré", { status: 200 });
    }

    console.log("💰 Paiement confirmé, traitement en cours...");

    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email || "";
    const userId = session.metadata?.userId;

    // 📦 Récupérer les produits achetés
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    // 📝 Enregistrer la commande
    await prisma.order.create({
      data: {
        amount: session.amount_total as number,
        status: session.status as string,
        orderNumber: session.metadata?.orderNumber,
        userId,
        shippingName: session.shipping_details?.name || "",
        shippingAdressLine1: session.shipping_details?.address?.line1 || "",
        shippingCity: session.shipping_details?.address?.city || "",
        shippingPostalCode:
          session.shipping_details?.address?.postal_code || "",
        shippingCountry: session.shipping_details?.address?.country || "",
        shippingOption:
          typeof session.shipping_cost?.shipping_rate === "string"
            ? session.shipping_cost.shipping_rate
            : ((session.shipping_cost?.shipping_rate as Stripe.ShippingRate)
                ?.id ?? ""),

        LineItems: lineItems.data.map((item) => ({
          id: item.id,
          description: item.description || "Article sans nom",
          quantity: item.quantity ?? 1,
          price: item.price?.unit_amount || 0,
        })),
      },
    });

    console.log("✅ Commande enregistrée dans la BDD");

    // Lancer en parallèle : suppression Redis + envoi email
    const deleteCartPromise = redis.del(`cart-${userId}`);

    const sendEmailPromise = customerEmail
      ? new Resend(process.env.RESEND_API_KEY).emails.send({
          from: `Gandle <contact@gandle.fr>`,
          to: customerEmail,
          subject: "Votre commande est confirmée 🎉",
          react: OrderConfirmationEmail({
            name: session.shipping_details?.name || "Cher client",
            orderNumber: session.metadata?.orderNumber || "Inconnu",
            totalAmount: session.amount_total || 0,
            lineItems: lineItems.data.map((item) => ({
              id: item.id,
              description: item.description || "Produit sans nom",
              quantity: item.quantity ?? 1,
              price: item.price?.unit_amount || 0,
            })),
          }),
        })
      : Promise.resolve();

    const [delRes, emailRes] = await Promise.allSettled([
      deleteCartPromise,
      sendEmailPromise,
    ]);

    if (delRes.status === "fulfilled") {
      console.log("🗑️ Panier supprimé de Redis");
    } else {
      console.error("❌ Erreur suppression Redis :", delRes.reason);
    }

    if (emailRes.status === "fulfilled") {
      console.log("✅ Email de confirmation envoyé !");
    } else {
      console.error("❌ Erreur envoi email :", emailRes.reason);
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur globale dans le webhook :", error);
    return new Response("Erreur interne", { status: 500 });
  }
}
