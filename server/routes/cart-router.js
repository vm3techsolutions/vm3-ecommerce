const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const {
  getCart,
  addToCart,
  mergeCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require('../controller/cart/cartController');

// Add item to cart (guest or user)
router.post('/cart/add', addToCart);

// Merge guest cart (user must be logged in)
router.post('/cart/merge', verifyToken, mergeCart);

// Update cart item (user logged in)
router.put('/cart/update', verifyToken, updateCartItem);

// Remove cart item by ID (user logged in)
router.delete('/cart/remove/:cartId', verifyToken, removeCartItem);

// Get cart (guest or user)
router.get('/cart/:id', getCart);

// Clear cart (user logged in)
router.post('/cart/clear', verifyToken, clearCart);

module.exports = router;
