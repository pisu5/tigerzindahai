import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Create __dirname since it's not available with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(bodyParser.json());

// Updated CORS to allow localhost during development
app.use(
  cors({
    origin: "https://anejamalll.netlify.app", // Change this to your frontend domain in production
  })
);

// Serve React static files
app.use(express.static(path.join(__dirname, "build")));

// Helper function to generate a unique order ID
const generateOrderId = () => {
  return `ORD-${Math.floor(Math.random() * 1000000000)}`;
};

// API Route to create Shiprocket order
app.post("/create-order", async (req, res) => {
  const { orderData } = req.body; // Correct destructuring

  if (!orderData) {
    return res.status(400).json({
      error: "Order data is required",
    });
  }

  try {
    // Authenticate with Shiprocket
    const authResponse = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: "jaiswalprathna8@gmail.com", // Replace with your Shiprocket email
        password: "1234Pras@", // Replace with your Shiprocket password
      }
    );

    const token = authResponse.data.token; // Correct access of token

    // Create the Shiprocket order
    const createOrderResponse = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      {
        order_id: generateOrderId(),
        order_date: new Date().toISOString(),
        pickup_location: orderData.pickup_location || "Default Location",
        channel_id: orderData.channel_id || "",
        comment: orderData.comment || "",
        billing_customer_name: orderData.billing_customer_name || "",
        billing_last_name: orderData.billing_last_name || "",
        billing_address: orderData.billing_address || "",
        billing_address_2: orderData.billing_address_2 || "",
        billing_city: orderData.billing_city || "",
        billing_pincode: orderData.billing_pincode || "",
        billing_state: orderData.billing_state || "",
        billing_country: orderData.billing_country || "",
        billing_email: orderData.billing_email || "",
        billing_phone: orderData.billing_phone || "",
        shipping_is_billing: orderData.shipping_is_billing || false,
        shipping_customer_name: orderData.shipping_customer_name || "",
        shipping_last_name: orderData.shipping_last_name || "",
        shipping_address: orderData.shipping_address || "",
        shipping_address_2: orderData.shipping_address_2 || "",
        shipping_city: orderData.shipping_city || "",
        shipping_pincode: orderData.shipping_pincode || "",
        shipping_country: orderData.shipping_country || "",
        shipping_state: orderData.shipping_state || "",
        shipping_email: orderData.shipping_email || "",
        shipping_phone: orderData.shipping_phone || "",
        order_items: orderData.order_items || [],
        payment_method: orderData.payment_method || "Prepaid",
        shipping_charges: orderData.shipping_charges || 0,
        giftwrap_charges: orderData.giftwrap_charges || 0,
        transaction_charges: orderData.transaction_charges || 0,
        total_discount: orderData.total_discount || 0,
        sub_total: orderData.sub_total || 0,
        length: orderData.length || 0,
        breadth: orderData.breadth || 0,
        height: orderData.height || 0,
        weight: orderData.weight || 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Return success response
    res.json(createOrderResponse.data);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      error: "Failed to create order",
      details: error.response ? error.response.data : error.message,
    });
  }
});

// Serve `index.html` for any unknown routes (for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
