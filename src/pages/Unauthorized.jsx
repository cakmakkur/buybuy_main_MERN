import { useNavigate } from "react-router-dom";
import logo from "../assets/logo12.png";

export default function Unauthorized() {
  const navigate = useNavigate();

  const turnBackHome = () => {
    navigate("/");
    window.location.reload();
  };

  const goToLogin = () => {
    navigate("/loginPage");
    window.location.reload();
  };

  return (
    <div className="unauthorized_page">
      <div className="bckg_logo_add_div bckg_logo_add_div--unauth">
        <img src={logo} alt="" />
      </div>
      <h1>Unauthorized</h1>
      <h3>Your session has expired or you are not logged in</h3>
      <button
        onClick={goToLogin}
        className="order_finished__button order_finished__button--unauth"
      >
        GO TO LOGIN PAGE
      </button>
      <button
        onClick={turnBackHome}
        className="order_finished__button order_finished__button--unauth"
      >
        TURN BACK TO HOMEPAGE
      </button>
    </div>
  );
}
