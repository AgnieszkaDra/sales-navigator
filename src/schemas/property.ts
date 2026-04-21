import { z } from "zod";

export const PropertySchema = z.object({
  id: z.string(),

  title: z.string().min(1),
  location: z.string().min(1),

  price: z.number(),

  status: z.enum(["available", "reserved", "sold"]),

  floor: z.number(),
  area: z.number(),
  rooms: z.number(),

  features: z.object({
    balcony: z.boolean(),
    terrace: z.boolean(),
    wardrobe: z.boolean(),
    separateKitchen: z.boolean(),
  }),
});