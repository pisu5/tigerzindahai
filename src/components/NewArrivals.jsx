import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import app from "../firebaseConfig";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  getDatabase,
} from "firebase/database";
import "../css/NewArrivals.css"; // Import CSS file

const LikeButton = styled(IconButton)(({ theme }) => ({
  color: "red",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const ProductCard = ({ product, onClick }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleMouseEnter = () => {
    if (product.imageUrls.length > 1) {
      setImageIndex(1); // Change to the second image on hover. Adjust index for random if needed.
    }
  };

  const handleMouseLeave = () => {
    setImageIndex(0); // Change back to the first image when not hovering.
  };

  return (
    <div
      className="product-card"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card sx={{ maxWidth: 280 }} className="custom-card">
        <img
          src={product.imageUrls[imageIndex]}
          alt={product.name}
          className="product-image"
        />
        <CardContent>
          <Typography
            variant="subtitle1"
            component="h2"
            className="product-name"
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="product-price"
          >
            {product.price}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

const NewArrivals = ({ headerText, pTag, collection }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const database = getDatabase(app);
        const productsRef = ref(database, "AdminData/Products");
        const productsQuery = query(
          productsRef,
          orderByChild("collection"),
          equalTo(collection)
        );
        const snapshot = await get(productsQuery);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const productList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setProducts(productList);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };

    fetchData();
  }, [collection]);

  const handleProductClick = (product) => {
    console.log("click");
    navigate(`/product/${product.id}`, { state: { productData: product } });
  };

  return (
    <div className="new-arrivals-container">
      <div className="section-header">
        <Typography variant="h5" gutterBottom>
          <span>{headerText}</span>
          <p>{pTag}</p>
        </Typography>
        <div className="product-container">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
