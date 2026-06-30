require("dotenv").config();

console.log("MONGO_URI =", process.env.MONGO_URI);

const express =
  require("express");

const cors =
  require("cors");

const connectDB =
  require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const eventRoutes =
  require("./routes/eventRoutes");

const bookingRoutes =
  require("./routes/bookingRoutes");

const paymentRoutes =
  require("./routes/paymentRoutes");

const adminRoutes =
  require("./routes/adminRoutes");


const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/events",
  eventRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);

app.use(
  "/api/payment",
  paymentRoutes
);

const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*all", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Event Booking API Running");
  });
}
console.log(
  "KEY:",
  process.env.RAZORPAY_KEY_ID
);

console.log(
  "SECRET:",
  process.env.RAZORPAY_SECRET
);

app.listen(
  process.env.PORT,
  () => {
    console.log(
      `Server running on ${process.env.PORT}`
    );
  }
);