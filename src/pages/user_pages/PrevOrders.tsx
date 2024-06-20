import { useAuthContext } from "../../global_variables/AuthContext";
import { useEffect, useState } from "react";
import reviewLogo from "../../assets/reviewLogo.svg";
import ReviewInput from "../../components/UserRelated/ReviewInput";
import useAxiosPrivate from "../../utils/useAxiosPrivate";
import { Link } from "react-router-dom";
import { PrevOrderType } from "../../utils/types";

const SERVER_BASE_URL = import.meta.env.VITE_URL_SERVER_BASE;

export default function PrevOrders() {
  const [prevOrders, setPrevOrders] = useState([]);
  const { auth } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();
  const [reviewProductId, setReviewProductId] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrevOrders = async () => {
    try {
      const response = await axiosPrivate.get(
        `/user_api/get_prev_orders/${auth?.username}`
      );
      if (!response) throw new Error("Server error");
      setPrevOrders(response.data);
      if (Array.isArray(response.data)) setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPrevOrders();
  }, []);

  return (
    <div className="cart__main">
      {reviewProductId ? (
        <div
          onClick={() => setReviewProductId(undefined)}
          className="overlay_sort"
        ></div>
      ) : (
        ""
      )}
      <h1 className="prev_orders--h1">Previous Orders</h1>
      {isLoading ? (
        <h1>Loading</h1>
      ) : prevOrders.length > 0 ? (
        <div id="cart__product__main" className="cart__product__main">
          {prevOrders?.map((p: PrevOrderType, i) => (
            <div key={p.productId} className="cart__product">
              <div className="cart__thumnail">
                <Link to={`/product/${p.productId}`}>
                  <img
                    className="cart__thumnail__img"
                    src={
                      SERVER_BASE_URL + "/product_imgs/" + p.productThumbnail
                    }
                    alt=""
                  />
                </Link>
              </div>
              <div className="cart__product__info">
                <div className="cart__product__info__div">
                  <Link to={`/product/${p.productId}`}>
                    <h5 className="cart__product__info__h5">{p.productName}</h5>
                  </Link>
                </div>
                <div
                  className="review_toggle_div"
                  onClick={(e) => {
                    e.stopPropagation();
                    setReviewProductId(p.productId);
                  }}
                >
                  <img className="review_logo--img" src={reviewLogo} alt="" />
                  <span className="review_logo--span">Write a review</span>
                </div>
                {reviewProductId === p.productId && auth ? (
                  <ReviewInput
                    productId={p.productId}
                    userId={auth?.username}
                    setReviewProductId={setReviewProductId}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>No orders yet</h1>
      )}
    </div>
  );
}
