const express = require("express");
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword } = require("../Controller/userController");
const {category} = require("../Controller/getCategories/category")
const {roles} = require("../Controller/getRoles/get-roles")

// Registration route
router.post("/register", registerUser);

// ✅ Login route
router.post("/login", loginUser);

// ✅ Forgot-Password route
router.post("/forgot-password", forgotPassword);

// ✅ Reset-Password route
router.post("/reset-password/:token", resetPassword);

//Category Route
router.get("/categories", category);
router.get("/roles", roles);

module.exports = router;

