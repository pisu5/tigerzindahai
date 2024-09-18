import React, { useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "(123) 456-7890",
    address: "1234 Main St, Apt 101",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSave = () => {
    // Logic to save changes, e.g., API call
    console.log("User data saved:", userData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {/* Profile Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div className="flex items-center">
          {/* Profile Image */}
          <div className="relative w-24 h-24 mr-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile Image"
              className="w-full h-full rounded-full object-cover border-4 border-teal-500"
            />
            <button className="absolute bottom-0 right-0 bg-teal-500 text-white p-2 rounded-full text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          {/* User Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
            <p className="text-sm text-gray-600">{userData.email}</p>
          </div>
        </div>
        {/* Order History Button */}
        <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-2 rounded-full font-medium hover:scale-105 transition-transform duration-300">
          View Order History
        </button>
      </div>

      {/* Editable Information Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Editable Fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={userData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={userData.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={userData.address}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Save and Cancel Buttons */}
      <div className="mt-6 flex justify-end space-x-4">
        <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition duration-200">
          Cancel
        </button>
        <button
          className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition duration-200"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
