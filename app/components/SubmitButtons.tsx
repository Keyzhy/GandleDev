"use client";

import { Button } from "@/components/ui/button"
import { Loader2, ShoppingBag } from "lucide-react"
import { useFormStatus } from "react-dom"

interface buttonProps{
    text: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

export function SubmitButton({text,variant}: buttonProps){
    const {pending}= useFormStatus()
    return(
        <>
        {pending ?(
            <Button disabled variant={variant}>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Ajout du produit
            </Button>
        ):(
            <Button variant ={variant} type="submit">{text}</Button>
        )}
        </>
    )
}

export function ShoppingBagButton() {
    const {pending} = useFormStatus();

    return(
        <>
        {pending ?(
            <Button disabled size="lg" className="w-full mt-7">
                <Loader2  className="mr-4 h-5 animate-spin"/> Patienter
            </Button>
        ): (
            <Button size="lg" className="w-full mt-7" type="submit">
                <ShoppingBag  className="mr-4 h-5"/> Ajouter au panier
            </Button>
        )}
        </>
    )
}

export function DeleteItem(){
    const {pending} = useFormStatus()

    return(
        <>
        {pending ?(
            <button className="font-medium text-primary text-end"> 
                Suppression...
            </button>
        ):(
            <button type="submit" className="font-medium text-primary text-end"> 
                Supprimer
            </button>
        )}
        </>
    )
}

export function CheckOutButton(){
    const {pending} = useFormStatus()
    return(
        <>
            {pending ?(
                <Button size="lg" className="w-full mt-5">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Veuillez patienter
                </Button>
            ):(
                <Button type='submit' size="lg" className="w-full mt-5">
                    Valider mon panier
                </Button>
            )}
        </>
    )
}