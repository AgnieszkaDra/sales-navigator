import { useState, useRef, useMemo, useCallback } from "react";

import { useProperties } from "../../useProperties";

import {
  CustomSelect,
  SalesNavigatorResults,
  FilterCheckbox,
} from "./components";

import {
  areaOptions,
  statusOptions,
  priceOrderOptions,
  extraFilters,
  initialFilters,
  roomOptions,
} from "./constants";

import type { DraftFilters } from "./schemas/filters";

import { filterProperties } from "./utils/filterProperties";

import "../../styles/sales-navigator.scss";

const SalesNavigator = () => {
  
  const { properties } = useProperties();

  const listRef = useRef<HTMLDivElement | null>(null);

  const [draft, setDraft] = useState<DraftFilters>(initialFilters);
  const [filters, setFilters] = useState<DraftFilters>(initialFilters);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Aktualizacja pojedynczego filtra
  const updateDraft = useCallback(
    <K extends keyof DraftFilters,>(
      key: K,
      value: DraftFilters[K]
    ) => {
      setDraft((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  // Filtrowanie mieszkań
  const filtered = useMemo(
    () => properties
      ? filterProperties(properties, filters)
      : [],
    [properties, filters]
  );

  if (!properties) {
    return <p>Ładowanie...</p>;
  }

  return (
    <section
      className="sales-navigator section"
      aria-labelledby="sales-navigator-title"
    >
      <div className="elementor-container">
        <h1
          id="sales-navigator-title"
          className="h1-header sales-navigator__title uppercase"
        >
          Znajdź mieszkanie
        </h1>
      </div>

      <div className="page-width">

        {/* Podstawowe filtry */}
        <div
          role="group"
          aria-label="Filtry wyszukiwania mieszkań"
          className="
            searcher
            grid
            grid--1-col
            grid--2-col-tablet-down
            grid--3-col-desktop
            padding-top-standard
          "
        >
          <div className="grid__item">
            <CustomSelect
              filterKey="status"
              value={draft.status}
              updateDraft={updateDraft}
              options={statusOptions}
            />
          </div>

          <div className="grid__item">
            <CustomSelect
              filterKey="priceOrder"
              value={draft.priceOrder}
              updateDraft={updateDraft}
              options={priceOrderOptions}
            />
          </div>

          <div className="grid__item">
            <CustomSelect
              filterKey="rooms"
              value={draft.rooms}
              updateDraft={updateDraft}
              options={roomOptions}
            />
          </div>

          <div className="grid__item">
            <CustomSelect
              filterKey="area"  
              value={draft.area}
              updateDraft={updateDraft}
              options={areaOptions}
            />
          </div>
        </div>

        {/* Dodatkowe filtry */}
        {showMoreFilters && (
          <div
            className="
              filters__more
              grid
              grid--2-col
              grid--3-col-tablet-down
              grid--4-col-desktop
            "
          >
            {extraFilters.map(({ key, label }) => (
              <FilterCheckbox
                key={key}
                filterKey={key}
                label={label}
                checked={draft[key]}
                updateDraft={updateDraft}
              />
            ))}
          </div>
        )}

        {/* Przyciski */}
        <div className="sales-navigator__actions padding-top-standard">
          <button
            className="more-filters-button btn padding-item"
            onClick={() => setShowMoreFilters((prev) => !prev)}
            aria-expanded={showMoreFilters}
          >
            {showMoreFilters ? "Mniej filtrów" : "Więcej filtrów"}
          </button>

          <button
            className="search-button btn padding-item"
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

        {/* Wyniki */}
        <div ref={listRef}>
          <SalesNavigatorResults results={filtered} />
        </div>

      </div>
    </section>
  );
};

export default SalesNavigator;