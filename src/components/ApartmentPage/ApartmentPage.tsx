// import { useEffect, useState } from "react";
// import HeaderProducts from "./header/HeaderProducts";
// import { fetchProductsOfCategory } from "../api/categoriesList";
// import { Collection, Product } from "../types/ProductsData";
// import { navigate } from "../router/router";

// import CreateProductImage from "../ui/product/CreateProductImage";
// import ResizeIcon from "../ui/elements/ResizeIcon";
// import CreateProductPrice from "../ui/product/CreateProductPrice";



// const ApartmentPage = ({

// }: ApartmentPageProps) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const data: {
//           [key in Collection]: Product[];
//         } = await fetchProductsOfCategory();

//         const selectedProducts =
//           Object.entries(data).find(
//             ([collectionType]) =>
//               collectionType.toLowerCase() ===
//               category.toLowerCase()
//           )?.[1] || [];

//         setProducts(selectedProducts);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, [category]);

//   if (loading) {
//     return <div>Ładowanie...</div>;
//   }

//   return (
//     <>
//       <HeaderProducts />

//       <section className="product section-padding">
//         <h1 className="product-list__category-title h1">
//           {category}
//         </h1>

//         <a href="/index.html">
//           <h2 className="breadcrumb-link facets-heading">
//             Strona główna / {category}
//           </h2>
//         </a>

//         <ul
//           className="
//             product-list
//             grid
//             grid--2-col-tablet-down
//             grid--4-col-desktop
//           "
//         >
//           {products.map((product) => (
//             <li
//               key={product.path}
//               className="grid__item product-card"
//             >
//               <div className="product-card__image-wrapper">
//                 <CreateProductImage product={product} />
//                 <ResizeIcon />
//               </div>

//               <div className="product-card__info">
//                 <h3 className="product-card__title">
//                   {product.name}
//                 </h3>

//                 <CreateProductPrice
//                   price={product.price}
//                 />
//               </div>

//               <button
//                 className="product-card__button"
//                 onClick={() =>
//                   navigate(`/product/${product.path}`)
//                 }
//               >
//                 Zobacz więcej
//               </button>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </>
//   );
// };

type ApartmentPageProps = {
  oferta: string;
};

const ApartmentPage = ({
  oferta,
}: ApartmentPageProps) => {
  return (
    <section>
      <h1>Oferta</h1>
      <p>{oferta}</p>
    </section>
  );
};

export default ApartmentPage;
