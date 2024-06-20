import { useEffect, useState } from "react";
import ProductThumbnail from "../ProductsRelated/ProdThumbnail";
import ex_banner_bg from "../../assets/bg_banner_ex.webp";

export default function ExampleProducts({ type }) {
  const [products, setProducts] = useState([]);

  const RATINGS_URL = import.meta.env.VITE_URL_RATING;
  const NEWEST_URL = import.meta.env.VITE_URL_NEWEST;
  const DEALS_URL = import.meta.env.VITE_URL_DEALS;

  useEffect(() => {
    const fetchData = async () => {
      const url = type === "Newest Products" ? NEWEST_URL : DEALS_URL;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        const modifiedData = await Promise.all(
          data.map(async (p) => {
            try {
              const res = await fetch(`${RATINGS_URL + "/" + p.id}`);
              const reviewDetails = await res.json();
              return { ...p, reviewDetails };
            } catch (err) {
              console.log(err);
              return { ...p, reviewDetails: {} };
            }
          })
        );
        setProducts(modifiedData);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    if (type === "Newest Products" || type === "Deals") {
      fetchData();
    }
  }, []);

  if (products && products.length > 0) {
    return (
      <>
        <div
          id={type === "Newest Products" ? "newest" : "deals"}
          className="ex_products_banner"
          style={{ backgroundImage: `url(${ex_banner_bg})` }}
        >
          <p>{type}</p>
        </div>
        <div className="ex_products_div">
          {products.map((p) => (
            <ProductThumbnail key={p.id} prod={p} />
          ))}
        </div>
      </>
    );
  }
}
