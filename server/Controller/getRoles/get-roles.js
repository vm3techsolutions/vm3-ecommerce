const { getDB } = require("../../Config/db");

exports.roles = async (req, res) => {
  try {
    const db = getDB();
    const [roles] = await db.query("SELECT * FROM roles WHERE name != 'admin'");
    res.status(200).json(roles);
  } catch (err) {
    console.error("Error fetching roles:", err);
    res.status(500).json({ message: "Error fetching roles", error: err });
  }
};



