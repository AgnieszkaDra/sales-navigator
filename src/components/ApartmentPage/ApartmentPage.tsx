import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProperty } from "../../api/properties";
import type { Property } from "../../types";

const ApartmentPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (!id) return;

    getProperty(id).then(setProperty);
  }, [id]);

  if (!property) {
    return <p>Ładowanie...</p>;
  }

  return (
    <section>
      <h1
          id="sales-navigator-title"
          className="h1-header sales-navigator__title"
        >
          Znajdź mieszkanie
      </h1>
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
          <div className="grid__item">{property.title}</div>
          <div className="grid__item">{property.area}</div>
          <div className="grid__item">{property.floor}</div>
          <div className="grid__item">{property.rooms}</div>
          <div className="grid__item">{property.price}</div>
          <div className="grid__item">1</div>
        </div>
        </div>
      
    </section>
  );
};

export default ApartmentPage;