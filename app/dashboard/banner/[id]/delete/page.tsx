import { deleteBanner } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export default function deleteBannerRoute({params}: {params: {id: string}}){
    return (
        <div className="h-[80vh] w-full flex items-center justify-center">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle> Es-tu certain de vouloir supprimer cette bannière?</CardTitle>
                    <CardDescription>
                        Cette action est irréverssible, la suppression est permanente et 
                        la bannière et ses données seront supprimés de la base de données.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between">
                    <Button variant="secondary" asChild><Link href="/dashboard/banner">Abandonner</Link></Button>
                    <form action={deleteBanner}>
                        <input type="hidden" name="bannerId" value={params.id}/>
                        <SubmitButton  variant="destructive" text="Delete"/>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}