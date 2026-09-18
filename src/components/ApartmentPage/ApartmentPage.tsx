
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProperty } from "../../api/properties";
import type { Property } from "../../types";
import "../../styles/apartment.scss";
import { apartmentSpecifications } from "../../data/apartmentspecificatons";
import Pagination from "../../ui/Pagination";
import { getFloorPlan } from "../../utils/getFloorPlan";

const ApartmentPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState<Property | null>(null);
  const [floorPlanUrl, setFloorPlanUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getProperty(id)
      .then((propertyData) => {
        setProperty(propertyData);
      })
      .catch((error) => {
        console.error("Nie udało się pobrać mieszkania:", error);
        setProperty(null);
      });
  }, [id]);

  useEffect(() => {
    if (!property?.floorPlan) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFloorPlanUrl(null);
      return;
    }

    getFloorPlan(property.floorPlan)
      .then(setFloorPlanUrl)
      .catch((error) => {
        console.error("Nie udało się pobrać rzutu:", error);
        setFloorPlanUrl(null);
      });
  }, [property?.floorPlan]);

  if (!property) {
    return <p>Ładowanie...</p>;
  }

  return (
    <section className="apartment page-width">
      <div className="flex-center">
        <h1
          id="apartment-title"
          className="h1-header apartment__title border-2 border-bottom-solid border-orangeBrown"
        >
          {property.title}
        </h1>
      </div>

      <div className="apartment__content hero-inner page-width" />

     <div className="apartment__layout grid grid--5-col-desktop">
        <div className="apartment__specification grid grid--1-col grid__item span-2">
          {apartmentSpecifications.map(({ key, label, getValue }) => (
            <div
              key={key}
              className="apartment__specification-container grid__item"
            >
              <div className="apartment__specification grid grid--2-1 border-2 border-bottom-solid border-smokeWhite">
                <p className="apartment__specification-label-text fw-medium">
                  {label}
                </p>

                <div className="apartment__specification-value fw-medium">
                  {getValue(property)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid__item span-3 border-2 border-all-solid border-smokeWhite">
          <Pagination />

          {floorPlanUrl && (
            <img
              src={floorPlanUrl}
              alt={`Rzut mieszkania ${property.title}`}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ApartmentPage;

