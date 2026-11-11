import type { Property } from "@/schemas/property";
import { ranges, type DraftFilters } from "../schemas/filters";

export const filterProperties = (
  properties: Property[],
  filters: DraftFilters
) => {
  return properties
    .filter((p) =>
      filters.status === "all" ||
      p.status === filters.status
    )
    .filter((p) =>
      !filters.onlyBalcony ||
      p.features?.balcony
    )
    .filter((p) =>
      filters.rooms === "all" ||
      (filters.rooms === "4+"
        ? p.rooms >= 4
        : p.rooms === Number(filters.rooms))
    )
    .filter((p) => {
      if (filters.area === "all") return true;

        const [min, max] = ranges[filters.area];

        return filters.area === "0-30"
            ? p.area <= max
            : filters.area === "100+"
            ? p.area > min
            : p.area > min && p.area <= max;
    })
    .sort((a, b) => {
      if (!a.price) return 1;
      if (!b.price) return -1;

      return filters.priceOrder === "asc"
        ? a.price - b.price
        : b.price - a.price;
    });
};