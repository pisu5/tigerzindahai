import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebaseApp from "../firebaseConfig"; // Import Firebase config
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import logo from "../assets/anejamalllogo.jpg";

const SettingsPage = () => {
  const auth = getAuth(firebaseApp); // Get Firebase auth instance
  const database = getDatabase(firebaseApp); // Get Firebase database instance
  const navigate = useNavigate();

  const [orderHistory, setOrderHistory] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  // Fetch user information and order history
  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;

      // Fetch user information
      const userRef = ref(database, "users/" + userId);
      onValue(userRef, (snapshot) => {
        setUserInfo(snapshot.val() || {});
      });

      // Fetch order history
      const ordersRef = ref(database, "orders/" + userId);
      onValue(ordersRef, (snapshot) => {
        setOrderHistory(snapshot.val() || []);
      });
    }
  }, [auth, database]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/loginpage"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Error logging out. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Aneja Mall Logo" className="h-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Settings
        </h2>

        <section className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Profile Information
          </h3>
          <div className="p-4 border rounded-md bg-gray-50">
            <p>
              <strong>Name:</strong> {userInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>Address:</strong> {userInfo.address}
            </p>
            <p>
              <strong>Phone:</strong> {userInfo.phone}
            </p>
            <p>
              <strong>City:</strong> {userInfo.city}
            </p>
            <p>
              <strong>Country:</strong> {userInfo.country}
            </p>
            <p>
              <strong>From Gwalior:</strong>{" "}
              {userInfo.isFromGwalior ? "Yes" : "No"}
            </p>
            <p>
              <strong>Favorite Wear:</strong> {userInfo.favoriteWear}
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Order History
          </h3>
          {orderHistory.length > 0 ? (
            <ul className="list-disc pl-5">
              {orderHistory.map((order, index) => (
                <li
                  key={index}
                  className="mb-2 p-2 border rounded-md bg-gray-50"
                >
                  <p>
                    <strong>Order ID:</strong> {order.orderId}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found.</p>
          )}
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Additional Settings
          </h3>
          <div className="p-4 border rounded-md bg-gray-50">
            {/* Add more settings options here */}
            <p>Manage your preferences and other settings.</p>
          </div>
        </section>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
