import { deleteProduct } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface Params{
    id: string;
}

export default async function deleteRoute({
    params,
}:{
    params: Promise<Params>;
}){
    const {id} =  await params;
    return (
        <div className="h-[80vh] w-full flex items-center justify-center">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle> Es-tu certain de vouloir supprimer ce produit?</CardTitle>
                    <CardDescription>
                        Cette action est irréverssible, la suppression est permanente et 
                        le produit et ses données seront supprimés de la base de données.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between">
                    <Button variant="secondary" asChild><Link href="/dashboard/products">Abandonner</Link></Button>
                    <form action={deleteProduct}>
                        <input type="hidden" name="productId" value={id}/>
                        <SubmitButton  variant="destructive" text="Delete"/>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}