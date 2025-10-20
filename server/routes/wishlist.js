// routes/wishlist.js
const express = require("express");
const router = express.Router();
const db = require("../Config/db"); // MySQL connection (mysql2/promise)

// =========================
// GET wishlist for a user
// =========================
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [results] = await db.query(
      `
      SELECT w.id AS wishlist_id, p.*
      FROM wishlists w
      JOIN packages p ON w.package_id = p.id
      WHERE w.user_id = ?
      ORDER BY w.created_at DESC
      `,
      [userId]
    );

    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching wishlist:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// =========================
// ADD to wishlist
// =========================
router.post("/", async (req, res) => {
  try {
    const { userId, packageId } = req.body;

    if (!userId || !packageId) {
      return res.status(400).json({ error: "Missing userId or packageId" });
    }

    // Insert (ignore duplicate)
    await db.query(
      "INSERT INTO wishlists (user_id, package_id, created_at) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE package_id = package_id",
      [userId, packageId]
    );

    // ✅ Fetch the full package details to return
    const [rows] = await db.query(
      `SELECT p.* 
       FROM packages p 
       JOIN wishlists w ON p.id = w.package_id 
       WHERE w.user_id = ? AND w.package_id = ?`,
      [userId, packageId]
    );

    if (rows.length > 0) {
      res.json(rows[0]); // return the actual package object
    } else {
      res.status(404).json({ error: "Package not found" });
    }
  } catch (error) {
    console.error("❌ Error adding to wishlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// =========================
// REMOVE from wishlist
// =========================
router.delete("/", async (req, res) => {
  const { userId, packageId } = req.body;

  if (!userId || !packageId) {
    return res.status(400).json({ error: "Missing userId or packageId" });
  }

  try {
    const [result] = await db.query(
      "DELETE FROM wishlists WHERE user_id = ? AND package_id = ?",
      [userId, packageId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found in wishlist" });
    }

    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("❌ Error removing from wishlist:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
