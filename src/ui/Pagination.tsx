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


import "../../src/styles/pagination.scss"; const pages = [ { id: "floorPlan", label: "Rzut mieszkania", }, { id: "location", label: "Lokalizacja", }, { id: "virtualTour", label: "Spacer wirtualny", }, { id: "virtualTour", label: "Spacer wirtualny", }, ]; type PaginationProps = { className?: string; activeTab: string; onTabChange: (tab: string) => void; }; export default function Pagination({ className = "", activeTab, onTabChange, }: PaginationProps) { return ( <nav className={`pagination pagination-${className}`}> <ul className={`pagination__desktop pagination__desktop-${className}`} > {pages.map((page, index) => ( <li key={`${page.id}-${index}`}> <button type="button" onClick={() => onTabChange(page.id)} className={`pagination__button ${ activeTab === page.id ? "is-active" : "" }`} > {page.label} </button> </li> ))} </ul> <div className="pagination__mobile"> <span className="pagination__current"> {pages.find((page) => page.id === activeTab)?.label} </span> <div className="pagination__dots"> {pages.map((page, index) => ( <button key={`${page.id}-${index}`} type="button" aria-label={`Przejdź do: ${page.label}`} aria-current={ activeTab === page.id ? "page" : undefined } onClick={() => onTabChange(page.id)} className={`pagination__dot ${ activeTab === page.id ? "is-active" : "" }`} /> ))} </div> </div> </nav> ); }