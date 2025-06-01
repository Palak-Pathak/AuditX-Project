const pool = require('../db'); // Make sure you have db.js with pg Pool setup

async function createUser(username, email, hashedPassword) {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [username, email, hashedPassword];
  const res = await pool.query(query, values);
  return res.rows[0];
}

async function findUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const res = await pool.query(query, [email]);
  return res.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
};
