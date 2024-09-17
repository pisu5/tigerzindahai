import "../css/custom.slider.css";
import React, { useState, useEffect } from "react";
import app from "../firebaseConfig";
import { get, getDatabase, ref } from "firebase/database";

const database = getDatabase(app);

function CustomCarousel() {
  const [images, setImagesArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const screenWidth = window.innerWidth;
        const bannerType = screenWidth <= 768 ? "mobile" : "desktop";
        const snapshot = await get(ref(database, `AdminData/Banners/${bannerType}`));
        const data = snapshot.val();
        if (data) {
          const imagesArray = Object.values(data).map((banner, index) => ({
            imgURL: banner.url,
            imgAlt: `img-${index + 1}`,
          }));
          setImagesArray(imagesArray);
        } else {
          console.log("No data found in the database.");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      setTimeID(
        setTimeout(() => {
          slideNext();
          setSlideDone(true);
        }, 5000)
      );
    }
  }, [slideDone]);

  const slideNext = () => {
    setActiveIndex((val) => (val >= images.length - 1 ? 0 : val + 1));
  };

  const slidePrev = () => {
    setActiveIndex((val) => (val <= 0 ? images.length - 1 : val - 1));
  };

  const AutoPlayStop = () => {
    if (timeID) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  return (
    <div
      className="container__slider"
      onMouseEnter={AutoPlayStop}
      onMouseLeave={AutoPlayStart}
    >
      {images.map((item, index) => (
        <div
          className={`slider__item ${activeIndex === index ? "slider__item-active" : ""}`}
          key={index}
        >
          <img src={item.imgURL} alt={item.imgAlt} />
        </div>
      ))}

      <div className="container__slider__links">
        {images.map((item, index) => (
          <button
            key={index}
            className={`container__slider__links-small ${
              activeIndex === index ? "container__slider__links-small-active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveIndex(index);
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default CustomCarousel;
