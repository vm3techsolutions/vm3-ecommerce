require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./routes/auth-router');
const cartRouter = require('./routes/cart-router');
const wishlistRoutes = require("./routes/wishlist");


const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONT_END_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // For form data

// Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
//app.use('/api/auth', router);
app.use('/api', router);
// Add this line to register cart routes
app.use('/api', cartRouter);

app.use("/api/wishlist", wishlistRoutes);

// Start Server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
