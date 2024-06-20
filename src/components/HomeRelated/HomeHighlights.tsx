import { useState, useEffect, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const SERVER_BASE_URL = import.meta.env.VITE_URL_SERVER_BASE;
const GET_IMG_PATHS_URL = import.meta.env.VITE_URL_GET_IMG_PATHS;

export default function HomeHighlights() {
  const [imgUrls, setImgUrls] = useState([]);
  const extendedImgUrls = [...imgUrls, imgUrls[0]];

  useEffect(() => {
    async function fetchHighlightData() {
      try {
        const response = await fetch(`${GET_IMG_PATHS_URL}/home_prod_hl_imgs`);
        const urls = await response.json();
        setImgUrls(urls);
      } catch {
        console.log("Error fetching homepage highlights images");
      }
    }
    fetchHighlightData();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    startSlide();
    return () => clearInterval(intervalRef.current);
  });

  const startSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((current) => {
        if (activeIndex === extendedImgUrls.length - 1 && sliderRef.current) {
          sliderRef.current.style.transition = "none";
          requestAnimationFrame(() => {
            const newTranslate = 0;
            if (sliderRef.current) {
              sliderRef.current.style.transform = `translateX(${newTranslate}vw)`;
              requestAnimationFrame(() => {
                if (sliderRef.current) {
                  sliderRef.current.style.transition = "transform 1s ease-out";
                }
              });
            }
          });
          return 0;
        } else {
          return current + 1;
        }
      });
    }, 10000);
  };

  const stopSlide = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const newTranslate = activeIndex * -100;
      sliderRef.current.style.transform = `translateX(${newTranslate}%)`;
    }
  }, [activeIndex]);

  const prevSlide = () => {
    const prevIndex = (activeIndex - 1) % 5;
    setActiveIndex(prevIndex);
  };
  const nextSlide = () => {
    const nextIndex = (activeIndex + 1) % 5;
    setActiveIndex(nextIndex);
  };

  if (imgUrls.length > 0) {
    return (
      <div
        onMouseEnter={stopSlide}
        onMouseLeave={() => startSlide()}
        className="slider_container"
      >
        <div ref={sliderRef} style={{ transition: "transform 1s ease-out" }}>
          {extendedImgUrls.map((url, index) => (
            <img
              key={index}
              src={SERVER_BASE_URL + "/" + url}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          disabled={activeIndex === 0}
          onClick={prevSlide}
          className="prev_btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              fill="white"
              d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"
            />
          </svg>
        </button>
        <button
          disabled={activeIndex === 4}
          onClick={nextSlide}
          className="next_btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              fill="white"
              d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
            />
          </svg>
        </button>
      </div>
    );
  } else {
    return (
      <div className="slider_container">
        <ClipLoader
          loading={true}
          color={"rgb(255, 122, 19)"}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <i>Loading...</i>
      </div>
    );
  }
}
