const pool = require('./db');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Postgres connected:', res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('Postgres connection error:', err);
    process.exit(1);
  }
})();
