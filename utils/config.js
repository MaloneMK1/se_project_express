const PORT = process.env.PORT || 3001;
const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/wtwr_db";
const JWT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.JWT_SECRET
    : process.env.JWT_SECRET || "dev-secret";

module.exports = { PORT, DATABASE_URL, JWT_SECRET };
