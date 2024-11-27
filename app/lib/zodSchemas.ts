import {z} from 'zod';

export const productSchema = z.object({
    name: z.string(),
  description: z.string(),
  status: z.enum(["brouillon", "publie","archived"]),
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