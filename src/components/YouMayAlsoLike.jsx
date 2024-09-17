import React, { useState } from 'react';
import "../css/YouMay.css";

import images from '../data/ImagesHero';


const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState("Medium"); // Default selected size

  const product = {
    name: "Sample Product",
    price: "$99.99",
    description: "This is a great product.",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3"
    ],
    details: "More detailed information about the product.",
    images: [images.imgURL, images.imgURL, images.imgURL, images.imgURL],
    sizes: ["Small", "Medium", "Large"]
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    alert("Added to cart!");
  };

  const handleBuyNow = () => {
    alert("Proceeding to checkout!");
  };

  return (
    <div className="product-page">
      <div className="product-images">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index + 1}`} />
        ))}
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <p>{product.price}</p>
        <p>{product.description}</p>
        <div className="size-options">
          <label>Select Size:</label>
          <select value={selectedSize} onChange={(e) => handleSizeChange(e.target.value)}>
            {product.sizes.map((size, index) => (
              <option key={index} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <div className="buttons">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="buy-now-button" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
      <div className="product-features">
        <h2>Features</h2>
        <ul>
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="product-details">
        <h2>Product Details</h2>
        <p>{product.details}</p>
      </div>
    </div>
  );
};

export default ProductPage;
