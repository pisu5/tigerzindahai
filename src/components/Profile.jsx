import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, update } from "firebase/database";
import { auth, db } from "../firebaseConfig"; // Assuming this is where your Firebase config is located

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, fetch their details
        const userRef = ref(db, `users/${user.uid}`);
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userDetails = snapshot.val();
              setUserData({
                name: userDetails.name || user.displayName,
                email: userDetails.email || user.email,
                phone: userDetails.phone || "",
                address: userDetails.address || "",
              });
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        console.log("No user is logged in");
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSave = () => {
    if (auth.currentUser) {
      const userRef = ref(db, `users/${auth.currentUser.uid}`);
      update(userRef, userData)
        .then(() => {
          console.log("User data updated successfully");
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {/* Profile Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div className="flex items-center">
          {/* Profile Image */}
          <div className="relative w-24 h-24 mr-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-teal-500"
            />
          </div>
          {/* User Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
            <p className="text-sm text-gray-600">{userData.email}</p>
          </div>
        </div>
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
              disabled
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-gray-100"
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

      {/* Save Button */}
      <div className="mt-6 flex justify-end space-x-4">
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
