'use server'
import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import { Resend } from "resend";
import OrderConfirmationEmail from "@/emails/orderConfirmation";
import Stripe from "stripe";



export async function POST(req: Request) {
    console.error("✅ Webhook Stripe reçu");
    try {
        console.log("1️⃣ Webhook reçu !");
const body = await req.text();
console.error("2️⃣ Body récupéré :", body);

const signature = (await headers()).get("Stripe-Signature") as string;
console.error("3️⃣ Signature Stripe :", signature);
let event: Stripe.Event;

try {
    event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_SECRET_WEBHOOK as string
    );
    console.error("4️⃣ Webhook validé :", event.type);
} catch (error) {
    console.error("🚨 Erreur de validation Stripe :", error);
    return new Response("Webhook Error", { status: 400 });
}


        console.error("🔔 Type d'événement Stripe :", event.type);

        const resend = new Resend(process.env.RESEND_API_KEY);

        switch (event.type) {
            case "checkout.session.completed": {
                console.error("💰 Paiement confirmé, récupération des détails...");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const session = event.data.object as any;
                const customerEmail = session.customer_details?.email;

                console.error("📧 Email du client :", customerEmail);

                const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

                console.error("🛒 Produits commandés :", lineItems.data);

                // Insérer la commande dans la BDD
                await prisma.order.create({
                    data: {
                        amount: session.amount_total as number,
                        status: session.status as string,
                        orderNumber: session.metadata?.orderNumber,
                        userId: session.metadata?.userId,
                        shippingName: session.shipping_details?.name || '',
                        shippingAdressLine1: session.shipping_details?.address?.line1 || '',
                        shippingCity: session.shipping_details?.address?.city || '',
                        shippingPostalCode: session.shipping_details?.address?.postal_code || '',
                        shippingCountry: session.shipping_details?.address?.country || '',
                        shippingOption: session.shipping_cost?.shipping_rate || '',
                        LineItems: lineItems.data.map(item => ({
                            id: item.id,
                            description: item.description || "Article sans nom",
                            quantity: item.quantity ?? 1,
                            price: (item.price?.unit_amount || 0) / 100,
                        })),
                    }
                });

                console.error("✅ Commande enregistrée dans la BDD");

                await redis.del(`cart-${session.metadata?.userId}`);
                console.error("🗑️ Panier supprimé du cache Redis");

                // Envoi de l'email
                if (customerEmail) {
                    console.error("📧 Envoi de l'email de confirmation...");
                    try {
                        await resend.emails.send({
                            from: "contact@tonsite.com",
                            to: customerEmail,
                            subject: "Votre commande est confirmée 🎉",
                            react: OrderConfirmationEmail({
                                name: session.shipping_details?.name || "Cher client",
                                orderNumber: session.metadata?.orderNumber || "Inconnu",
                                totalAmount: (session.amount_total || 0) / 100,
                                lineItems: lineItems.data.map(item => ({
                                    id: item.id,
                                    description: item.description || "Produit sans nom",
                                    quantity: item.quantity ?? 1,
                                    price: (item.price?.unit_amount || 0) / 100,
                                })),
                            }),
                        });

                        console.log("✅ Email envoyé avec succès !");
                    } catch (emailError) {
                        console.error("❌ Erreur lors de l'envoi de l'email :", emailError);
                    }
                } else {
                    console.warn("⚠️ Aucun email client trouvé, email non envoyé.");
                }

                break;
            }

            default:
                console.warn("⚠️ Événement Stripe non géré :", event.type);
        }

        return new Response(null, { status: 200 });
    } catch (error) {
        console.error("❌ Erreur dans le webhook :", error);
        return new Response("Erreur interne", { status: 500 });
    }
}
