const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER || "auditxuser",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "auditxdb",
  password: process.env.PGPASSWORD || "Palak@123",
  port: process.env.PGPORT || 5432,
});

module.exports = pool;
