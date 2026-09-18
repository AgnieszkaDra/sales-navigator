import { useState } from "react"; 

const pages = [ 
    "Rzut mieszkania", 
    "Lokalizacja", 
    "Spacer wirtualny", 
]; 

export default function Pagination() { 
    const [currentPage, setCurrentPage] = useState(0); 

    return ( 
        <nav> 
            <div style={{ 
                display: "flex", 
                gap: "24px", 
                borderBottom: "1px solid #ddd", 
            }} > 
                {pages.map((page, index) => ( 
                    <button 
                        key={page} 
                        onClick={() => setCurrentPage(index)} 
                        style={{ 
                            padding: "12px 0", 
                            border: "none",
                            background: "none", 
                            cursor: "pointer", 
                            color: currentPage === index ? "#000" : "#999", 
                            fontWeight: currentPage === index ? 600 : 400, 
                            borderBottom: currentPage === index ? "2px solid #000" : "2px solid transparent", 
                        }} > 
                            {page} 
                    </button> 
                ))} 
            </div> 
        </nav> 
    
); }