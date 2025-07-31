const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./Router/auth-router");
const connectDB = require("./Config/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api/users", userRoutes);

// Server Start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
