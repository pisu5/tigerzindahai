import { useState, useEffect } from "react";
import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
// Initialize Firebase
const firebaseConfig = {
  // Your Firebase config
  apiKey: "AIzaSyCKhxRMUK7tY774rVuFirGW5_nsjygD9Yo",
  authDomain: "aneja-mall-gwalior.firebaseapp.com",
  projectId: "aneja-mall-gwalior",
  storageBucket: "aneja-mall-gwalior.appspot.com",
  messagingSenderId: "1054095531032",
  appId: "1:1054095531032:web:5676a11dca68b2e98fb76d",
  measurementId: "G-LVSCZC1XN3",
};

const database = initializeApp(firebaseConfig);

function Bannerdata() {
  const [imagesArray, setImagesArray] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const snapshot = await get(ref(database, "AdminData/Banners"));
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

  return imagesArray;
}

module.exports = Bannerdata;
