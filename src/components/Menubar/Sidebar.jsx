import { useRef } from "react";
import { useAuthContext } from "../../global_variables/AuthContext";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { auth } = useAuthContext();
  const burgerBarRef = useRef();
  const burgerXRef = useRef();
  const sidebarRef = useRef();

  const toggleBurger = () => {
    burgerBarRef.current.classList.toggle("burger_bar--opened");
    burgerXRef.current.classList.toggle("burger_x--opened");
    sidebarRef.current.classList.toggle("sidebar_main_div--opened");
  };

  return (
    <>
      <div
        data-testid="burger-toggle"
        onClick={toggleBurger}
        className="burger_icon_div"
      >
        <span ref={burgerXRef} className="burger_x">
          X
        </span>
        <span ref={burgerBarRef} className={"burger_bar"}></span>
      </div>
      <div
        data-testid="main-sidebar-div"
        ref={sidebarRef}
        className="sidebar_main_div"
      >
        <ul className="sidebar_main_div__ul">
          <Link onClick={toggleBurger} to="/">
            <li>Home</li>
          </Link>
          <Link
            onClick={toggleBurger}
            to={auth?.accessToken ? "/accountSettings" : "/loginPage"}
          >
            <li>Account Settings</li>
          </Link>
          <Link onClick={toggleBurger} to="/cart">
            <li>View Cart</li>
          </Link>
          <Link onClick={toggleBurger} to="/prevOrders">
            <li>Previous Orders</li>
          </Link>
          <Link onClick={toggleBurger} to="/terms-conditions">
            <li>Terms & Conditions</li>
          </Link>
          <Link onClick={toggleBurger} to="/shipping">
            <li>Shipping</li>
          </Link>
          <Link>
            <li>Change Language</li>
          </Link>
        </ul>
      </div>
    </>
  );
}
