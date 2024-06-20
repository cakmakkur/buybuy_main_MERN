import { useState } from "react";
import { useCartContext } from "../../global_variables/CartContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";

const SERVER_BASE_URL = import.meta.env.VITE_URL_SERVER_BASE;

export const calculateSubprice = (cents, qty) => {
  if (
    typeof cents === "number" &&
    typeof qty === "number" &&
    cents > 0 &&
    qty > 0
  )
    return ((qty * cents) / 100).toFixed(2);
  return undefined;
};

export default function DdCart({ setDropdownOpen }) {
  const { cart, setCart } = useCartContext();
  const [imgUrls, setImgUrls] = useState([]);

  const handleRemove = (index) => {
    let newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  if (cart.length === 0 || !cart) {
    return (
      <div className="empty_cart_div">
        <p className="empty_cart_div__exc">!</p>
        <p className="empty_cart_div__txt">Cart is empty</p>
      </div>
    );
  } else {
    return (
      <div className="dd_cart__main">
        <div className="dd_cart__products">
          {cart.map((p, i) => (
            <div key={p.id} className="dd_cart__product">
              <div className="dd_cart__product__tn">
                {p.tnUrl ? (
                  <img
                    className="dd_cart__product__img"
                    src={SERVER_BASE_URL + "/product_imgs/" + p.tnUrl}
                    alt="Product thumbnail image"
                  />
                ) : (
                  <img src={logo} alt="" />
                )}
              </div>
              <div className="dd_cart__product__info">
                <div className="dd_cart__product__info__name">
                  <h5 className="dd_cart__product__info__name--h5">{p.name}</h5>
                </div>
                <div className="dd_cart__product__info__num">
                  <h6>Amount: {p.quantity}</h6>
                  <h5>
                    €{" "}
                    {calculateSubprice(
                      Number(p.priceCents),
                      Number(p.quantity)
                    )}
                  </h5>
                </div>
              </div>
              <button onClick={() => handleRemove(i)}>❌</button>
            </div>
          ))}
        </div>
        <div className="view_cart_button_div">
          <Link
            onClick={() => {
              setDropdownOpen("");
            }}
            to={"/cart"}
          >
            <span className="cart_span">View Cart</span>
          </Link>
        </div>
      </div>
    );
  }
}
