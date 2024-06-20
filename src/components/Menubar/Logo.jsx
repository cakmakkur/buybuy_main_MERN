import { Link } from "react-router-dom";
import logo from "../../assets/logo12.png";
///import this, dont use src path
export default function Logo() {
  return (
    <div className="logo_box">
      <Link style={{ width: "4rem" }} to="/">
        <img src={logo} alt="" />
      </Link>
    </div>
  );
}
