import fb_logo from "../../assets/icons8-facebook.svg";
import yt_logo from "../../assets/icons8-youtube.svg";
import googleplay_logo from "../../assets/icons8-google-play.svg";
import { Link } from "react-router-dom";

const ADMIN_PORTAL_URL = import.meta.env.VITE_URL_ADMIN_PORTAL;

export default function Footer() {
  return (
    <div id="footer_div" className="footer_div">
      <div>
        <ul>
          <li>
            <a href={ADMIN_PORTAL_URL}>Admin Portal</a>
          </li>
          <li>Career</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <Link to={"/terms-conditions"}>Terms & Conditions</Link>
          </li>
          <li>
            <Link to={"/shipping"}>Shipping</Link>
          </li>
          <li>
            <Link to={"/prevOrders"}>Orders</Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="footer_social_links_div">
          <a href="https://www.facebook.com/">
            <img src={fb_logo} alt="" />
          </a>
          <a href="https://www.youtube.com/">
            <img src={yt_logo} alt="" />
          </a>
          <a href="https://play.google.com/store/games?hl=en&gl=US">
            <img src={googleplay_logo} alt="" />
          </a>
        </div>
        <ul>
          <li>About us</li>
        </ul>
      </div>
      <h3>
        &copy; Kürsat Cakmak <br />
        <span className="project_year">Project year 2024</span>
      </h3>
    </div>
  );
}
