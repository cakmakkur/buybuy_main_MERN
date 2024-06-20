import { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useAuthContext } from "../../global_variables/AuthContext";
import { Link } from "react-router-dom";
import gear_icon from "../../assets/gear.svg";
import box_icon from "../../assets/box.svg";
import logout_icon from "../../assets/logout.svg";
import useLogout from "../../utils/useLogout";
import useRefreshToken from "../../utils/useRefreshToken";

export default function Account({ setDropdownOpen }) {
  const [logOrSign, setLogOrSign] = useState("login");
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuthContext();
  const logout = useLogout();
  const refresh = useRefreshToken();

  const handleLogout = async () => {
    setAuth(null);
    localStorage.removeItem("persist");
    setDropdownOpen("");
    try {
      await logout();
    } catch (err) {
      console.error;
    }
  };

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    auth
      ? setIsLoading(false)
      : JSON.parse(localStorage.getItem("persist"))
        ? verifyRefreshToken()
        : setIsLoading(false);
  }, [auth]);

  return (
    <div className="account_div">
      {isLoading ? (
        <h2>Loading</h2>
      ) : auth ? (
        ""
      ) : (
        <div className="account_select">
          <button
            className={logOrSign === "login" ? "logOrSign" : ""}
            onClick={() => setLogOrSign("login")}
          >
            Log In
          </button>
          <button
            className={logOrSign === "signup" ? "logOrSign" : ""}
            onClick={() => setLogOrSign("signup")}
          >
            Sign Up
          </button>
        </div>
      )}

      {auth ? (
        <div className="dropdown_greeting">
          <h1>
            Hello <span>{auth.username}</span>
          </h1>
          <Link
            className="dropdown_greeting__button dropdown_greeting__button--gear"
            onClick={() => setDropdownOpen("")}
            to="/accountSettings"
          >
            <span className="dropdown_greeting__span">Edit Profile</span>
            <img src={gear_icon} alt="" />
          </Link>
          <Link
            className="dropdown_greeting__button dropdown_greeting__button--gear"
            onClick={() => setDropdownOpen("")}
            to="/prevOrders"
          >
            <span className="dropdown_greeting__span">Previous Orders</span>
            <img src={box_icon} alt="" />
          </Link>
          <button
            className="dropdown_greeting__button dropdown_greeting__button--logout"
            onClick={handleLogout}
          >
            <img src={logout_icon} alt="" />
          </button>
        </div>
      ) : logOrSign === "login" ? (
        <Login setDropdownOpen={setDropdownOpen} />
      ) : (
        <Signup setLogOrSign={setLogOrSign} />
      )}
    </div>
  );
}
