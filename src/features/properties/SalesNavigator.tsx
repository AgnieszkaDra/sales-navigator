import { useState, useRef } from "react";
import { useProperties } from "../../useProperties";
import "../../styles/sales-navigator.scss";
import CustomSelect from "./CustomSelect";

function PropertyCard({ p }) {
  return (
    <div className="card">
      <h3>{p.title || "Brak tytułu"}</h3>
      <p>📍 {p.location || "Brak lokalizacji"}</p>
      <p>💰 {p.price ? p.price.toLocaleString() + " zł" : "Brak ceny"}</p>
      <p>Status: {p.status || "nieznany"}</p>
      <p>Piętro: {p.floor ?? "brak danych"}</p>
      <p>Pokoje: {p.rooms ?? "brak danych"}</p>
      <p>Balkon: {p.features?.balcony ? "tak" : "nie"}</p>
      <p>Parking: {p.features?.parking ? "tak" : "nie"}</p>
      <p>Winda: {p.features?.elevator ? "tak" : "nie"}</p>
    </div>
  );
}

const SalesNavigator = () => {
  const { properties } = useProperties();
  const listRef = useRef(null);

  const [draft, setDraft] = useState({
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

  const [filters, setFilters] = useState(draft);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  
  if (!properties) return <p>Ładowanie...</p>;

  const filtered = (() => {
    let result = properties;

    if (filters.onlyBalcony) {
      result = result.filter((p) => p.features?.balcony);
    }

    if (filters.status !== "all") {
      result = result.filter((p) => p.status === filters.status);
    }

    result = [...result].sort((a, b) => {
      if (!a.price) return 1;
      if (!b.price) return -1;

      return filters.priceOrder === "asc"
        ? a.price - b.price
        : b.price - a.price;
    });

    return result;
  })();

  return (
    <section className="sales-navigator section">
      <div className="elementor-container">
        <h3 className="h1-header sales-navigator__title elementor-heading-title">
          Znajdź mieszkanie
        </h3>
      </div>

      <div className="sales-navigator__content hero-inner page-width">
        <div className="searcher
        grid grid--1-col grid--2-col-tablet-down grid--3-col-desktop
        "
        >
          <div className="grid__item">
            <CustomSelect
              value={draft.status}
              onChange={(value) =>
                setDraft((prev) => ({ ...prev, status: value }))
              }
              options={[
                { value: "all", label: "Status lokalu" },
                { value: "available", label: "Dostępne" },
                { value: "sold", label: "Sprzedane" },
                { value: "reserved", label: "Zarezerwowane" },
              ]}
            />
          </div>

          <div className="grid__item">
            <CustomSelect
              value={draft.priceOrder}
              onChange={(value) =>
                setDraft((prev) => ({ ...prev, priceOrder: value }))
              }
              options={[
                { value: "asc", label: "Cena rosnąco" },
                { value: "desc", label: "Cena malejąco" },
              ]}
            />
          </div>
          <div className="grid__item">
            <CustomSelect
              value={draft.rooms}
              onChange={(rooms) =>
                setDraft((prev) => ({ ...prev, rooms }))
              }
              options={[
                { value: "all", label: "Liczba pokoi" },
                { value: "1", label: "1 pokój" },
                { value: "2", label: "2 pokoje" },
                { value: "3", label: "3 pokoje" },
                { value: "4+", label: "4+ pokoje" },
              ]}
            />
          </div>
          <div className="grid__item">
            <CustomSelect
              value={draft.area}
              onChange={(area) =>
                setDraft((prev) => ({ ...prev, area }))
              }
              options={[
                { value: "all", label: "Powierzchnia" },
                { value: "0-30", label: "do 30 m²" },
                { value: "30-50", label: "30–50 m²" },
                { value: "50-70", label: "50–70 m²" },
                { value: "70-100", label: "70–100 m²" },
                { value: "100+", label: "100+ m²" },
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
                    onlyBalcony: !prev.onlyBalcony,
                  }))
                }
              />
              Tylko z balkonem
            </label>
            <label className="filters__checkbox grid__item h5-input">
              <input
                type="checkbox"
                className="filters__input"
                checked={draft.onlyKitchen}
                onChange={() =>
                  setDraft((prev) => ({
                    ...prev,
                    onlyKitchen: !prev.onlyKitchen,
                  }))
                }
              />
              Osobna kuchnia
            </label>
            <label className="filters__checkbox grid__item h5-input">
              <input
                type="checkbox"
                className="filters__input"
                checked={draft.onlyTerrace}
                onChange={() =>
                  setDraft((prev) => ({
                    ...prev,
                    onlyTerrace: !prev.onlyTerrace,
                  }))
                }
              />
              Mieszkanie z tarasem
            </label>
            <label className="filters__checkbox grid__item h5-input">
              <input
                type="checkbox"
                className="filters__input"
                checked={draft.onlyWardrobe}
                onChange={() =>
                  setDraft((prev) => ({
                    ...prev,
                    onlyWardrobe: !prev.onlyWardrobe,
                  }))
                }
              />
              Garderoba
            </label>
            <label className="filters__checkbox grid__item h5-input">
              <input
                type="checkbox"
                className="filters__input"
                checked={draft.onlyParking}
                onChange={() =>
                  setDraft((prev) => ({
                    ...prev,
                    onlyParking: !prev.onlyParking,
                  }))
                }
              />
              Dodatkowy parking
            </label>
          </div>
        )}

        <div className="sales-navigator__actions">
          <button
            className="more-filters-button btn h5-input"
            onClick={() => setShowMoreFilters(prev => !prev)}
          >
            {showMoreFilters ? "Mniej filtrów" : "Więcej filtrów"}
          </button>

          <button
            className="search-button btn h5-input"
            onClick={() => {
              setFilters(draft);
              listRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Szukaj
          </button>
        </div>
        

        <div ref={listRef} className="list">
          {filtered.length === 0 ? (
            <p>Brak wyników</p>
          ) : (
            filtered.map((p) => (
              <PropertyCard key={p.id} p={p} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SalesNavigator;