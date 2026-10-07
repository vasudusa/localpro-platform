
const { Pool } = require("pg");
require("dotenv").config();

const defaultDatabaseUrl = "postgresql://postgres:postgres@localhost:5432/localpro_platform";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || defaultDatabaseUrl,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

module.exports = pool;
