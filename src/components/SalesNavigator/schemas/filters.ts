import { z } from "zod";

export const statusEnum = z.enum([
  "available",
  "reserved",
  "sold",
]);

export type Status = z.infer<typeof statusEnum>;

export const ranges = {
  "0-30": [0, 30],
  "30-50": [30, 50],
  "50-70": [50, 70],
  "70-100": [70, 100],
  "100+": [100, Infinity],
} as const;

export type Area = "all" | keyof typeof ranges;

export type DraftFilters = {
  status: Status | "all";
  priceOrder: "asc" | "desc";
  onlyBalcony: boolean;
  onlyKitchen: boolean;
  onlyTerrace: boolean;
  onlyWardrobe: boolean;
  onlyParking: boolean;
  rooms: "all" | "1" | "2" | "3" | "4+";
  area:
    | "all"
    | "0-30"
    | "30-50"
    | "50-70"
    | "70-100"
    | "100+";
};