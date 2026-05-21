import { STATUS_LABELS } from "../../types";
import type { Status } from "./CustomSelect";

type SalesNavigatorResult = {
  id: string | number;
  title?: string;
  name?: string;
  image?: string;
  status: Status;
  area?: number;
  floor?: number | string;
  price?: number;
};

type Props = {
  results: SalesNavigatorResult[];
  loading?: boolean;
  emptyMessage?: string;
};

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const SalesNavigatorResults = ({
  results = [],
  loading = false,
  emptyMessage = "Brak wyników",
}: Props) => {
  if (loading) {
    return (
      <div className="sales-navigator-results sales-navigator-results--loading">
        Ładowanie...
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="sales-navigator-results sales-navigator-results--empty">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="sales-navigator-results">
      <div className="sales-navigator-results__grid grid grid--1-col grid--2-col-tablet-down grid--3-col-desktop">
        {results.map((item) => {
          const slug = slugify(item.title || '');

          return (
            <div
              key={item.id}
              className="sales-navigator-results__item grid__item"
            >
              <div className="sales-navigator-results__card">
                <div className="sales-navigator-results__top">
                  <span
                    className={`sales-navigator-results__status sales-navigator-results__status--${item.status}`}
                  >
                    {STATUS_LABELS[item.status]}
                  </span>

                  
                </div>

                {/* IMAGE LINK */}
                <a
                  href={`/oferta/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sales-navigator-results__image-link"
                >
                  <div className="sales-navigator-results__image-wrapper">
                    <img
                      src={item.image}
                      alt={item.title || item.name}
                      className="sales-navigator-results__image"
                    />
                  </div>
                </a>

                <h3 className="sales-navigator-results__title">
                  {item.title || ''}
                </h3>

                <div className="sales-navigator-results__meta">
                  <span>{item.area} m²</span>
                  <span>{item.floor} piętro</span>
                </div>

                <div className="sales-navigator-results__price">
                  {item.price?.toLocaleString("pl-PL")} zł
                </div>

                <a
                  href={`/oferta/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sales-navigator-results__button btn"
                >
                  Zobacz mieszkanie
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SalesNavigatorResults;