import "./trial.css";
import { FaSearch, FaBars } from "react-icons/fa";
import React, { useState } from "react";
import firebaseApp from "../firebaseConfig"; // Import Firebase config
import { getDatabase, ref, get } from "firebase/database";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const database = getDatabase(firebaseApp); // Use Firebase app instance

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
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
    <header className="w-full">
      {/* Highlighted Text Container */}
      <div className="w-full h-12 bg-red-500 flex items-center justify-center">
        <p className="text-white font-bold">{text}</p>
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        {/* Hamburger Icon and Search Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <FaBars
            className="text-gray-600 mr-2 cursor-pointer"
            onClick={toggleMenu}
          />
          <FaSearch className="text-gray-600 cursor-pointer ml-2" />
        </div>

        {/* Logo */}
        <div className="flex-grow text-center md:flex md:justify-center ll">
          <img
            src="../anejamalllogo.jpg"
            alt="Logo"
            className="h-8 md:h-20 lg:h-20 mx-auto"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center justify-end space-x-2 w-1/3 md:w-1/4 lg:w-1/3">
          <svg
            focusable="false"
            className="icon icon--header-shopping-cart h-8 md:h-6 lg:h-6"
            viewBox="0 0 21 20"
          >
            <path
              d="M0 1H4L5 11H17L19 4H8"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            ></path>
            <circle
              cx="6"
              cy="17"
              r="2"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            ></circle>
            <circle
              cx="16"
              cy="17"
              r="2"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            ></circle>
          </svg>
          <svg
            focusable="false"
            className="icon icon--header-customer text-gray-600 cursor-pointer h-8 md:h-20 lg:h-6"
            viewBox="0 0 18 17"
          >
            <circle
              cx="9"
              cy="5"
              r="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
            ></circle>
            <path
              d="M1 17v0a4 4 0 014-4h8a4 4 0 014 4v0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            ></path>
          </svg>
          <svg
            focusable="false"
            className="icon icon--header-heart text-gray-600 cursor-pointer h-8 md:h-20 lg:h-6"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 21s-8.5-7.7-8.5-12.3A5.2 5.2 0 0 1 12 3a5.2 5.2 0 0 1 8.5 5.7C20.5 13.3 12 21 12 21z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            ></path>
          </svg>
          <svg
            focusable="false"
            className="icon icon--header-truck text-gray-600 cursor-pointer h-8 md:h-20 lg:h-6"
            viewBox="0 0 24 24"
          >
            <rect
              x="1"
              y="10"
              width="13"
              height="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            ></rect>
            <rect
              x="14"
              y="8"
              width="8"
              height="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            ></rect>
            <circle
              cx="5"
              cy="18"
              r="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            ></circle>
            <circle
              cx="17"
              cy="18"
              r="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            ></circle>
            <path
              d="M1 16h21"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            ></path>
          </svg>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="border-b border-black"></div>

      {/* Nav Bar */}
      <nav
        className={`bg-white py-2 px-4 lll ${
          menuOpen ? "block" : "hidden"
        } md:flex`}
      >
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 justify-center text-sm md:text-base">
          <Link to="/" className="home">
            Home
          </Link>
          <Link to="/sale" className="sale">
            SALE
          </Link>
          <Link to="/new-arrivals">New Arrivals</Link>
          <Link to="/sarees">Sarees</Link>
          <Link to="/suits">Suits</Link>
          <Link to="/kurtis">Kurtis</Link>
          <Link to="/trial">Co-Ord Set</Link>
          <Link to="/unstitched-suits">Unstitched Suits</Link>
          <Link to="/lehengas">Lehengas</Link>
          <Link to="/gowns">Gowns</Link>
          <Link to="/loginpage">Login</Link>
          <Link to="/wedding-collection">Wedding Collection</Link>
          <Link to="/returns-orders">Wedding Collection</Link>
          <Link to="/bestsellers">Bestsellers</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
