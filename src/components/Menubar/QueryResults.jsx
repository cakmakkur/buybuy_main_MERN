import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function QueryResults({
  searchResults,
  query,
  productFound,
  setSearchResults,
  setQuery,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [imgUrls, setImgUrls] = useState({});

  const fetchThumbnail = async (product) => {
    try {
      const imgUrl = `${BASE_URL}/product_imgs/${product.img_path[0]}`;
      setImgUrls((prevImgUrls) => ({
        ...prevImgUrls,
        [product.id]: imgUrl,
      }));
    } catch {
      console.log("Error. Fetching images failed.");
    }
  };

  useEffect(() => {
    if (searchResults && searchResults.length > 0 && productFound) {
      setIsLoading(true);
      Promise.all(
        searchResults.forEach((product) => fetchThumbnail(product))
      ).then(() => setIsLoading(false));
    } else if (!productFound) {
      setIsLoading(false);
    }
  }, [searchResults, productFound]);

  const cancelSearch = () => {
    setIsLoading(false);
    setSearchResults([]);
    setQuery("");
  };

  if (!isLoading && productFound) {
    return (
      <div onClick={cancelSearch} className="query_results_modal">
        <div className="query_results_div">
          {searchResults.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`}>
              <div className="query_results_div_product">
                <div className="query_results_div_tn">
                  {imgUrls[p.id] ? (
                    <img src={imgUrls[p.id]} alt="product img" />
                  ) : (
                    "No image"
                  )}
                </div>
                <div className="query_results_div_info">
                  <div>
                    <h5>{p.name}</h5>
                  </div>
                  <div className="query_results_div_price">
                    <h5>€ {(p.priceCents / 100).toFixed(2)}</h5>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } else if (query !== "" && isLoading) {
    return (
      <div className="query_results_modal">
        <div className="query_loading_div">
          <ClipLoader
            loading={isLoading}
            color={"rgb(255, 122, 19)"}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <i>Loading...</i>
        </div>
      </div>
    );
  } else if (!isLoading && !productFound) {
    return (
      <div className="query_results_modal">
        <div className="query_loading_div">
          <i>No product found...</i>
        </div>
      </div>
    );
  }
}
