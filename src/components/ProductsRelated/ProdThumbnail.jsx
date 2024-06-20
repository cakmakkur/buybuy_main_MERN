import { useEffect, useState } from "react";
import Star from "/src/components/ProductsRelated/Star";
import { Link } from "react-router-dom";
import logo from "../../assets/buy-buy.png";

const SERVER_BASE_URL = import.meta.env.VITE_URL_SERVER_BASE;

export default function ProductThumbnail({ prod }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let rating;
  if (prod.reviewDetails?.average) {
    rating = { ...prod.reviewDetails };
  } else {
    rating = {
      average: 0,
      reviewAmount: " No",
    };
  }

  const stars = Array.from({ length: rating.average }, (_, index) => (
    <Star key={index} />
  ));

  const priceEuro = (prod?.priceCents / 100).toFixed(2);

  function priceConverter(cents) {
    return `€ ${(cents / 100).toFixed(2)}`;
  }

  if (!isLoading) {
    return (
      <Link to={`/product/${prod.id}`}>
        <div className="thumbnail_box">
          <div className="img_box">
            {prod.img_path.length > 0 ? (
              <img
                className="im_b_ind"
                src={SERVER_BASE_URL + "/product_imgs/" + prod.img_path[0]}
                alt="img"
              />
            ) : (
              <img src={logo} alt="" />
            )}
          </div>
          <div className="info_box">
            <div className="prod_title">
              <h3>{prod?.name}</h3>
            </div>
            <div className="prod_desc">
              <p>{prod?.tn_description}</p>
            </div>
            <div className="stars_box">
              {stars}
              <span>{rating.reviewAmount} Reviews</span>
            </div>
            <div className="stock_box">
              {prod.inStock ? <span>✅ In Stock</span> : "❌ Out of Stock"}
            </div>
            <div className="freeShipping_box">
              {Number(prod.shippingCostCents) === 0 ? (
                <span>📦 Free Shipping</span>
              ) : (
                ""
              )}
            </div>
            <div className="discount_box">
              {prod.prevPriceCents !== null ? (
                <span>
                  Discount!{" "}
                  <span>{priceConverter(Number(prod.prevPriceCents))}</span>{" "}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="price_box">
              <span>€ {priceEuro}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
