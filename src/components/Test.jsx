import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { FaHeart, FaMinus, FaPlus, FaShoppingCart, FaDollarSign, FaRulerCombined } from 'react-icons/fa';

const Test = () => {
  const location = useLocation();
  const { product } = location.state || {}; // Retrieve product data from location state

  if (!product) {
    return <div>No product data available.</div>;
  }

  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(Math.max(quantity - 1, 1));
  const handleImageChange = (index) => setMainImageIndex(index);

  return (
    <div className="relative flex flex-col lg:flex-row p-4 lg:p-12 bg-gray-50">
      {/* Product Image Section */}
      <div className="lg:w-2/3 flex">
        {/* Vertical Image Gallery for Desktop */}
        <div className="hidden lg:flex flex-col space-y-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`w-24 h-24 object-cover cursor-pointer border-2 ${mainImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => handleImageChange(index)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="w-full lg:w-3/4 bg-white shadow-md rounded-lg overflow-hidden relative ml-4">
          <img
            src={product.images[mainImageIndex]}
            alt="Main Product"
            className="object-cover w-full h-80 lg:h-[500px]"
          />

          {/* Dots for Mobile Image Navigation */}
          <div className="lg:hidden flex justify-center mt-4 space-x-2">
            {product.images.map((_, index) => (
              <div
                key={index}
                onClick={() => handleImageChange(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${mainImageIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="lg:w-1/3 flex flex-col justify-between mt-8 lg:mt-0 lg:pl-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl lg:text-3xl text-gray-700 mt-4">${product.price}</p>

          {/* Reviews and Rating */}
          <div className="flex items-center mt-4">
            <span className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</span>
            <span className="ml-2 text-gray-600 text-lg">({product.reviews} reviews)</span>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">Select Size:</h2>
            <div className="flex space-x-2 mt-2">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-4 rounded-lg border-2 transition-all ${selectedSize === size ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-800 border-gray-300'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center col-span-2 lg:col-span-1">
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
          <button className="bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center col-span-2 lg:col-span-1">
            Buy Now
          </button>
          <button className="bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 col-span-2 flex items-center justify-center">
            <FaHeart className="mr-2" />
            Wishlist
          </button>
          <button className="bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 col-span-2 flex items-center justify-center">
            <FaDollarSign className="mr-2" />
            Want to Buy in Bulk
          </button>
        </div>

        {/* Button to Show Size Chart */}
        <button
          onClick={() => setShowSizeChart(!showSizeChart)}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <FaRulerCombined className="mr-2" />
          Size Chart
        </button>
      </div>

      {/* Size Chart Sidebar (Desktop Only) */}
      {showSizeChart && (
        <div className="absolute top-0 right-0 w-full lg:w-1/3 h-full bg-white shadow-lg z-10 p-6 transition-transform transform translate-x-0 lg:translate-x-0">
          <h2 className="text-lg font-semibold text-gray-800">Size Chart:</h2>
          <table className="min-w-full mt-2 bg-white shadow-md rounded-lg border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Size</th>
                <th className="px-4 py-2 text-left">Chest (in)</th>
                <th className="px-4 py-2 text-left">Waist (in)</th>
                <th className="px-4 py-2 text-left">Length (in)</th>
              </tr>
            </thead>
            <tbody>
              {product.sizes.map((size, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{size}</td>
                  <td className="px-4 py-2">34</td>
                  <td className="px-4 py-2">30</td>
                  <td className="px-4 py-2">28</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => setShowSizeChart(false)}
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex items-center"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Test;
