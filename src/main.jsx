import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import NewArrivals from "./components/NewArrivals.jsx";
import ResponsiveeGrid from "./components/ProductsDetails/ProductOverView.jsx";
import Example from "./components/ProductsDetails/ProductToCart.jsx";
import Root from "./components/Root.jsx";
import Header from "./components/Header.jsx";
import Trial from "./components/Trial.jsx";
import Test from "./components/Test.jsx";
import ProductDetail from "./components/ProductsDetails/ProductToCart.jsx";
import LoginPage from "./components/LoginPage.jsx";
import DeliveryAddress from "./backend/Deliveryadress.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import RefundPolicy from "./components/RefundPolicy.jsx";
import TermsOfService from "./components/TermOfSerVices.jsx";
import ReturnOrder from "./components/ReturnsOrders.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route
            path="/new-Arrivals"
            element={
              <NewArrivals
                headerText={"New Arrivals"}
                pTag={"bhh b"}
                collection={"New Arrivals"}
              />
            }
          />
          <Route path="home" element={<HomePage />} />
          <Route
            path="/sarees"
            element={<ResponsiveeGrid category={"Sarees"} />}
          />
          <Route
            path="/RajputaniPosak"
            element={<ResponsiveeGrid category={"RajputaniPosak"} />}
          />
          <Route
            path="/suits"
            element={<ResponsiveeGrid category={"Suits"} />}
          />
          <Route path="/sale" element={<ResponsiveeGrid category={"sale"} />} />
          <Route
            path="/gowns"
            element={<ResponsiveeGrid category={"Gowns"} />}
          />
          <Route path="/delivery-address" element={<DeliveryAddress />} />
          <Route
            path="/kurti"
            element={<ResponsiveeGrid category={"Kurti"} />}
          />
          <Route
            path="/co-ord-set"
            element={<ResponsiveeGrid category={"co-ord-set"} />}
          />
          <Route
            path="/Unstitched Suits"
            element={<ResponsiveeGrid category={"Unstitched Suits"} />}
          />
          <Route
            path="/Lehengas"
            element={<ResponsiveeGrid category={"Lehengas"} />}
          />
          <Route
            path="/Wedding-Collection"
            element={<ResponsiveeGrid category={"Wedding Collection"} />}
          />
          <Route
            path="/Best-Seller"
            element={<ResponsiveeGrid category={"BestSeller"} />}
          />
          <Route path="/trial" element={<Trial />}></Route>
          <Route path="/privacy" element={<PrivacyPolicy />}></Route>
          <Route path="/refund" element={<RefundPolicy />}></Route>
          <Route path="/loginpage" element={<LoginPage />}></Route>
          <Route path="/terms" element={<TermsOfService />}></Route>
          <Route path="/returns-orders" element={<ReturnOrder />}></Route>
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route index element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
