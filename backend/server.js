const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Static folder for uploaded profile photos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const statementRoutes = require("./routes/statementRoutes");
const adminKycRoutes = require("./routes/adminKycRoutes");
const rechargeRoutes = require("./routes/rechargeRoutes");
const billRoutes = require("./routes/billRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const adminTicketRoutes = require("./routes/adminTicketRoutes");
const receiptRoutes = require("./routes/receiptRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const withdrawalRoutes = require("./routes/withdrawalRoutes");

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/statement", statementRoutes);
app.use("/api/admin", adminKycRoutes);
app.use("/api/recharge", rechargeRoutes);
app.use("/api/bill", billRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/admin-tickets", adminTicketRoutes);
app.use("/api/receipt", receiptRoutes);
app.use("/api/withdrawals", withdrawalRoutes);
app.use("/api/bookings", bookingRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("🏦 NovaPay Backend API Running...");
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "UP",
    message: "NovaPay Backend is Healthy",
    time: new Date(),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
