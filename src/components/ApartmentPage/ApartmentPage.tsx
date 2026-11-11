import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProperty } from "../../api/properties";
import type { Property } from "../../schemas/property";
import "../../styles/apartment.scss";
import { apartmentSpecifications, apartmentPages } from "../../data/apartmentspecificatons";
import Pagination from "../../ui/Pagination";
import { getFloorPlan } from "../../utils/getFloorPlan";

const ApartmentPage = () => {
    const { id } = useParams();

    const [property, setProperty] = useState<Property | null>(null);
    const [floorPlanUrl, setFloorPlanUrl] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("floorPlan");
    
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
        <section className="apartment page-width section">
            <div className="flex-center elementor-container">
                <h1
                    id="apartment-title"
                    className="apartment__title h1-header uppercase border-2 border-bottom-solid border-orangeBrown"
                >
                    {property.title}
                </h1>
            </div>

            <div className="apartment__layout page-width grid grid--1-col grid--2-col-tablet-down grid--3-col-desktop padding-section">
                <div className="apartment__specification grid grid--1-col grid__item">
                    <h3
                        id="apartment-subtitle"
                        className="apartment__subtitle h2-header uppercase"
                    >
                        {property.subtitle}
                    </h3>
                    {apartmentSpecifications.map(({ key, label, getValue }) => (
                        <dl
                            key={key}
                            className="apartment__specification__container flex space-between  border-2 border-bottom-solid border-smokeWhite"
                        >
                            <dt className="apartment__specification-label-text margin-item">
                                {label}
                            </dt>

                            <dd className="apartment__specification-value margin-item">
                                {getValue(property)}
                            </dd>
                        </dl>
                    ))}
                </div>

                <div className="apartment__info grid__item">
                    {/* <Pagination
                        className="apartment"
                        classNames={{
                            desktop: "pagination__desktop",
                            button: "pagination__button",
                        }}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    /> */}

                    <Pagination
                        className="apartment"
                        classNames={{
                            root: "border-2 border-bottom-solid border-smokeWhite",
                            desktop: "pagination__desktop",
                            button: "pagination__button",
                            mobile: "pagination__mobile",
                            dot: "pagination__dot",
                        }}
                        pages={apartmentPages}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    {activeTab === "floorPlan" && floorPlanUrl && (
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
