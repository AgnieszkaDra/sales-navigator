import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProperty } from "../../api/properties";
import type { Property } from "../../types";
import "../../styles/apartment.scss";

const ApartmentPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const formattedPrice = property?.price
  .toFixed(2)
  .replace(".", ",")
  .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  useEffect(() => {
    if (!id) return;

    getProperty(id).then(setProperty);
  }, [id]);

  if (!property) {
    return <p>Ładowanie...</p>;
  }

  return (
    <section 
      className="apartment page-width">
      <div 
        className="inline-block enter"
      >
        <h1
          id="apartment-title"
          className="h1-header apartment__title border-2 border-bottom-solid border-orangeBrown"
        >
          {property.title}
        </h1>
      </div>
      <div className="apartment__content hero-inner page-width">
        <div
          role="group"
          aria-label="Parametry mieszkania"
          className="
            apartment__specifications
            grid
            grid--1-col
            grid--2-col-tablet-down
            grid--3-col-desktop
            "
          aria-labelledby="apartment-title"
        >
          <div className="
            grid__item 
            apartment__specification 
            border-2 
            border-all-solid 
            border-smokeWhite
            "
          >
            <div 
              className="
              apartment__specification-label
              inline-block
              "
            >
              <p 
                className="
                apartment__specification-label-text
                border-2 
                border-bottom-solid 
                border-orangeBrown
                text-light
                "
              >
                POWIERZCHNIA / CENA
              </p>
            </div>
            <div className="
              grid 
              grid--1-col 
              grid--2-col-tablet-down
              ">
              <div className="
                border-2 
                border-all-solid 
                border-smokeWhite 
                inline-block
                padding-1
                "
              >
                { property.area }
              </div>
              <div className="
                border-2 
                border-all-solid 
                border-smokeWhite 
                inline-block 
                padding-1
                "
                >
                { formattedPrice }zł
              </div>
            </div>
          </div>
          <div className="
            grid__item 
            apartment__specification
            border-2 
            border-all-solid 
            border-smokeWhite
            ">
            <div 
              className="
                apartment__specification-label
                inline-block
                "
            >
              <p
                className="
                apartment__specification-label-text
                border-2 
                border-bottom-solid 
                border-orangeBrown
                text-light
                ">
                  Piętro
              </p>
            </div>
            <div>
              <div className="border-2 border-all-solid border-smokeWhite inline padding-1">{property.features?.floor}</div>
            </div>
          </div>
          <div className="grid__item apartment__specification border-2 border-all-solid border-smokeWhite">
            <div 
              className="
              apartment__specification-label
              inline-block
              "
            >
              <p
                className="
                apartment__specification-label-text
                border-2 
                border-bottom-solid 
                border-orangeBrown
                text-light
                ">
                  Liczba pokoi
              </p>
            </div>
            <div>
              <div className="border-2 border-all-solid border-smokeWhite inline padding-1">{property.rooms}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid--1-col grid--3-col-desktop">
        <div className="grid__item border-2 border-all-solid border-smokeWhite span-2">Pierwsza kolumna </div>
        <div className="grid__item span-1 grid grid--1-col">
          <div className="grid__item border-2 border-all-solid border-smokeWhite">
            Spacer wirtualny
          </div>
          <div className="grid__item border-2 border-all-solid border-smokeWhite uppercase font-bold text-light">
            Karta lokalu
          </div>
          <div className="grid__item border-2 border-all-solid border-smokeWhite uppercase font-bold text-light">
            <div 
              className="
                apartment__specification-label
                inline-block
                "
            >
              <p
                  className="
                  apartment__specification-label-text
                  border-2 
                  border-bottom-solid 
                  border-orangeBrown
                  text-light
                  ">
                    Powierzchnie pomieszczeń
              </p>
              <div>
                
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApartmentPage;