import {z} from 'zod';

export const productSchema = z.object({
    name: z.string(),
  description: z.string(),
  status: z.enum(["brouillon", "publie","archived"]),
  parfum: z.string(),
  poids: z.number().min(0),
  composition: z.string(),
  tempscombustion: z.number().min(0),
  contenance: z.number().min(0),
  price: z.number().min(1),
  images: z.array(z.string()).min(1, "Publier au moins une image"),
  stock: z.number().min(1),
  category: z.enum(["bougies", "fondants","desodorisants"]),
  isFeatured: z.boolean().optional(),
});

export const bannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
})

export const orderSchema = z.object({
  statuscomm: z.enum(["nontraite", "horsstock", "delaisapporvisionnement", "preparation", "attenteenvoi", "communiquetransporteur"]),
})