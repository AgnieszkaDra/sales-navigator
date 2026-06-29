import { useState, useRef } from "react";
import { useProperties } from "../../useProperties";
import "../../styles/sales-navigator.scss";
import { STATUS_LABELS } from "../../types";

import CustomSelect, {
  type Status
}
  from "./CustomSelect";

import SalesNavigatorResults from "./SalesNavigatorResults";

type DraftFilters = {
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

const statusOptions = [
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

const SalesNavigator = () => {
  const { properties } = useProperties();

  const listRef = useRef<HTMLDivElement | null>(
    null
  );

  const [draft, setDraft] =
    useState<DraftFilters>({
      status: "all",
      priceOrder: "asc",
      onlyBalcony: false,
      onlyKitchen: false,
      onlyTerrace: false,
      onlyWardrobe: false,
      onlyParking: false,
      rooms: "all",
      area: "all",
    });

  const [filters, setFilters] =
    useState<DraftFilters>(draft);
  
  const [showMoreFilters, setShowMoreFilters] =
    useState(false);

  if (!properties) {
    return <p>Ładowanie...</p>;
  }

  // const filtered = (() => {
  //   let result = properties;

  //   if (filters.onlyBalcony) {
  //     result = result.filter(
  //       (p) => p.features?.balcony
  //     );
  //   }

  //   if (filters.status !== "all") {
  //     result = result.filter(
  //       (p) => p.status === filters.status
  //     );
  //   }

  //   result = [...result].sort((a, b) => {
  //     if (!a.price) return 1;
  //     if (!b.price) return -1;

  //     return filters.priceOrder === "asc"
  //       ? a.price - b.price
  //       : b.price - a.price;
  //   });

  //   return result;
  // })();

  const filtered = (() => {
  let result = [...properties];

  // Status
  if (filters.status !== "all") {
    result = result.filter(
      (p) => p.status === filters.status
    );
  }

  // Balkon
  if (filters.onlyBalcony) {
    result = result.filter(
      (p) => p.features?.balcony
    );
  }

  // Liczba pokoi
  if (filters.rooms !== "all") {
    result = result.filter((p) => {
      if (filters.rooms === "4+") {
        return p.rooms >= 4;
      }

      return p.rooms === Number(filters.rooms);
    });
  }

  // Powierzchnia
  if (filters.area !== "all") {
    result = result.filter((p) => {
      const area = p.area;

      switch (filters.area) {
        case "0-30":
          return area <= 30;
        case "30-50":
          return area > 30 && area <= 50;
        case "50-70":
          return area > 50 && area <= 70;
        case "70-100":
          return area > 70 && area <= 100;
        case "100+":
          return area > 100;
        default:
          return true;
      }
    });
  }

  // Sortowanie
  result.sort((a, b) => {
    if (!a.price) return 1;
    if (!b.price) return -1;

    return filters.priceOrder === "asc"
      ? a.price - b.price
      : b.price - a.price;
  });

  return result;
})();
  return (
    <section
      className="sales-navigator section"
      aria-labelledby="sales-navigator-title"
    >
      <div className="elementor-container">
        <h3
          id="sales-navigator-title"
          className="h1-header sales-navigator__title"
        >
          Znajdź mieszkanie
        </h3>
      </div>

      <div className="sales-navigator__content hero-inner page-width">
        <div
          role="group"
          aria-label="Filtry wyszukiwania mieszkań"
          className="
            searcher
            grid
            grid--1-col
            grid--2-col-tablet-down
            grid--3-col-desktop
            "
          aria-labelledby="filters-heading"
        >
          <div className="grid__item">
            <CustomSelect<DraftFilters["status"]>
              value={draft.status}
              onChange={(value) =>
                setDraft((prev) => ({
                  ...prev,
                  status: value,
                }))
              }
              options={statusOptions}
            />
          </div>

          <div className="grid__item">
            <CustomSelect<"asc" | "desc">
              value={draft.priceOrder}
              onChange={(value) =>
                setDraft((prev) => ({
                  ...prev,
                  priceOrder: value,
                }))
              }
              options={[
                {
                  value: "asc",
                  label: "Cena rosnąco",
                },
                {
                  value: "desc",
                  label: "Cena malejąco",
                },
              ]}
            />
          </div>

          <div className="grid__item">
            <CustomSelect<DraftFilters["rooms"]>
              value={draft.rooms}
              onChange={(rooms) =>
                setDraft((prev) => ({
                  ...prev,
                  rooms,
                }))
              }
              options={[
                {
                  value: "all",
                  label: "Liczba pokoi",
                },
                {
                  value: "1",
                  label: "1 pokój",
                },
                {
                  value: "2",
                  label: "2 pokoje",
                },
                {
                  value: "3",
                  label: "3 pokoje",
                },
                {
                  value: "4+",
                  label: "4+ pokoje",
                },
              ]}
            />
          </div>

          <div className="grid__item">
            <CustomSelect<DraftFilters["area"]>
              value={draft.area}
              onChange={(area) =>
                setDraft((prev) => ({
                  ...prev,
                  area,
                }))
              }
              options={[
                {
                  value: "all",
                  label: "Powierzchnia",
                },
                {
                  value: "0-30",
                  label: "do 30 m²",
                },
                {
                  value: "30-50",
                  label: "30–50 m²",
                },
                {
                  value: "50-70",
                  label: "50–70 m²",
                },
                {
                  value: "70-100",
                  label: "70–100 m²",
                },
                {
                  value: "100+",
                  label: "100+ m²",
                },
              ]}
            />
          </div>
        </div>

        {showMoreFilters && (
          <div className="filters__more grid grid--2-col grid--3-col-tablet-down grid--4-col-desktop">
            <label className="filters__checkbox grid__item h5-input">
              <input
                type="checkbox"
                className="filters__input"
                checked={draft.onlyBalcony}
                onChange={() =>
                  setDraft((prev) => ({
                    ...prev,
                    onlyBalcony:
                      !prev.onlyBalcony,
                  }))
                }
              />
              Mieszkanie z balkonem
            </label>
            <label className="filters__checkbox grid__item h5-input">
              <input
                type="checkbox"
                className="filters__input"
                checked={draft.onlyTerrace}
                onChange={() =>
                  setDraft((prev) => ({
                    ...prev,
                    onlyTerrace:
                      !prev.onlyTerrace,
                  }))
                }
              />
              Mieszkanie z tarasem
            </label>
            <label className="filters__checkbox grid__item h5-input">
              <input
                type="checkbox"
                className="filters__input"
                checked={draft.onlyKitchen}
                onChange={() =>
                  setDraft((prev) => ({
                    ...prev,
                    onlyKitchen:
                      !prev.onlyKitchen,
                  }))
                }
              />
              Mieszkanie z osobną kuchnią
            </label>
            <label className="filters__checkbox grid__item h5-input">
              <input
                type="checkbox"
                className="filters__input"
                checked={draft.onlyWardrobe}
                onChange={() =>
                  setDraft((prev) => ({
                    ...prev,
                    onlyWardrobe:
                      !prev.onlyWardrobe,
                  }))
                }
              />
              Mieszkanie z osobną gardeobą
            </label>
            <label className="filters__checkbox grid__item h5-input">
              <input
                type="checkbox"
                className="filters__input"
                checked={draft.onlyWardrobe}
                onChange={() =>
                  setDraft((prev) => ({
                    ...prev,
                    onlyWardrobe:
                      !prev.onlyWardrobe,
                  }))
                }
              />
              Mieszkanie z osobną gardeobą
            </label>
          </div>
        )}

        <div className="sales-navigator__actions">
          <button
            className="more-filters-button btn h5-input"
            onClick={() =>
               setShowMoreFilters(
                (prev) => !prev
              )
            }
          >
            {showMoreFilters
              ? "Mniej filtrów"
              : "Więcej filtrów"}
          </button>

          <button
            className="search-button btn h5-input"
            onClick={() => {
              setFilters(draft);
              listRef.current?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Szukaj
          </button>
        </div>

        <SalesNavigatorResults
          results={filtered}
        />

        
      </div>
    </section>
  );
};

export default SalesNavigator;