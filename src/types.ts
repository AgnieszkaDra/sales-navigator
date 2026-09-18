import { z } from "zod";

export const STATUS_LABELS = {
  available: "Dostępny",
  reserved: "Zarezerwowany",
  sold: "Sprzedany",
} as const;


export const statusEnum = z.enum(["available", "reserved", "sold"]);

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

