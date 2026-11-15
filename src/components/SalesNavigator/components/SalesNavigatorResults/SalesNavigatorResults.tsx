import { Link } from "react-router-dom";

import type { Status } from "../../schemas/filters";
import { STATUS_LABELS } from "../../constants";

type SalesNavigatorResult = {
  id: string | number;
  title?: string;
  name?: string;
  image?: string;
  status: Status;
  area?: number;
  floor?: number | string;
  rooms?: number;
  price?: number;
};

type Props = {
  results: SalesNavigatorResult[];
  loading?: boolean;
  emptyMessage?: string;
};

// Tworzenie adresu oferty
const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

// Pojedyncza karta mieszkania
const SalesNavigatorResultCard = ({
  item,
}: {
  item: SalesNavigatorResult;
}) => {
  const title = item.title || item.name || `Mieszkanie ${item.id}`;
  const slug = slugify(item.title || item.name || "") || item.id;
  const offerPath = `/oferta/${slug}`;

  return (
    <div 
      className="
      sales-navigator-results__item 
      grid__item 
      padding-item
      "
    >
      <article 
        className="
        sales-navigator-results__card
        "
      >
        {/* Status */}
        <div className="sales-navigator-results__top">
          <span
            className={`
            sales-navigator-results__status 
            h5-lead 
            sales-navigator-results__status--${item.status} 
            padding-item 
            uppercase
            `}
          >
            {STATUS_LABELS[item.status]}
          </span>
        </div>

        {/* Zdjęcie */}
        {item.image && (
          <Link
            to={offerPath}
            target="_blank"
            rel="noopener noreferrer"
            className="sales-navigator-results__image-link"
            aria-label={`Otwórz ofertę: ${title}`}
          >
            <div className="sales-navigator-results__image-wrapper">
              <img
                src={item.image}
                alt=""
                className="sales-navigator-results__image"
                loading="lazy"
              />
            </div>
          </Link>
        )}

        {/* Nazwa */}
        <h4 className="uppercase h4-title">
          {title}
        </h4>

        {/* Cena */}
        {item.price != null && (
          <div className="
          sales-navigator-results__price 
          btn 
          padding-item">
            {item.price.toLocaleString("pl-PL")} zł
          </div>
        )}

        {/* Parametry */}
        <div className="sales-navigator-results__table-wrapper">
          <table
            className="sales-navigator-results__tabl"
            aria-label={`Parametry mieszkania: ${title}`}
          >
            <thead>
              <tr 
                className="
                sales-navigator-results__table-row 
                sales-navigator-results__table-row--header
                "
              >
                <th scope="col" 
                  className="
                  padding-item 
                  background-smokeWhite
                  "
                >
                  Pokoje
                </th>
                <th 
                  scope="col" 
                  className="
                  padding-item 
                  background-smokeWhite
                  "
                >
                  Powierzchnia
                </th>
              </tr>
            </thead>

            <tbody>
              <tr 
                className="
                sales-navigator-results__table-row
                "
              >
                <td className="sales-navigator-results__table-cell">
                  {item.rooms ?? "—"}
                </td>
                <td className="sales-navigator-results__table-cell">
                  {item.area != null ? `${item.area} m²` : "—"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Przycisk */}
        <div className="sales-navigator-results__actions">
          <Link
            to={offerPath}
            target="_blank"
            rel="noopener noreferrer"
            className="
            sales-navigator-results__button 
            btn 
            padding-item
            "
          >
            Zobacz mieszkanie
          </Link>
        </div>

      </article>
    </div>
  );
};

const SalesNavigatorResults = ({
  results = [],
  loading = false,
  emptyMessage = "Brak wyników",
}: Props) => {

  // Ładowanie wyników
  if (loading) {
    return (
      <div
        className="
        sales-navigator-results 
        sales-navigator-results--loading
        "
        role="status"
        aria-live="polite"
      >
        Ładowanie wyników...
      </div>
    );
  }

  // Brak wyników
  if (!results.length) {
    return (
      <div
        className="
        sales-navigator-results 
        sales-navigator-results--empty
        "
        role="status"
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <section
      className="sales-navigator-results"
      aria-labelledby="search-results-heading"
    >
      <h4
        className="
        h2-header 
        uppercase 
        sales-navigator-results__title
        "
        id="search-results-heading"
      >
        Wyniki wyszukiwania ({results.length})
      </h4>

      <div 
        className="
        sales-navigator-results 
        grid 
        grid--1-col 
        grid--2-col-tablet-down 
        grid--3-col-desktop 
        padding-top-standard
        "
      >
        {results.map((item) => (
          <SalesNavigatorResultCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
};

export default SalesNavigatorResults;