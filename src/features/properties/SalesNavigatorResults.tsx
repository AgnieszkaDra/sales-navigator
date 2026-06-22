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
  rooms?: number;
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
      <div
        className="sales-navigator-results sales-navigator-results--loading"
        aria-live="polite"
      >
        Ładowanie wyników...
      </div>
    );
  }

  if (!results.length) {
    return (
      <div
        className="sales-navigator-results sales-navigator-results--empty"
        role="status"
        aria-live="polite"
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="sales-navigator-results">
      <h4
        className="h2-header sales-navigator-results__title"
        id="search-results-heading"
      >
        Wyniki wyszukiwania ({results.length})
      </h4>
      <div
        role="list"
        className="sales-navigator-results__grid grid grid--1-col grid--2-col-tablet-down grid--3-col-desktop"
        aria-labelledby="search-results-heading"
      >
        {results.map((item) => {
          const slug = slugify(item.title || '');

          return (
              <div
                role="listitem"
                key={item.id}
                className="sales-navigator-results__item grid__item"
                aria-labelledby={`apartment-title-${item.id}`}
              >
                <div className="sales-navigator-results__card">
                  <div className="sales-navigator-results__top">
                    <span
                      className={`sales-navigator-results__status h5-lead sales-navigator-results__status--${item.status}`}
                      aria-label={`Status mieszkania: ${STATUS_LABELS[item.status]}`}
                    >
                      {STATUS_LABELS[item.status]}
                    </span>
                  </div>
                  <a
                    href={`/oferta/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sales-navigator-results__image-link"
                    aria-label={`Otwórz ofertę mieszkania ${item.title} w nowej karcie`}
            >
                    <div className="sales-navigator-results__image-wrapper">
                      <img
                        src={item.image}
                        alt=''
                        className="sales-navigator-results__image"
                      />
                    </div>
                  </a>

                  <h4 
                    id={`apartment-title-${item.id}`}
                    className="sales-navigator-results__title h4-title">
                    {item.title}
                  </h4>

                  <div className="sales-navigator-results__price btn h5-lead">
                    {item.price?.toLocaleString("pl-PL")} zł
                  </div>
                
                  <table 
                    className="sales-navigator-results__table"
                    aria-label={`Parametry mieszkania ${item.title}`}
                  >
                    <tbody>
                      <tr 
                       className="sales-navigator-results__table-row sales-navigator-results__table-row--header"
                      >
                        <th
                          scope="col"
                          className="sales-navigator-results__table-heading"
                        >
                          Pokoje
                        </th>
                        <th 
                          scope="col"
                          className="sales-navigator-results__table-heading"
                        >
                          Powierzchnia
                        </th>
                      </tr>
                      <tr 
                        className="sales-navigator-results__table-row"
                      >
                        <td 
                          scope="row"
                          className="sales-navigator-results__table-cell"
                        >
                          {item.rooms}
                        </td>
                        <td 
                          scope="row"
                          className="sales-navigator-results__table-cell"
                        >
                          {item.area} m²
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="sales-navigator-results__actions">
                  <a
                    href={`/oferta/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sales-navigator-results__button btn"
                    aria-label={`Zobacz szczegóły mieszkania ${item.title} w nowej karcie`}
                  >
                    Zobacz mieszkanie
                  </a>
                  </div>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SalesNavigatorResults;