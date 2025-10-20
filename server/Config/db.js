require ("dotenv").config(); //Loads ENV
const mysql = require("mysql2/promise");


const db = mysql.createPool({
  // host: process.env.DB_HOST || "localhost",
  // user: process.env.DB_USER || "root",
  // // password: process.env.DB_PASSWORD || "Mahesh@123",
  // password: process.env.DB_PASSWORD || "root",
  // database: process.env.DB_NAME || "vm3_eccomerce",
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to MySQL database.");
    connection.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
})();

module.exports = db;
