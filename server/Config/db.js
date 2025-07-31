require("dotenv").config();
const mysql = require("mysql2/promise");

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'ketaki2893',
    database: process.env.DB_NAME || 'vm3_crm'
    });
    console.log("MySQL connected");
    return connection;
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

if (require.main === module) {
  connectDB();
}

