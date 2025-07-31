const express = require("express");
const router = express.Router();
const { registerUser } = require("../Controller/userController");

router.post("/register", registerUser);

module.exports = router;
