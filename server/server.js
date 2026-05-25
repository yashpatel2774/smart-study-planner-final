const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
console.log("THIS IS MY CURRENT SERVER FILE 🔥");
/* ====================== CORS ====================== */

const allowedOrigins = [
  "http://localhost:5173",
  "https://smart-studies-planner.netlify.app",
];

app.use((req, res, next) => {

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* ====================== BODY PARSER ====================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ====================== HEALTH ROUTE ====================== */

app.get("/", (req, res) => {
  res.send("Smart Study Planner API Running 🚀");
});

/* ====================== ROUTES ====================== */

console.log("AUTH ROUTES LOADING 🔥");

const authRoutes = require("./routes/authRoutes");

console.log(authRoutes);

const taskRoutes = require("./routes/taskRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);

/* ====================== DATABASE ====================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err.message));

/* ====================== CRON ====================== */

require("./cron/reminderJob");

/* ====================== SERVER ====================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});