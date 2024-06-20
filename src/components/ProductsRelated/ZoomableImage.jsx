import { useRef } from "react";

const SERVER_BASE_URL = import.meta.env.VITE_URL_SERVER_BASE;

export default function ZoomableImage({ url }) {
  const imgRef = useRef(null);
  const divRef = useRef(null);

  const handleMouseOver = (e) => {
    const div = divRef.current;
    const img = imgRef.current;

    const { left, width, top, height } = div.getBoundingClientRect();

    let x = ((e.clientX - left) / width) * 50 - 25;
    let y = ((e.clientY - top) / height) * 50 - 25;

    img.style.transform = `scale(2) translateX(${-x}%) translateY(${-y}%)`;
  };

  const handleMouseLeave = () => {
    imgRef.current.style.transform = "scale(1)";
  };

  return (
    <div
      ref={divRef}
      onMouseMove={(e) => handleMouseOver(e)}
      onMouseLeave={handleMouseLeave}
      className="zoomable_img_container"
    >
      <img
        className="zoomable_img"
        src={SERVER_BASE_URL + "/product_imgs/" + url}
        ref={imgRef}
        alt=""
      />
    </div>
  );
}
