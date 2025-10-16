const pool = require('../database');

async function createTable() {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS feedback (
        feedback_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(254) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `;
    await pool.query(sql);
    console.log('feedback table created or already exists');
    process.exit(0);
  } catch (err) {
    console.error('Error creating feedback table:', err.message || err);
    process.exit(1);
  }
}

createTable();
