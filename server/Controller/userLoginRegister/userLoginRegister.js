const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../Config/db");
const sendEmail = require("../../Config/forgotMail");


// Signup
const userSignUp = async (req, res) => {
  const { name, email, phone, password, role_id } = req.body;

  if (role_id == 1) {
    return res.status(403).json({ message: "You are not allowed to register as an administrator" });
  }

  if (!name || !email || !phone || !password || !role_id) {
    return res.status(400).json({ message: "All fields are required including role" });
  }

  try {
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
      [userId, role_id, userId]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
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
        role_id: role_id,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Forgot Password

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check if user exists
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    // 2. Generate token (valid 15 min)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // 3. Reset link for frontend
    const resetLink = `${process.env.FRONT_END_URL}/reset-password/${token}`;

    // 4. Send email
    await sendEmail(
      user.email,
      "Password Reset Request",
      `Click the link below to reset your password: <br/><br/>
       <a href="${resetLink}" style="color:blue">${resetLink}</a>`
    );

    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


// Reset Password

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params; // comes from URL /reset-password/:token
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    // 1. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. Check if user still exists
    const [users] = await db.query("SELECT * FROM users WHERE id = ?", [decoded.id]);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Update user password in DB
    await db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, decoded.id]);

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};



module.exports = {
  userSignUp,
  userLogin,
  forgotPassword,
  resetPassword,
};
