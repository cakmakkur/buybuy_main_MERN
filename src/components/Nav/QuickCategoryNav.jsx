import { Link } from "react-router-dom";

export default function QuickCategoryNav() {
  return (
    <div className="quick_buttons_container">
      <Link to="/products/pianos">
        <button className="home_quick_button">Pianos</button>
      </Link>
      <Link to="/products/guitars">
        <button className="home_quick_button">Guitars</button>{" "}
      </Link>
      <Link to="/products/saxophones">
        <button className="home_quick_button">Saxophones</button>{" "}
      </Link>
      <Link to="/products/violins">
        <button className="home_quick_button">Violins</button>{" "}
      </Link>
      <Link to="/products/drums">
        <button className="home_quick_button">Drums</button>{" "}
      </Link>
      <Link to="/products/contrabass">
        <button className="home_quick_button">Contrabass</button>{" "}
      </Link>
    </div>
  );
}
