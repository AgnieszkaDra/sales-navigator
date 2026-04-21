import { useState } from "react";
import { useProperties } from "../../useProperties";

function PropertyCard({ p }) {
  return (
    <div className="card">
      <h3>{p.title || "Brak tytułu"}</h3>

      <p>📍 {p.location || "Brak lokalizacji"}</p>

      <p>💰 {p.price ? p.price.toLocaleString() + " zł" : "Brak ceny"}</p>

      <p>Status: {p.status || "nieznany"}</p>

      <p>Piętro: {p.floor ?? "brak danych"}</p>

      <p>Pokoje: {p.rooms ?? "brak danych"}</p>

      <p>
        Balkon: {p.features?.balcony ? "tak" : "nie"}
      </p>

      <p>
        Parking: {p.features?.parking ? "tak" : "nie"}
      </p>

      <p>
        Winda: {p.features?.elevator ? "tak" : "nie"}
      </p>
    </div>
  );
}

const SalesNavigator = () => {
  const { properties } = useProperties();

  const [onlyBalcony, setOnlyBalcony] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  if (!properties) return <p>Ładowanie...</p>;

  // filtrowanie
  let filtered = properties;

  if (onlyBalcony) {
    filtered = filtered.filter((p) => p.features?.balcony);
  }

  // sortowanie
  filtered = [...filtered].sort((a, b) => {
    if (!a.price) return 1;
    if (!b.price) return -1;

    return sortOrder === "asc"
      ? a.price - b.price
      : b.price - a.price;
  });

  return (
    <div className="app">
      <h1>Nieruchomości</h1>

      {/* FILTRY */}
      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={onlyBalcony}
            onChange={() => setOnlyBalcony(!onlyBalcony)}
          />
          Tylko z balkonem
        </label>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Cena rosnąco</option>
          <option value="desc">Cena malejąco</option>
        </select>
      </div>

      {/* LISTA */}
      <div className="list">
        {filtered.length === 0 ? (
          <p>Brak wyników</p>
        ) : (
          filtered.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))
        )}
      </div>

     
    </div>
  );
};

export default SalesNavigator;