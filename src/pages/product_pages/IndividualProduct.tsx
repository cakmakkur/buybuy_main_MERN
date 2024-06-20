import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import dayjs from "dayjs";
import Star from "../../components/ProductsRelated/Star";
import ReviewBox from "../../components/ProductsRelated/ReviewBox";
import DescriptionBox from "../../components/ProductsRelated/DescriptionBox";
import ZoomableImage from "../../components/ProductsRelated/ZoomableImage";
import createParticles from "../../components/ProductsRelated/particleAnimation";
import toast from "react-hot-toast";
import toastConfigs from "../../utils/toastConfig";
import { useCartContext } from "../../global_variables/CartContext";
import mc_svg from "../../assets/mc.svg";
import visa_svg from "../../assets/visa.svg";
import pp_svg from "../../assets/pp.svg";
import { Link } from "react-router-dom";
import {
  CartItemType,
  ProductType,
  ReviewDetailsObject,
  Review,
} from "../../utils/types";

export default function IndividualProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | undefined>(undefined);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [imgIndex, setImgIndex] = useState(0);

  // const [initReviews, setInitReviews] = useState([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [nextRevSect, setNextRevSect] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const [selectedQty, setSelectedQty] = useState(1);
  const [rating, setRating] = useState<ReviewDetailsObject>({
    id: "default",
    average: 0,
    reviewAmount: 0,
  });
  const { cart, setCart } = useCartContext();

  const imgSelectorRef = useRef<HTMLSpanElement | null>(null);

  const RATINGS_URL = import.meta.env.VITE_URL_RATING;
  const SERVER_BASE_URL = import.meta.env.VITE_URL_SERVER_BASE;
  const REVIEW_URL = import.meta.env.VITE_URL_REVIEWS;

  const stars = Array.from({ length: rating.average }, (_, index) => (
    <Star color={undefined} key={index} />
  ));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function scrollToSection(sect: string) {
    const element = document.getElementById(sect);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    const selector_rect = imgSelectorRef.current;
    if (selector_rect) {
      selector_rect.style.transform = `scale(1.2) translateY(${
        imgIndex * 57.5
      }px)`;
    }
  }, [imgIndex]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${SERVER_BASE_URL + "/api/" + id}`);
        const data: ProductType = await res.json();
        setProduct(data);
        setImgUrls(data.img_path);
      } catch {
        console.log("Error fetching the product images");
      }
    }
    fetchProduct();
  }, [id]);

  const fetchReviews = async (sect: number) => {
    setReviewsLoading(true);
    try {
      const response = await fetch(
        `${REVIEW_URL + "/" + id + "/" + String(sect)}`
      );
      const data = await response.json();
      if (sect === 1) {
        setNextRevSect(2);
        return setReviews(data);
      }
      setNextRevSect((prevSect) => prevSect + 1);
      setReviews((prevReviews) => [...prevReviews, ...data]);
    } catch (err) {
      console.log(err);
    } finally {
      setReviewsLoading(false);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await fetch(`${RATINGS_URL + "/" + id}`);
      const data = await response.json();
      setRating(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRatings();
    fetchReviews(1);
  }, []);

  function convertPrice(cents: number) {
    if (cents === 0) return "€ 0";

    const price = cents / 100;
    const formattedPrice = new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
    return `€ ${formattedPrice}`;
  }

  function getDeliveryDate() {
    return dayjs().add(2, "day").format("ddd, D. MMM");
  }

  function handleQtySelection(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSelectedQuantity = Number(e.target.value);
    setSelectedQty(newSelectedQuantity);
  }

  function handleAddToCart(id: string) {
    if (!product) return new Error("Error fetching the product");
    let newCart;
    const existingProductIndex: number = cart.findIndex(
      (p: CartItemType) => p.id === id
    );

    if (existingProductIndex !== -1) {
      newCart = cart.map((p: CartItemType, i: number) => {
        if (i === existingProductIndex) {
          return {
            ...p,
            quantity: p.quantity + Number(selectedQty),
          };
        }
        return p;
      });
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const newItem: CartItemType = {
        id: product.id,
        name: product.name,
        quantity: Number(selectedQty),
        priceCents: product.priceCents,
        shippingCostCents: product.shippingCostCents,
        tnUrl: imgUrls[0],
      };
      newCart = [...cart, newItem];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    //Short animation of the cart icon upon adding product to cart
    createParticles();
    toast.success("Product added to cart", toastConfigs);
  }

  if (product) {
    return (
      <div className="main_single_product_div">
        <div className="main_single_product_div_left">
          <div className="main_single_product_div_left_1">
            <h1>{product.name}</h1>
          </div>
          <div className="main_single_product_div_left_2">
            {rating.reviewAmount === 0 ? (
              ""
            ) : (
              <>
                {stars}
                <h5>
                  <a
                    onClick={() => scrollToSection("reviews_section")}
                  >{`(${rating.reviewAmount})`}</a>{" "}
                  Reviews...
                </h5>
              </>
            )}
          </div>
          <div className="main_single_product_div_left_3">
            <div>
              <span ref={imgSelectorRef} className="img_selector_rect"></span>
              {imgUrls.map((url, i) => (
                <img
                  onClick={() => setImgIndex(i)}
                  key={url}
                  src={SERVER_BASE_URL + "/product_imgs/" + url}
                  alt=""
                />
              ))}
            </div>
            <ZoomableImage url={imgUrls[imgIndex]} />
          </div>
          <div className="main_single_product_div_left_4">
            <DescriptionBox id={id} />
          </div>

          <div className="separator_v1 separator_v2"></div>

          <div className="main_single_product_div_left_5">
            <h2>Reviews:</h2>
          </div>
          {reviews && reviews.length > 0
            ? [...reviews].map((review, i) => (
                <ReviewBox review={review} key={i} />
              ))
            : "No reviews to show"}
          {reviews?.length % 5 === 0 ? (
            <button
              className="go_to_checkout_btn"
              onClick={() => fetchReviews(nextRevSect)}
            >
              {!reviewsLoading ? (
                "MORE REVIEWS..."
              ) : (
                <ClipLoader
                  loading={reviewsLoading}
                  color={"rgb(255, 122, 19)"}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="main_single_product_div_right">
          <div className="main_single_product_div_right_1">
            <h1>{convertPrice(product ? product.priceCents : 0)}</h1>
            {product?.shippingCostCents === 0 ? (
              <p className="free_shipping">Free shipping</p>
            ) : (
              <p className="inc_shipping">
                Including shipping{" "}
                {convertPrice(product ? product.shippingCostCents : 0)}
              </p>
            )}
            {product?.inStock === true ? (
              <p className="in_stock">In Stock</p>
            ) : (
              <p className="out_of_stock">Out of Stock</p>
            )}
          </div>
          <div className="main_single_product_div_right_2">
            <select
              disabled={!product?.inStock}
              name="amount_selection"
              id="amount_selection"
              onChange={(e) => handleQtySelection(e)}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
            <button
              onClick={() => handleAddToCart(product ? product.id : "")}
              disabled={!product?.inStock}
            >
              Add to Cart
            </button>
          </div>
          <div className="separator_v1"></div>
          <div className="main_single_product_div_right_3">
            <p>
              Approximate delivery date:
              <br />
              <span>{getDeliveryDate()}</span>
            </p>
          </div>
          <div className="separator_v2"></div>
          <div className="main_single_product_div_right_4">
            <img src={mc_svg} alt="" />
            <img src={visa_svg} alt="" />
            <img src={pp_svg} alt="" />
          </div>
          <div className="main_single_product_div_right_5">
            <Link className="go_to_checkout_btn" to="/cart">
              Go to checkout
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
