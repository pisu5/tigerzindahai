import "../css/custom.slider.css";
import React, { useState, useEffect } from "react";
import app from "../firebaseConfig";
import { get, getDatabase, ref } from "firebase/database";

const database = getDatabase(app);

function Offerbanner() {
  const [images, setImagesArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const snapshot = await get(ref(database, "AdminData/OfferBanner"));
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
    setActiveIndex((val) => {
      if (val >= images.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return images.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  const AutoPlayStop = () => {
    if (timeID > 0) {
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
      {images.map((item, index) => {
        return (
          <div
            className={"slider__item slider__item-active-" + (activeIndex + 1)}
            key={index}
          >
            <img src={item.imgURL} alt={item.imgAlt} />
          </div>
        );
      })}

      <div className="container__slider__links">
        {images.map((item, index) => {
          return (
            <button
              key={index}
              className={
                activeIndex === index
                  ? "container__slider__links-small container__slider__links-small-active"
                  : "container__slider__links-small"
              }
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(index);
              }}
            ></button>
          );
        })}
      </div>

      {/*<button
        className="slider__btn-next"
        onClick={(e) => {
          e.preventDefault();
          slideNext();
        }}
      >
        Next
      </button>
      <button
        className="slider__btn-prev"
        onClick={(e) => {
          e.preventDefault();
          slidePrev();
        }}
      >
        Previous
      </button>*/}
    </div>
  );
}
export default Offerbanner;
