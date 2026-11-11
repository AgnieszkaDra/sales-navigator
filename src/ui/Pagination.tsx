// import { useState } from "react"; 
// import "../../src/styles/pagination.scss";

// const pages = [
//     {
//         id: "floorPlan",
//         label: "Rzut mieszkania",
//     },
//     {
//         id: "location",
//         label: "Lokalizacja",
//     },
//     {
//         id: "virtualTour",
//         label: "Spacer wirtualny",
//     },
//     {
//         id: "virtualTour",
//         label: "Spacer wirtualny",
//     },
// ];

// export default function Pagination({ className = "" }) {
//     const [currentPage, setCurrentPage] = useState(0);

//     return (
//         <nav className={`pagination pagination-${className}`}>
//              <ul className={`pagination__desktop pagination__desktop-${className}`}>
//                 { pages.map((page, index) => ( 
//                     <a 
//                         key={page} 
//                         type="button" 
//                         onClick={() => setCurrentPage(index)} 
//                         className={`pagination__button ${ currentPage === index ? "is-active" : "" }`} 
//                     > 
//                         {page} 
//                     </a>
//                     ))
//                 } 
//             </ul> /* Mobile *
                    
//             <div 
//                 className="pagination__mobile"
//             > 
//                 <span className="pagination__current"> 
//                     {pages[currentPage]} 
//                 </span> 
//                     <div className="pagination__dots"> 
//                         {pages.map((page, index) => ( 
//                             <button 
//                                 key={page} 
//                                 type="button" 
//                                 aria-label={`Przejdź do: ${page}`} 
//                                 aria-current={currentPage === index ? "true" : undefined} 
//                                 onClick={() => setCurrentPage(index)} 
//                                 className={`pagination__dot ${ currentPage === index ? "is-active" : "" }`} /> 
//                             ))
//                         } 
//                     </div>
//             </div> 
//         </nav> 
//         ); 
//     }


// 

// import "../../src/styles/pagination.scss";

// const pages = [
//     {
//         id: "floorPlan",
//         label: "Rzut mieszkania",
//     },
//     {
//         id: "location",
//         label: "Lokalizacja",
//     },
//     {
//         id: "virtualTour",
//         label: "Spacer wirtualny",
//     },
//     {
//         id: "virtualTour2",
//         label: "Spacer wirtualny",
//     },
// ];

// type PaginationProps = {
//     className?: string;
//     activeTab: string;
//     onTabChange: (tab: string) => void;
// };

// export default function Pagination({
//     className = "",
//     activeTab,
//     onTabChange,
// }: PaginationProps) {
//     return (
//         <nav className={`pagination pagination-${className} padding-item`}>
//             <ul
//                 className={`pagination__desktop pagination__desktop-${className} border-2 border-bottom-solid border-smokeWhite`}
//             >
//                 {pages.map((page) => (
//                     <li key={page.id}>
//                         <button
//                             type="button"
//                             onClick={() => onTabChange(page.id)}
//                             className={`pagination__button ${
//                                 activeTab === page.id ? "is-active" : ""
//                             }`}
//                         >
//                             {page.label}
//                         </button>
//                     </li>
//                 ))}
//             </ul>

//             <div className="pagination__mobile">
//                 <span className="pagination__current">
//                     {pages.find((page) => page.id === activeTab)?.label}
//                 </span>

//                 <div className="pagination__dots">
//                     {pages.map((page) => (
//                         <button
//                             key={page.id}
//                             type="button"
//                             aria-label={`Przejdź do: ${page.label}`}
//                             aria-current={
//                                 activeTab === page.id ? "page" : undefined
//                             }
//                             onClick={() => onTabChange(page.id)}
//                             className={`pagination__dot ${
//                                 activeTab === page.id ? "is-active" : ""
//                             }`}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </nav>
//     );
// }


import "@/styles/pagination.scss";

type PaginationPage = {
    id: string;
    label: string;
};

type PaginationClassNames = {
    root?: string;
    desktop?: string;
    button?: string;
    mobile?: string;
    current?: string;
    dots?: string;
    dot?: string;
};

type PaginationProps = {
    className?: string;
    classNames?: PaginationClassNames;
    pages: PaginationPage[];
    activeTab: string;
    onTabChange: (tab: string) => void;
};

export default function Pagination({
    className = "",
    classNames = {},
    pages,
    activeTab,
    onTabChange,
}: PaginationProps) {

    const getClassName = (...classes: (string | undefined)[]) =>
        classes.filter(Boolean).join(" ");

    const activePage = pages.find((page) => page.id === activeTab);

    return (
        <nav
            className={getClassName(
                "pagination",
                className && `pagination--${className}`,
                classNames.root
            )}
        >
            {/* DESKTOP */}
            <ul
                className={getClassName(
                    classNames.desktop
                )}
            >
                {pages.map((page) => (
                    <li key={page.id}
                        className=''
                    
                    >
                        <button
                            type="button"
                            onClick={() => onTabChange(page.id)}
                            aria-current={
                                activeTab === page.id ? "page" : undefined
                            }
                            className={getClassName(
                                "pagination__button",
                                activeTab === page.id ? "is-active" : undefined,
                                classNames.button
                            )}
                        >
                            {page.label}
                        </button>
                    </li>
                ))}
            </ul>

            {/* MOBILE */}
            <div
                className={getClassName(
                    "pagination__mobile",
                    classNames.mobile
                )}
            >
                <span
                    className={getClassName(
                        "pagination__current",
                        classNames.current
                    )}
                >
                    {activePage?.label}
                </span>

                <div
                    className={getClassName(
                        "pagination__dots",
                        classNames.dots
                    )}
                >
                    {pages.map((page) => (
                        <button
                            key={page.id}
                            type="button"
                            aria-label={`Przejdź do: ${page.label}`}
                            aria-current={
                                activeTab === page.id ? "page" : undefined
                            }
                            onClick={() => onTabChange(page.id)}
                            className={getClassName(
                                "pagination__dot",
                                activeTab === page.id ? "is-active" : undefined,
                                classNames.dot
                            )}
                        />
                    ))}
                </div>
            </div>
        </nav>
    );
}