import React, { useState, useEffect } from "react";
import "../css/highlightText.css";
import firebaseApp from "../firebaseConfig"; // Import Firebase config
import { getDatabase, ref, get } from "firebase/database";

const database = getDatabase(firebaseApp); // Use Firebase app instance

const HighlightedText = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchText = async () => {
      try {
        const dataRef = ref(database, "AdminData/HighLightText");
        get(dataRef).then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
              // Assuming 'text' is always stored under the child nodes of 'uniqueId'
              const textValue = childSnapshot.child("text").val();
              if (textValue) {
                setText(textValue);
              } else {
                console.log("No text found in the database.");
              }
            });
          } else {
            console.log("No data found in the database.");
          }
        });
      } catch (error) {
        console.error("Error fetching text:", error);
      }
    };

    fetchText();
  }, []);

  return (
    <div className="highlighted-text">
      <div className="arrow left-arrow">&#8592;</div>
      <div className="highlighted-content">{text}</div>
      <div className="arrow right-arrow">&#8594;</div>
    </div>
  );
};

export default HighlightedText;
