"use client"

import { checkOut, deleteItem, Metadata } from "@/app/actions";
import { CheckOutButton, DeleteItem } from "@/app/components/SubmitButtons";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { getKindeServerSession, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server"
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation"
import {unstable_noStore as noStore} from "next/cache";
import { useEffect, useState } from "react";
import Loader from "@/app/components/storefront/Loader";
import { Button } from "@/components/ui/button";

export default async function BagRoute() {
    noStore();
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    const [isLoading, setIsLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
      }, []);
    
      if (!isClient) {
        return <Loader />;
      }

    if(!user) {
        redirect("/");
    }

    const cart: Cart | null = await redis.get(`cart-${user.id}`);

    let totalPrice = 0;

    cart?.items.forEach((item) => {
        totalPrice += item.price * item.quantity;
    })
    const handleCheckout = async () => {
        if (!user) return;
        setIsLoading(true);
    
        try {
          const metadata: Metadata = {
            orderNumber: crypto.randomUUID(),
          };
    
          const checkoutUrl = await checkOut( metadata);
    
          if (checkoutUrl) {
            window.location.href = checkoutUrl;
          }
        } catch (error) {
          console.error("Error creating checkout session:", error);
        } finally {
          setIsLoading(false);
        }
      };


    return(
        <div className="max-w-2xl mx-auto mt-10 min-h-[55vh] md:mt-48">
            {!cart || !cart.items ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <ShoppingBag className="w-10 h-10 text-primary"/>
                    </div>
                    <h2 className="mt-6 text-xl font-semibold">Il n&apos;y a pas de produits dans le panier</h2>
                </div>
            ):(
                < div className="flex flex-col gap-y-10">
                    {cart?.items.map((item) => (
                        <div key={item.id} className="flex">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                                <Image className="rounded-md object-cover" fill src={item.imageString} alt="Product image" />
                            </div>
                            <div className="ml-5 flex justify-between w-full font-medium">
                                <p>{item.name}</p>
                                <div className="flex flex-col h-full justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <p>{item.quantity} x</p>
                                        <p>{item.price} €</p>
                                    </div>

                                    <form action={deleteItem} className="text-end">
                                        <input type="hidden" name="productId" value={item.id} />
                                        <DeleteItem/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="mt-10">
                        <div className="flex items-center justify-between font-medium">
                            <p>Sous-total</p>
                            <p>{new Intl.NumberFormat('de-DE').format(totalPrice)} €</p>
                        </div>

                        {user ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-4 w-full bg-[#BFA48C] text-white px-4 py-2 rounded  disabled:bg-gray-400"
            >
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          ) : (
            
            <Button variant="ghost" asChild>
            <LoginLink className="mt-4 w-full bg-[#BFA48C] text-white px-4 py-2 rounded ">Sign in to Checkout</LoginLink>
          </Button>
          )}

                    </div>
                </div>
            )}
        </div>

    )
}
