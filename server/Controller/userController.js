const bcrypt = require("bcryptjs");
const { getDB } = require("../Config/db");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//Sign-Up
exports.registerUser = async (req, res) => {
  const { name, email, phone, password, role_id } = req.body;

  // 🔒 Block admin role from being assigned during registration
  if (role_id == 1) {
    return res.status(403).json({ message: "You are not allowed to register as an administrator" });
  }


  if (!name || !email || !phone || !password || !role_id) {
    return res.status(400).json({ message: "All fields are required including role" });
  }

  try {
    const db = getDB();

    // 1. Check for duplicate user
    const [existing] = await db.query(
      "SELECT * FROM users WHERE email = ? OR phone = ?",
      [email, phone]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "User already exists with this email or phone" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert user into users table
    const [userResult] = await db.query(
      "INSERT INTO users (name, email, phone, password, created_at) VALUES (?, ?, ?, ?, NOW())",
      [name, email, phone, hashedPassword]
    );

    const userId = userResult.insertId;

    // 4. Insert role mapping into user_roles table
    await db.query(
      "INSERT INTO user_roles (user_id, role_id, assigned_by, created_at) VALUES (?, ?, ?, NOW())",
      [userId, role_id, userId] // assuming self-assignment
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const db = getDB();

    // Step 1: Get user by email
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = users[0];

    // Step 2: Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Step 3: Get role from user_roles table
    const [roles] = await db.query("SELECT role_id FROM user_roles WHERE user_id = ?", [user.id]);
    const role_id = roles[0]?.role_id;

    if (!role_id) {
      return res.status(403).json({ message: "User role not assigned." });
    }

    // Step 4: Create JWT with role
    const token = jwt.sign(
      { userId: user.id, role: role_id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Step 5: Respond with token and user
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: role_id, // Include role for frontend use
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//Forgot-Password

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const db = getDB();

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 7200000); // 2 hour expiry

    await db.query(
      "UPDATE users SET password_reset_token = ?, token_expiry = ? WHERE email = ?",
      [token, expiry, email]
    );

    // Normally you send an email. For now, return the token in response
    return res.status(200).json({
      message: "Password reset link generated",
      resetLink: `http://localhost:3000/reset-password/${token}`,
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//Reset-Password

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: "New password is required" });
  }

  try {
    // ✅ Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // ✅ This matches the key in your JWT payload

    // ✅ Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const db = getDB();

    // ✅ Update password in DB
    await db.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      userId,
    ]);

    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};