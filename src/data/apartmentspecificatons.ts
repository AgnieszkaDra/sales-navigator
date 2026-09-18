import type { Property } from "../types";

export const apartmentSpecifications = [
  {
    key: "area",
    label: "METRAŻ",
    getValue: (property: Property) => property.area,
  },
  {
    key: "rooms",
    label: "POKOJE",
    getValue: (property: Property) => property.rooms,
  },
  {
    key: "floor",
    label: "PIĘTRO",
    getValue: (property: Property) => property.features?.floor,
  },
  {
    key: "price",
    label: "CENA",
    getValue: (property: Property) =>
      property.price
        ?.toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
  },
];