import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DeliveryAddress = ({ onProceed }) => {
  const [formData, setFormData] = useState({
    name: "",
    houseNo: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "India", // Default country
    email: "",
    phone: "",
    altPhone: "",
    landmark: "",
    paymentMethod: "Prepaid", // Default to Prepaid
    quantity: 1, // Ensure this value is provided correctly
    price: 0, // Ensure this value is provided correctly
    hsn: "", // Ensure this value is provided correctly
    length: 0.5, // Ensure it meets the minimum requirement
    breadth: 0.5, // Ensure it meets the minimum requirement
    height: 0.5, // Ensure it meets the minimum requirement
    weight: 0.1, // Ensure it meets the minimum requirement
  });

  const [errors, setErrors] = useState({}); // State to hold validation errors

  const location = useLocation();
  const { orderData } = location.state || {};

  if (!orderData) {
    return <p>No order data found. Please go back and try again.</p>;
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.houseNo) newErrors.houseNo = "House/Flat No. is required";
    if (!formData.address) newErrors.address = "Street Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Valid Pincode is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid Email is required";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Valid Phone Number is required";

    // Validate dimensions and weight
    if (formData.length < 0.5)
      newErrors.length = "Length must be at least 0.5.";
    if (formData.breadth < 0.5)
      newErrors.breadth = "Breadth must be at least 0.5.";
    if (formData.height < 0.5)
      newErrors.height = "Height must be at least 0.5.";
    if (formData.weight <= 0)
      newErrors.weight = "Weight must be greater than 0.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Prevent submission if form is invalid

    const orderItems = [
      {
        name: "Kunai", // Example; update based on your form data
        sku: "chakra123", // Example; update based on your form data
        units: formData.quantity, // Ensure this value is set correctly
        selling_price: formData.price, // Ensure this value is set correctly
        hsn: formData.hsn, // Example; update based on your form data
      },
    ];

    const orderPayload = {
      order_id: "ORDER123456", // Or generate this dynamically if needed
      order_date: new Date().toISOString(),
      pickup_location: "Primary",
      billing_customer_name: formData.name,
      billing_last_name: formData.lastName,
      billing_address: formData.address,
      billing_address_2: formData.landmark,
      billing_city: formData.city,
      billing_pincode: formData.pincode,
      billing_state: formData.state,
      billing_country: formData.country,
      billing_email: formData.email,
      billing_phone: formData.phone,
      shipping_is_billing: formData.shippingIsBilling,
      shipping_customer_name: formData.name,
      shipping_last_name: formData.lastName,
      shipping_address: formData.address,
      shipping_address_2: formData.landmark,
      shipping_city: formData.city,
      shipping_pincode: formData.pincode,
      shipping_country: formData.country,
      shipping_state: formData.state,
      shipping_email: formData.email,
      shipping_phone: formData.phone,
      order_items: orderItems,
      payment_method: formData.paymentMethod,
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: formData.subTotal,
      length: formData.length,
      breadth: formData.breadth,
      height: formData.height,
      weight: formData.weight,
    };

    const requestPayload = { orderData: orderPayload };

    try {
      console.log("Sending payload:", requestPayload);
      const response = await axios.post(
        "http://localhost:5000/create-order",
        requestPayload
      );

      if (response.status === 200) {
        console.log("Order created successfully:", response.data);

        if (onProceed) {
          onProceed(formData);
        }

        alert("Order created successfully!");
      } else {
        console.error("Unexpected response status:", response.status);
        alert(
          `Failed to create order. Status: ${response.status}, Message: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error(
        "Error creating order:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Failed to create order. Error: ${
          error.response ? error.response.data : error.message
        }`
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <div>
        <h1 className="text-xl font-bold mb-4">Order Summary</h1>
        <div className="mb-4">
          <p className="font-semibold">Product:</p>
          <p>{orderData.productId}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Color:</p>
          <p>{orderData.color}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Size:</p>
          <p>{orderData.size}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Quantity:</p>
          <p>{orderData.quantity}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Price:</p>
          <p>{orderData.price}</p>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Enter Delivery Details
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Delivery Address Section */}
        <div>
          <h4 className="text-lg font-semibold text-gray-600 mb-4">
            Delivery Address
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-2">House/Flat No.</label>
              <input
                type="text"
                name="houseNo"
                value={formData.houseNo}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.houseNo ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Flat 401, Building Name"
              />
              {errors.houseNo && (
                <p className="text-red-500 text-sm">{errors.houseNo}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="123 Main St"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="City"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.pincode ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="123456"
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm">{errors.pincode}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="State"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="1234567890"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-2">
                Alternate Phone Number
              </label>
              <input
                type="text"
                name="altPhone"
                value={formData.altPhone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300"
                placeholder="0987654321"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Landmark</label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300"
                placeholder="Near Main Gate"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300"
              >
                <option value="Prepaid">Prepaid</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryAddress;
