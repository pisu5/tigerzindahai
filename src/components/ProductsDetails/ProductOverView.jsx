import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, getDatabase, get, query, orderByChild, equalTo } from "firebase/database";
import app from "../../firebaseConfig";

const database = getDatabase(app);

const ResponsiveGrid = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("price");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let productsRef = ref(database, "AdminData/Products");
        let productsQuery = query(
          productsRef,
          orderByChild("category"),
          equalTo(category)
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
          setProducts([]);
        }
      } catch (error) {
        setProducts([]);
      }
    };

    fetchData();
  }, [category, filter, sort, priceRange]);

  const filteredProducts = products
    .filter((product) => {
      return (
        (filter ? product.category === filter : true) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
      );
    })
    .sort((a, b) => {
      if (sort === "price") {
        return a.price - b.price;
      } else if (sort === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const handleClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
          Explore {category} Products
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Discover the finest {category} products for you
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar for Filters */}
        <aside className="md:w-1/4">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Filters</h2>
            <div className="mb-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Price Range
              </label>
              <div className="flex items-center mt-2 space-x-2">
                <input
                  type="number"
                  className="w-20 p-2 border border-gray-300 rounded-lg"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                />
                <span>-</span>
                <input
                  type="number"
                  className="w-20 p-2 border border-gray-300 rounded-lg"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                />
              </div>
            </div>

            {/* Sort By Filter */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <select
                id="sort"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Main Content: Product Grid */}
        <main className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image Container */}
                  <div className="h-64 w-full bg-gray-200">
                    <img
                      src={product.imageUrls ? product.imageUrls[0] : ""}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h5 className="text-lg font-semibold text-gray-800 truncate">
                      {product.name}
                    </h5>
                    <p className="text-sm text-gray-500 mt-2 truncate">
                      {product.description}
                    </p>
                    <p className="text-lg font-bold text-indigo-600 mt-4">
                      ₹{product.price}
                    </p>
                    <div className="flex items-center justify-between mt-6 space-x-4">
                      <button
                        className="w-1/2 text-sm bg-gradient-to-r from-purple-400 to-indigo-600 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:from-purple-500 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                        onClick={() => handleClick(product.id)}
                      >
                        Quick View
                      </button>
                      <button className="w-1/2 text-sm bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="p-2 bg-gray-50 text-center">
                    <button className="text-red-600 hover:text-red-800 transition-all transform hover:scale-105">
                      <i className="fas fa-heart"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No products available</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResponsiveGrid;
