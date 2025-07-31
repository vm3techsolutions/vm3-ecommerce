const bcrypt = require("bcryptjs");
const connectDB = require("../Config/db");

exports.registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const db = await connectDB();

    // Check if user already exists (by email or phone)
    const [existing] = await db.query(
      "SELECT * FROM users WHERE email = ? OR phone = ?",
      [email, phone]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "User already exists with this email or phone" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, phone, password, created_at) VALUES (?, ?, ?, ?, NOW())",
      [name, email, phone, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
