import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

type ExtendedSession = Stripe.Checkout.Session & {
    shipping_rate?: string; // Propriété personnalisée
  };
export async function POST(req: Request){
    const body = await req.text();

    const signature = (await headers()).get("Stripe-Signature") as string;

    let event;

    try{
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_SECRET_WEBHOOK as string
        );
        // eslint-disable-next-line no-unused-vars
    } catch(error: unknown){
        return new Response("Webhook Error",{status: 400});
    }

    switch(event.type){
        case "checkout.session.completed": {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const session = event.data.object as ExtendedSession;

            const shippingDetails = session.shipping_details;
            

            const shippingAddress = shippingDetails?.address;
            const shippingName = shippingDetails?.name;
            
            const shippingRate = session.shipping_rate;

            if (shippingRate) {
              console.log("Shipping Rate ID:", shippingRate);
      
              // Vous pouvez également récupérer les détails avec l'API Stripe si nécessaire
              const shippingRateDetails = await stripe.shippingRates.retrieve(
                shippingRate
              );
      
              console.log("Shipping Rate Details:", shippingRateDetails);
            }
            // Optionnel : récupérer les détails du shipping_rate via l'API Stripe
            
            
 
            await prisma.order.create({
                data:{
                    amount: session.amount_total as number ,
                    status: session.status as string,
                    userId: session.metadata?.userId,
                    shippingName: shippingName || '',
                    shippingAdressLine1: shippingAddress?.line1 || '',
                    shippingAdressLine2: shippingAddress?.line2 || '',
                    shippingCity: shippingAddress?.city || '',
                    shippingPostalCode: shippingAddress?.postal_code || '',
                    shippingCountry: shippingAddress?.country || '',
                    shippingOption: shippingRate || '',
                }
            });

            await redis.del(`cart-${session.metadata?.userId}`);
            break;
        }default:{
            console.log('unhandled event');
        }
    }

    return new Response(null,{status: 200})
}
