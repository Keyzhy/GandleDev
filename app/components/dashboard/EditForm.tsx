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
     productdata: {
        name: string;
        description: string;
        status: $Enums.ProductStatus;
        parfum: string;
        poids: number;
        composition: string;
        tempscombustion: number;
        contenance: number;
        price: number;
        images: string[];
        stock: number;
        category: $Enums.Category;
        isFeatured: boolean;
        id: string;
    };
}

export function EditForm({  productdata }: iAppProps){
    const[images, setImages] = useState<string[]>(productdata.images);
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
            <input type="hidden" name="productId" value={productdata.id} />
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
                            <Label className=" text-lg text-bold">Nom</Label>
                            <Input 
                                type="text"
                                key={fields.name.key}
                                name={fields.name.name}
                                defaultValue={productdata.name}
                                className="w-full"
                                placeholder="Nom du produit"
                            />
                            <p className="text-red-500">{fields.name.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                        <Label className=" text-lg text-bold">Description</Label>
                            <Textarea key={fields.description.key}
                                name={fields.description.name}
                                defaultValue={productdata.description}
                                placeholder="Ajouter une description ici..."
                                />
                                <p className="text-red-500">{fields.description.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label className=" text-lg text-bold">Prix</Label>
                            <Input key={fields.price.key}
                                type="number"
                                name={fields.price.name}
                                defaultValue={productdata.price} 
                                placeholder="Entrer le plix ici..."
                                />
                                <p className="text-red-500">{fields.price.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                        <Label className=" text-lg text-bold">Stock</Label>
                            <Input key={fields.stock.key}
                                type="number"
                                name={fields.stock.name}
                                defaultValue={productdata.stock} 
                                placeholder="Entrer le stock ici..."
                                />
                                <p className="text-red-500">{fields.stock.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                        <Label className=" text-lg text-bold">Nouveauté</Label>
                            <Switch key={fields.isFeatured.key}
                                name={fields.isFeatured.name}
                                defaultChecked={productdata.isFeatured}
                                />
                                <p className="text-red-500">{fields.isFeatured.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                        <Label className=" text-lg text-bold">Status</Label>
                            <Select key={fields.status.key}
                                name={fields.status.name}
                                defaultValue={productdata.status}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="brouillon">Brouillon</SelectItem>
                                    <SelectItem value="publie">Publier</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-red-500">{fields.status.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label className=" text-lg text-bold">Parfum</Label>
                            <Input 
                                type="text"
                                key={fields.parfum.key}
                                name={fields.parfum.name}
                                defaultValue={productdata.parfum}
                                className="w-full"
                                placeholder="Nom du produit"
                            />
                            <p className="text-red-500">{fields.parfum.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label className=" text-lg text-bold">Poids </Label>
                            <Input 
                                type="text"
                                key={fields.poids.key}
                                name={fields.poids.name}
                                defaultValue={productdata.poids}
                                className="w-full"
                                placeholder="Nom du produit"
                            />
                            <Label className="text-m">grammes</Label>
                            <p className="text-red-500">{fields.poids.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label className=" text-lg text-bold">Composition</Label>
                            <Textarea
                                key={fields.composition.key}
                                name={fields.composition.name}
                                defaultValue={productdata.composition}
                                className="w-full"
                                placeholder="Nom du produit"
                            />
                            <p className="text-red-500">{fields.composition.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label className=" text-lg text-bold">Temps de combustion</Label>
                            <Input 
                                type="text"
                                key={fields.tempscombustion.key}
                                name={fields.tempscombustion.name}
                                defaultValue={productdata.tempscombustion}
                                className="w-full"
                                placeholder="Nom du produit"
                            />
                            <p className="text-red-500">{fields.tempscombustion.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label className=" text-lg text-bold">Contenance</Label>
                            <Input 
                                type="text"
                                key={fields.contenance.key}
                                name={fields.contenance.name}
                                defaultValue={productdata.contenance}
                                className="w-full"
                                placeholder="Nom du produit"
                            />
                            <p className="text-red-500">{fields.contenance.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                        <Label className=" text-lg text-bold">Catégorie</Label>
                            <Select 
                                key={fields.category.key}
                                name={fields.category.name}
                                defaultValue={productdata.category}
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
                        <Label className=" text-lg text-bold">Images</Label>
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
                                    <div key={index} className="relative w-[100px] h-[100px]">
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