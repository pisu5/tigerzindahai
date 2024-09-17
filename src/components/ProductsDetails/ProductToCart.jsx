import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";
import { ref, set, push } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../firebaseConfig";
import {
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productData: product } = location.state || {};
  const [user] = useAuthState(auth);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [mainImage, setMainImage] = useState(product?.imageUrls?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Save cart to localStorage whenever cart state changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleBuyNow = () => {
    // Prepare the order data
    const orderData = {
      productId: product.id,
      color: selectedColor?.name || null,
      size: selectedSize?.name || null,
      quantity: quantity,
      price: product.price,
      images: product.imageUrls,
    };

    // Log the order data for debugging
    console.log("Navigating to Delivery Address with order data:", orderData);

    // Redirect to the Delivery Address form and pass the order data
    navigate("/delivery-address", { state: { orderData } });
  };
  const handleAddToCart = () => {
    if (!product) return;

    const newCartItem = {
      productId: product.id,
      name: product.name,
      color: selectedColor?.name || null,
      size: selectedSize?.name || null,
      quantity: quantity,
      price: product.price,
      imageUrl: mainImage,
    };

    // Add new item to cart
    setCart((prevCart) => [...prevCart, newCartItem]);
    console.log("Added to cart:", newCartItem);
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleToggleWishlist = async () => {
    if (!user) {
      console.log("User must be logged in to add to wishlist");
      return;
    }

    try {
      const wishlistRef = ref(db, `wishlists/${user.uid}`);
      const newWishlistItemRef = push(wishlistRef);

      await set(newWishlistItemRef, {
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: mainImage,
        selectedColor: selectedColor?.name || null,
        selectedSize: selectedSize?.name || null,
      });

      setIsWishlisted((prevState) => !prevState);
      console.log("Added to wishlist");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  // Ensure product.colors is an array
  const colors = Array.isArray(product.colors) ? product.colors : [];
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];

  return (
    <div className="bg-gray-100 main-content">
      <div className="pt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            {/* Thumbnail Gallery for Desktop (Left Side) */}
            <div className="hidden lg:block lg:mr-4 lg:w-24">
              <div className="flex lg:flex-col space-y-4">
                {product.imageUrls?.map((url, index) => (
                  <div
                    key={index}
                    className="cursor-pointer overflow-hidden rounded-lg"
                  >
                    <img
                      src={url}
                      alt={`${product.name} ${index + 1}`}
                      className={`h-20 w-20 object-cover object-center ${
                        mainImage === url
                          ? "ring-2 ring-blue-500"
                          : "ring-1 ring-gray-300"
                      }`}
                      onClick={() => setMainImage(url)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Main Image */}
            <div className="lg:w-3/5">
              <div className="relative h-[500px] lg:h-[650px] overflow-hidden rounded-lg">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Thumbnail Gallery for Mobile (Bottom) */}
              <div className="relative mt-4 flex gap-4 lg:hidden">
                {product.imageUrls?.map((url, index) => (
                  <div
                    key={index}
                    className="cursor-pointer overflow-hidden rounded-lg"
                  >
                    <img
                      src={url}
                      alt={`${product.name} ${index + 1}`}
                      className={`h-20 w-20 object-cover object-center ${
                        mainImage === url
                          ? "ring-2 ring-blue-500"
                          : "ring-1 ring-gray-300"
                      }`}
                      onClick={() => setMainImage(url)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info (Right Side) */}
            <div className="mt-6 lg:mt-0 lg:w-2/5">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 text-gray-500">{product.description}</p>
              <p className="mt-4 text-2xl font-bold text-gray-900">
                {product.price}
              </p>
              <div className="flex items-center space-x-2 mt-4">
                <StarIcon className="h-6 w-6 text-yellow-500" />
                <span className="text-lg font-medium text-gray-900">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Color Selection */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Color</h3>
                <div className="flex gap-4 mt-4">
                  {colors.map((color) => (
                    <div
                      key={color.name}
                      className={`w-6 h-6 rounded-full ${color.class} ${
                        color === selectedColor ? "ring-2 ring-offset-2" : ""
                      }`}
                      role="radio"
                      aria-checked={color === selectedColor}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              {sizes.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-4">
                      {sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          className={({ active, checked }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer"
                                : "cursor-not-allowed bg-gray-100 text-gray-300",
                              "relative flex h-12 items-center justify-center rounded-lg border text-sm font-medium"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="p">
                                {size.name}
                              </RadioGroup.Label>
                              {size.inStock ? (
                                <div
                                  className={classNames(
                                    checked
                                      ? "border-transparent"
                                      : "border-gray-200",
                                    "absolute inset-0 rounded-lg border-2"
                                  )}
                                />
                              ) : (
                                <div
                                  aria-hidden="true"
                                  className="absolute inset-0 rounded-lg border-2 border-gray-300"
                                />
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="mt-8 flex items-center">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                >
                  <MinusIcon className="h-5 w-5" />
                </button>
                <span className="mx-4 text-lg font-medium text-gray-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={incrementQuantity}
                  className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium ${
                    isWishlisted
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-900"
                  } shadow-sm hover:bg-gray-300`}
                >
                  <HeartIcon className="h-5 w-5 mr-2" />
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
