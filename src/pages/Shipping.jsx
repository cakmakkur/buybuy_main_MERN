import logo from "../assets/logo12.png";
import { useEffect } from "react";

export default function Shipping() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cloud_spans = Array.from({ length: 22 }, (_, index) => (
    <span key={index}></span>
  ));

  const wave_spans = Array.from({ length: 23 }, (_, index) => (
    <span key={index}></span>
  ));

  const ship_spans = Array.from({ length: 17 }, (_, index) => (
    <span key={index}></span>
  ));

  const bubbles_spans = Array.from({ length: 3 }, (_, index) => (
    <span key={index}></span>
  ));

  return (
    <>
      <div className="bckg_logo_add_div">
        <img src={logo} alt="" />
      </div>
      <div className="shipping_div">
        <div className="clouds_div">
          <span className="sun_span"></span>

          <div className="clouds_slider_div d1">{cloud_spans}</div>
          <div className="clouds_slider_div d2">{cloud_spans}</div>
        </div>
        <div className="ship_div">{ship_spans}</div>
        <div className="waves_div">{wave_spans}</div>
        <div className="water_bottom"></div>
        <div className="bubbles_div">{bubbles_spans}</div>
      </div>
    </>
  );
}
