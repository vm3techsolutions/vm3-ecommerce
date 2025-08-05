const mysql = require("mysql2/promise");
require("dotenv").config();

let pool;

const connectDB = async () => {
  try {
    pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
    });
    console.log("MySQL connected");
  } catch (err) {
    console.error("MySQL connection error:", err);
  }
};

const getDB = () => pool;

module.exports = { connectDB, getDB };
