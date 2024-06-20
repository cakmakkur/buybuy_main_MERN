import { useEffect, useState } from "react";

const SERVER_BASE_URL = import.meta.env.VITE_URL_SERVER_BASE;

const GET_IMG_PATHS_URL = import.meta.env.VITE_URL_GET_IMG_PATHS;

export default function ScrollAnimation() {
  const [imgUrls, setImgUrls] = useState([]);

  useEffect(() => {
    fetch(`${GET_IMG_PATHS_URL}/home_scrolling_icons`)
      .then((response) => response.json())
      .then((urls) => setImgUrls(urls))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="slider">
      <div className="slide-track">
        {imgUrls.map((url, i) => (
          <div key={url} className="slide">
            <img
              src={`${SERVER_BASE_URL + "/" + url}`}
              height="100"
              width="120"
              alt={`image number ${i}`}
            />
          </div>
        ))}
        {imgUrls.map((url, i) => (
          <div key={url} className="slide">
            <img
              src={`${SERVER_BASE_URL + "/" + url}`}
              height="100"
              width="120"
              alt={`image number ${i}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
