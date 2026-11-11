// import { useState, useRef, useMemo } from "react";
// import { useProperties } from "../../useProperties";
// import {
//   CustomSelect,
//   SalesNavigatorResults,
//   FilterCheckbox,
// } from "./components";
// import { areaOptions, statusOptions } from "./constants";
// import type { DraftFilters } from "./schemas/filters";
// import "../../styles/sales-navigator.scss";
// import { filterProperties } from "./utils/filterProperties";

// const SalesNavigator = () => {
//   const { properties } = useProperties();

//   const listRef = useRef<HTMLDivElement | null>(
//     null
//   );

//   const [draft, setDraft] =
//     useState<DraftFilters>({
//       status: "all",
//       priceOrder: "asc",
//       onlyBalcony: false,
//       onlyKitchen: false,
//       onlyTerrace: false,
//       onlyWardrobe: false,
//       onlyParking: false,
//       rooms: "all",
//       area: "all",
//     });

//   const [filters, setFilters] =
//     useState<DraftFilters>(draft);
  
//   const [showMoreFilters, setShowMoreFilters] =
//     useState(false);

//   if (!properties) {
//     return <p>Ładowanie...</p>;
//   }

//   const updateDraft = <K extends keyof DraftFilters>(
//   key: K,
//   value: DraftFilters[K]
// ) => {
//   setDraft((prev) => ({
//     ...prev,
//     [key]: value,
//   }));
// };

// const extraFilters = [
//   {
//     key: "onlyBalcony",
//     label: "Mieszkanie z balkonem",
//   },
//   {
//     key: "onlyTerrace",
//     label: "Mieszkanie z tarasem",
//   },
//   {
//     key: "onlyKitchen",
//     label: "Mieszkanie z osobną kuchnią",
//   },
//   {
//     key: "onlyWardrobe",
//     label: "Mieszkanie z osobną garderobą",
//   },
// ] as const satisfies {
//   key: keyof Pick<
//     DraftFilters,
//     | "onlyBalcony"
//     | "onlyTerrace"
//     | "onlyKitchen"
//     | "onlyWardrobe"
//   >;
//   label: string;
// }[];


// //   properties: Property[],
// //   filters: DraftFilters
// // ) => {
// //   return properties
// //     .filter((p) =>
// //       filters.status === "all" ||
// //       p.status === filters.status
// //     )
// //     .filter((p) =>
// //       !filters.onlyBalcony ||
// //       p.features?.balcony
// //     )
// //     .filter((p) =>
// //       filters.rooms === "all" ||
// //       (filters.rooms === "4+"
// //         ? p.rooms >= 4
// //         : p.rooms === Number(filters.rooms))
// //     )
// //     .filter((p) => {
// //       if (filters.area === "all") return true;

// //       const ranges = {
// //         "0-30": [0, 30],
// //         "30-50": [30, 50],
// //         "50-70": [50, 70],
// //         "70-100": [70, 100],
// //         "100+": [100, Infinity],
// //       } as const;

// //       const [min, max] = ranges[filters.area];

// //       return filters.area === "0-30"
// //         ? p.area <= max
// //         : filters.area === "100+"
// //           ? p.area > min
// //           : p.area > min && p.area <= max;
// //     })
// //     .sort((a, b) => {
// //       if (!a.price) return 1;
// //       if (!b.price) return -1;

// //       return filters.priceOrder === "asc"
// //         ? a.price - b.price
// //         : b.price - a.price;
// //     });
// // };

//  // const filtered = (() => {
//   //   let result = properties;

//   //   if (filters.onlyBalcony) {
//   //     result = result.filter(
//   //       (p) => p.features?.balcony
//   //     );
//   //   }

//   //   if (filters.status !== "all") {
//   //     result = result.filter(
//   //       (p) => p.status === filters.status
//   //     );
//   //   }

//   //   result = [...result].sort((a, b) => {
//   //     if (!a.price) return 1;
//   //     if (!b.price) return -1;

//   //     return filters.priceOrder === "asc"
//   //       ? a.price - b.price
//   //       : b.price - a.price;
//   //   });

//   //   return result;
//   // })();
// // eslint-disable-next-line react-hooks/rules-of-hooks
// const filtered = useMemo(
//   () => filterProperties(properties, filters),
//   [properties, filters]
// );
//   return (
//     <section
//       className="sales-navigator section"
//       aria-labelledby="sales-navigator-title"
//     >
//       <div 
//         className="
//         elementor-container
//         "
//       >
//         <h1
//           id="sales-navigator-title"
//           className="
//             h1-header 
//             sales-navigator__title
//             uppercase
//           "
//         >
//           Znajdź mieszkanie
//         </h1>
//       </div>

//       <div 
//         className="
//           page-width
//           "
//         >
//         <div
//           role="group"
//           aria-label="Filtry wyszukiwania mieszkań"
//           className="
//             searcher
//             grid
//             grid--1-col
//             grid--2-col-tablet-down
//             grid--3-col-desktop
//             padding-top-standard
//             "
//           aria-labelledby="filters-heading"
//         >
//           <div className="grid__item">
//             <CustomSelect<DraftFilters["status"]>
//               value={draft.status}
//               onChange={(value) => updateDraft("status", value)}
//               options={statusOptions}
//             />
//           </div>

//           <div className="grid__item">
//             <CustomSelect<"asc" | "desc">
//               value={draft.priceOrder}
//               onChange={(value) => updateDraft("priceOrder", value)}
//               options={[
//                 {
//                   value: "asc",
//                   label: "Cena rosnąco",
//                 },
//                 {
//                   value: "desc",
//                   label: "Cena malejąco",
//                 },
//               ]}
//             />
//           </div>

//           <div className="grid__item">
//             <CustomSelect<DraftFilters["rooms"]>
//               value={draft.rooms}
//               onChange={(value) => updateDraft("rooms", value)}
//               options={[
//                 {
//                   value: "all",
//                   label: "Liczba pokoi",
//                 },
//                 {
//                   value: "1",
//                   label: "1 pokój",
//                 },
//                 {
//                   value: "2",
//                   label: "2 pokoje",
//                 },
//                 {
//                   value: "3",
//                   label: "3 pokoje",
//                 },
//                 {
//                   value: "4+",
//                   label: "4+ pokoje",
//                 },
//               ]}
//             />
//           </div>

//           <div className="grid__item">
//             <CustomSelect<DraftFilters["area"]>
//               value={draft.area}
//               onChange={(value) => updateDraft("area", value)}
//               options={areaOptions}
//             />
//           </div>
//         </div> 

//       {/* {showMoreFilters && (
//           <div className="
//             filters__more 
//             grid 
//             grid--2-col 
//             grid--3-col-tablet-down 
//             grid--4-col-desktop
//           ">
//             {extraFilters.map(({ key, label }) => (
//       <><FilterCheckbox
//                 key={key}
//                 label={label}
//                 checked={draft[key]}
//                 onChange={() => updateDraft(key, !draft[key])} /><FilterCheckbox
//                   label="Mieszkanie z balkonem"
//                   checked={draft.onlyBalcony}
//                   onChange={(value) => updateDraft("onlyBalcony", value)} /><FilterCheckbox
//                   label="Mieszkanie z tarasem"
//                   checked={draft.onlyTerrace}
//                   onChange={() => setDraft((prev) => ({
//                     ...prev,
//                     onlyTerrace: !prev.onlyTerrace,
//                   }))} /><FilterCheckbox
//                   label="Mieszkanie z osobną kuchnią"
//                   checked={draft.onlyKitchen}
//                   onChange={() => setDraft((prev) => ({
//                     ...prev,
//                     onlyKitchen: !prev.onlyKitchen,
//                   }))} /><FilterCheckbox
//                   label="Mieszkanie z osobną garderobą"
//                   checked={draft.onlyWardrobe}
//                   onChange={() => setDraft((prev) => ({
//                     ...prev,
//                     onlyWardrobe: !prev.onlyWardrobe,
//                   }))} /></>
//     ))}
            
          
//           </div>
//         )} */}

//         {showMoreFilters && (
//   <div
//     className="
//       filters__more
//       grid
//       grid--2-col
//       grid--3-col-tablet-down
//       grid--4-col-desktop
//     "
//   >
//     {extraFilters.map(({ key, label }) => (
//       <FilterCheckbox
//         key={key}
//         label={label}
//         checked={draft[key]}
//         onChange={() => updateDraft(key, !draft[key])}
//       />
//     ))}
//   </div>
// )}
     

//         <div className="
//           sales-navigator__actions 
//           padding-top-standard
//         ">
//           <button
//             className="
//             more-filters-button 
//             btn 
//             padding-item
//           "
//             onClick={() =>
//                setShowMoreFilters(
//                 (prev) => !prev
//               )
//             }
//           >
//             {showMoreFilters
//               ? "Mniej filtrów"
//               : "Więcej filtrów"}
//           </button>

//           <button
//             className="
//               search-button 
//               btn 
//               padding-item
//             "
//             onClick={() => {
//               setFilters(draft);
//               listRef.current?.scrollIntoView({
//                 behavior: "smooth",
//               });
//             }}
//           >
//             Szukaj
//           </button>
//         </div>

//         <SalesNavigatorResults
//           results={filtered}
//         />
//       </div>
//     </section>
//   );
// };

// export default SalesNavigator;

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
              value={draft.status}
              onChange={(value) => updateDraft("status", value)}
              options={statusOptions}
            />
          </div>

          <div className="grid__item">
            <CustomSelect
              value={draft.priceOrder}
              onChange={(value) => updateDraft("priceOrder", value)}
              options={priceOrderOptions}
            />
          </div>

          <div className="grid__item">
            <CustomSelect
              value={draft.rooms}
              onChange={(value) => updateDraft("rooms", value)}
              options={roomOptions}
            />
          </div>

          <div className="grid__item">
            <CustomSelect
              value={draft.area}
              onChange={(value) => updateDraft("area", value)}
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
                label={label}
                checked={draft[key]}
                onChange={() => updateDraft(key, !draft[key])}
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