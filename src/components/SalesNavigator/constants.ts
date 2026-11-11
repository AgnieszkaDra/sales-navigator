import type { DraftFilters } from "./schemas/filters";


export const STATUS_LABELS = {
  available: "Dostępny",
  reserved: "Zarezerwowany",
  sold: "Sprzedany",
} as const;


export const statusOptions = [
  { value: "all", label: "Status lokalu" },
  {
    value: "available",
    label: STATUS_LABELS.available,
  },
  {
    value: "reserved",
    label: STATUS_LABELS.reserved,
  },
  {
    value: "sold",
    label: STATUS_LABELS.sold,
  },
] satisfies {
  value: DraftFilters["status"];
  label: string;
}[];

export const areaOptions = [
  { value: "all", label: "Powierzchnia" },
  { value: "0-30", label: "do 30 m²" },
  { value: "30-50", label: "30–50 m²" },
  { value: "50-70", label: "50–70 m²" },
  { value: "70-100", label: "70–100 m²" },
  { value: "100+", label: "100+ m²" },
] satisfies {
  value: DraftFilters["area"];
  label: string;
}[];



export const priceOrderOptions = [
  { value: "asc", label: "Cena rosnąco" },
  { value: "desc", label: "Cena malejąco" },
] satisfies {
  value: DraftFilters["priceOrder"];
  label: string;
}[];

export const extraFilters = [
  {
    key: "onlyBalcony",
    label: "Mieszkanie z balkonem",
  },
  {
    key: "onlyTerrace",
    label: "Mieszkanie z tarasem",
  },
  {
    key: "onlyKitchen",
    label: "Mieszkanie z osobną kuchnią",
  },
  {
    key: "onlyWardrobe",
    label: "Mieszkanie z osobną garderobą",
  },
] as const satisfies {
  key: keyof Pick<
    DraftFilters,
    "onlyBalcony" | "onlyTerrace" | "onlyKitchen" | "onlyWardrobe"
  >;
  label: string;
}[];

export const initialFilters: DraftFilters = {
  status: "all",
  priceOrder: "asc",
  onlyBalcony: false,
  onlyKitchen: false,
  onlyTerrace: false,
  onlyWardrobe: false,
  onlyParking: false,
  rooms: "all",
  area: "all",
};

export const roomOptions = [
  { value: "all", label: "Liczba pokoi" },
  { value: "1", label: "1 pokój" },
  { value: "2", label: "2 pokoje" },
  { value: "3", label: "3 pokoje" },
  { value: "4+", label: "4+ pokoje" },
] satisfies {
  value: DraftFilters["rooms"];
  label: string;
}[];