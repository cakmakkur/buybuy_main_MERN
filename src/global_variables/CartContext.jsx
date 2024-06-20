import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState(storedCart || []);
  const value = {
    cart,
    setCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
