import { Link } from "react-router-dom";
import logo from "../../assets/logo12.png";
import checkLogo from "../../assets/checkLogo.svg";

export default function OrderFinished() {
  return (
    <div>
      <div className="bckg_logo_add_div">
        <img src={logo} alt="" />
      </div>
      <div className="order_finished__main">
        <div>
          <img className="order_finished__check" src={checkLogo} alt="" />
        </div>
        <div>
          <h1> ORDER PLACED SUCCESSFULLY </h1>
          <Link className="order_finished__button" to="/">
            TURN BACK TO HOMEPAGE
          </Link>
        </div>
      </div>
    </div>
  );
}
