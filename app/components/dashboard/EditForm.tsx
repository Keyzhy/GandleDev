"use client";

import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "../SubmitButtons";
import { categories } from "@/app/lib/categories";
import { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { editProduct } from "@/app/actions";
import Image from "next/image";
import { type $Enums } from "@prisma/client";

interface iAppProps {
     data: {
        name: string;
        description: string;
        status: $Enums.ProductStatus;
        price: number;
        images: string[];
        stock: number;
        category: $Enums.Category;
        isFeatured: boolean;
        id: string;
    };
}

export function EditForm({ data }: iAppProps){
    const[images, setImages] = useState<string[]>(data.images);
    const [lastResult, action] = useActionState(editProduct, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({formData}){
            return parseWithZod(formData,{schema: productSchema});
        },

        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    });

    const handleDelete = (index: number) =>{
        setImages(images.filter((_,i) => i !== index));
    }

    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <input type="hidden" name="productId" value={data.id} />
            <div className="flex intems-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/products">
                    <ChevronLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">Nouveau produit</h1>
            </div>

            <Card className="mt-5">
                <CardHeader >
                    <CardTitle> Modifier le produit</CardTitle>
                    <CardDescription>Ce formulaire permet de modifier un produit</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-6">
                            <Label className=" text-l text-bold">Nom</Label>
                            <Input 
                                type="text"
                                key={fields.name.key}
                                name={fields.name.name}
                                defaultValue={data.name}
                                className="w-full"
                                placeholder="Nom du produit"
                            />
                            <p className="text-red-500">{fields.name.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Description</Label>
                            <Textarea key={fields.description.key}
                                name={fields.description.name}
                                defaultValue={data.description}
                                placeholder="Ajouter une description ici..."
                                />
                                <p className="text-red-500">{fields.description.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Prix</Label>
                            <Input key={fields.price.key}
                                type="number"
                                name={fields.price.name}
                                defaultValue={data.price} 
                                placeholder="Entrer le plix ici..."
                                />
                                <p className="text-red-500">{fields.price.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Stock</Label>
                            <Input key={fields.stock.key}
                                type="number"
                                name={fields.stock.name}
                                defaultValue={data.stock} 
                                placeholder="Entrer le stock ici..."
                                />
                                <p className="text-red-500">{fields.stock.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Nouveautée</Label>
                            <Switch key={fields.isFeatured.key}
                                name={fields.isFeatured.name}
                                defaultChecked={data.isFeatured}
                                />
                                <p className="text-red-500">{fields.isFeatured.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Status</Label>
                            <Select key={fields.status.key}
                                name={fields.status.name}
                                defaultValue={data.status}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="brouillon">Brouillon</SelectItem>
                                    <SelectItem value="publie">Publier</SelectItem>
                                    <SelectItem value="archived">Archivé</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-red-500">{fields.status.errors}</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Catégorie</Label>
                            <Select 
                                key={fields.category.key}
                                name={fields.category.name}
                                defaultValue={data.category}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner une catégorie"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category)=>(
                                        <SelectItem key={category.id} value={category.name}>
                                            {category.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-red-500">{fields.category.errors}</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Images</Label>
                            <input type ="hidden" 
                                value={images} 
                                key={fields.images.key} 
                                name={fields.images.name}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                defaultValue={fields.images.initialValue as any}
                                />
                            {images.length > 0 ? (
                                <div className="flex gap-5">
                                   {images.map((image,index)=>(
                                    <div className="relative w-[100px] h-[100px]">
                                        <Image 
                                            height={100} 
                                            width={100} 
                                            src={image} 
                                            alt="Product Image"
                                            className="w-full h-full object-cover rounded-lg border"
                                        />
                                        <button
                                            onClick={()=> handleDelete(index)}
                                            type="button" 
                                            className="absolute -top-3 -right-3 bg-red-500 rounded-lg text-white">
                                            <XIcon className="w-3 h-3"/>
                                        </button>
                                    </div>
                                   ))} 
                                </div>
                            ):(
                                <UploadDropzone endpoint="imageUploader" onClientUploadComplete={(res) =>{
                                    setImages(res.map((r) => r.url));
                                }}
                                onUploadError={()=>{
                                    alert('Un problème est survenu')
                                }}/>
                            )}
                            <p className="text-red-500">{fields.images.errors}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Modifier le produit" />
                </CardFooter>
            </Card>
        </form>
    )
}