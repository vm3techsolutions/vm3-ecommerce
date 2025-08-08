// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./Config/db");

const authRoutes = require("./Router/auth-router");


dotenv.config();
const app = express(); // ✅ Declare `app` before using it
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

// ✅ Mount routes after `app` is initialized

app.use("/api/auth", authRoutes);


app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
