import { z } from "zod";

export const PropertySchema = z.object({
  id: z.string(),

  title: z.string().min(1),
  location: z.string().min(1).optional(),

  price: z.number(),

  status: z.enum(["available", "reserved", "sold"]),

  area: z.number(),
  rooms: z.number(),

  features: z.object({
    floor: z.string().optional(),
    balcony: z.boolean().optional(),
    terrace: z.boolean().optional(),
    wardrobe: z.boolean().optional(),
    separateKitchen: z.boolean().optional(),
  }),
});