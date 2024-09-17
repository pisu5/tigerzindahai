import React from "react";

const QuickViewModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0 w-full sm:w-1/3">
              <img
                src={product.imageUrls ? product.imageUrls[0] : ""}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            <div className="flex-grow">
              <p className="text-lg font-bold text-indigo-600">
                ₹{product.price}
              </p>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
              onClick={() => console.log("Add to cart")}
            >
              Add to Cart
            </button>

            <a
              href={`/product/${product.id}`}
              className="text-indigo-600 hover:underline"
            >
              View Full Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
