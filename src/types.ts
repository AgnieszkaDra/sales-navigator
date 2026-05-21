// export const STATUS_LABELS = {
//   available: "Dostępny",
//   reserved: "Zarezerwowany",
//   sold: "Sprzedany",
// } as const;

// export type Property = {
//   id: string;

//   title: string;
//   location: string;
//   price: number;

//   status: keyof typeof STATUS_LABELS;
//   floor: number;
//   area: number;
//   rooms: number;

//   features: {
//     balcony: boolean;
//     terrace: boolean;
//     wardrobe: boolean;
//     separateKitchen: boolean;
//   };
// };

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
  location: z.string(),

  price: numberFromString,

  status: statusEnum,

  floor: numberFromString,
  area: numberFromString,
  rooms: numberFromString,

  features: z.object({
    balcony: booleanFromPolish,
    terrace: booleanFromPolish,
    wardrobe: booleanFromPolish,
    separateKitchen: booleanFromPolish,
  }),
});

export type Property = z.infer<typeof PropertySchema>;

