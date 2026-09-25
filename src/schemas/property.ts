import { z } from "zod";


const booleanFromPolish = z.preprocess((value) => {
  if (typeof value === "string") {
    return value.toLowerCase() === "tak";
  }

  return value;
}, z.boolean());

const numberFromString = z.preprocess((value) => {
  if (typeof value === "string") {
    return Number(value.replace(",", "."));
  }

  return value;
}, z.number());

export const statusEnum = z.enum(["available", "reserved", "sold"]);

export const PropertySchema = z.object({
  id: z.string(),

  title: z.string(),
  location: z.string().default("Brak lokalizacji"),

  price: numberFromString,

  status: statusEnum,

  area: numberFromString,
  rooms: numberFromString,

  floorPlan: z.string().optional(),

  features: z.object({
    floor: z.string().optional(),
    balcony: booleanFromPolish,
    terrace: booleanFromPolish,
    wardrobe: booleanFromPolish,
    separateKitchen: booleanFromPolish,
  }).optional(),
});

export type Property = z.infer<typeof PropertySchema>;

// export const PropertySchema = z.object({
//   id: z.string(),

//   title: z.string().min(1),
//   location: z.string().min(1).optional(),

//   price: z.number(),

//   status: z.enum(["available", "reserved", "sold"]),

//   area: z.number(),
//   rooms: z.number(),

//   floorPlan: z.string().optional(),

//   features: z.object({
//     floor: z.string().optional(),
//     balcony: z.boolean().optional(),
//     terrace: z.boolean().optional(),
//     wardrobe: z.boolean().optional(),
//     separateKitchen: z.boolean().optional(),
//   }),
// });

// export type Property = z.infer<typeof PropertySchema>;