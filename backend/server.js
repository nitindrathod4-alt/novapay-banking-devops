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

// API Routes
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/statement", statementRoutes);

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
