import { useEffect } from "react";
import HomeHighlights from "../components/HomeRelated/HomeHighlights";
import ScrollAnimation from "../components/HomeRelated/ScrollAnimation";
import MenubarLinks from "../components/Menubar/MenubarLinks";
import QuickCategoryNav from "../components/Nav/QuickCategoryNav";
import ExampleProducts from "../components/HomeRelated/ExampleProducts";
import bg_piano from "/src/assets/title_pic_piano.png";
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      <MenubarLinks />
      <HomeHighlights />
      <ScrollAnimation />
      <div className="products_title_div">
        <img src={bg_piano} alt="" />
        <QuickCategoryNav />
      </div>
      <ExampleProducts type={"Newest Products"} />
      <div className="homepage_section">
        <p>Hundreds of instruments...</p>
        <p>...from the best-known instrument makers.</p>
      </div>
      <ExampleProducts type={"Deals"} />
      <div className="homepage_section">
        <p>New Deals Every Month!</p>
        <p>Create an acoount to subscribe to the newsletter</p>
        <Link className="create_account_button" to="/loginPage">
          CREATE AN ACCOUNT NOW
        </Link>
      </div>
    </div>
  );
}
