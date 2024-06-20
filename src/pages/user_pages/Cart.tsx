import { useCartContext } from "../../global_variables/CartContext";
import useAxiosPrivate from "../../utils/useAxiosPrivate";
import { useAuthContext } from "../../global_variables/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import toastConfigs from "../../utils/toastConfig";
import { CartItemType, CartType } from "../../utils/types";

const SERVER_BASE_URL = import.meta.env.VITE_URL_SERVER_BASE;

export default function Cart() {
  const { cart, setCart } = useCartContext();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleOrder = async () => {
    const newOrder = cart.map((p: CartItemType) => ({
      productName: p.name,
      productThumbnail: p.tnUrl,
      productId: p.id,
      quantity: p.quantity,
      currentUnitPrice: p.priceCents,
    }));
    try {
      const response = await axiosPrivate.post(
        `/user_api/order/${auth?.username}`,
        newOrder
      );
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/orderFinished", { state: { from: location }, replace: true });
      console.log(response.data);
    } catch (err: any) {
      if (err.response.status === 403) {
        toast.error("You have to be a user to place an order", toastConfigs);
        navigate("/loginPage", { state: { from: location }, replace: true });
      } else {
        toast.error("Order failed", toastConfigs);
      }
    }
  };

  const calculateSubprice = (cents: number, qty: number): string => {
    return ((qty * cents) / 100).toFixed(2);
  };

  const calculateTotalCost = () => {
    const totalPrice = cart.reduce((acc: number, currentItem: CartItemType) => {
      return acc + currentItem.quantity * currentItem.priceCents;
    }, 0);
    const totalShipping = cart.reduce(
      (acc: number, currentItem: CartItemType) => {
        return acc + currentItem.quantity * currentItem.shippingCostCents;
      },
      0
    );
    const total = totalPrice + totalShipping;
    return (total / 100).toFixed(2);
  };

  const handleRemove = (index: number) => {
    let newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const changeAmount = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newQuantity = parseInt(e.target.value, 10);
    let newCart: CartType;

    const existingProductIndex: number = cart.findIndex(
      (p: CartItemType) => p.id === id
    );
    newCart = cart.map((p: CartItemType, i: number) => {
      if (i === existingProductIndex) {
        return {
          ...p,
          quantity: newQuantity < 1 ? 1 : newQuantity,
        };
      }
      return p;
    });

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="cart__main">
      {cart.length === 0 || !cart ? (
        <h2>Your cart is empty!</h2>
      ) : (
        <div className="cart__product__main">
          {cart.map((p: CartItemType, i: number) => (
            <div key={p.id} className="cart__product">
              <div className="cart__thumnail">
                <img
                  className="cart__thumnail__img"
                  src={SERVER_BASE_URL + "/product_imgs/" + p.tnUrl}
                  alt=""
                />
              </div>
              <div className="cart__product__info">
                <div className="cart__product__info__div">
                  <h5 className="cart__product__info__h5">{p.name}</h5>
                </div>
                <div className="cart__product__info__num">
                  <h6>
                    Amount: {""}
                    <input
                      className="cart__amount__input"
                      type="number"
                      value={p.quantity}
                      onChange={(e) => changeAmount(e, p.id)}
                    />
                  </h6>
                  <h6></h6>
                  <h5>
                    <span>
                      Shipping: € {calculateSubprice(p.shippingCostCents, 1)}
                    </span>{" "}
                    {calculateSubprice(p.priceCents, p.quantity)}
                  </h5>
                </div>
              </div>
              <button
                className="cart__remove__button"
                onClick={() => handleRemove(i)}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}

      {cart && cart.length > 0 ? (
        <div className="cart__payment_section">
          <div>
            <button className="cart_place_order_btn" onClick={handleOrder}>
              PLACE ORDER
            </button>
          </div>
          <div>
            <span className="cart__total--e">Total:</span>
            <span className="cart__total--p">€ {calculateTotalCost()}</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
