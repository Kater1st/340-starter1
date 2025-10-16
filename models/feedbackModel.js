/* ****************************************
 * Feedback Model
 *****************************************/
const pool = require("../database/");

async function insertFeedback(name, email, message) {
  try {
    const sql = `INSERT INTO feedback (name, email, message)
                 VALUES ($1, $2, $3) RETURNING *`;
    const result = await pool.query(sql, [name, email, message]);
    return result.rows[0];
  } catch (error) {
    console.error("Database insert error:", error);
    throw error;
  }
}

async function getAllFeedback() {
  try {
    const result = await pool.query("SELECT * FROM feedback ORDER BY created_at DESC");
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

module.exports = { insertFeedback, getAllFeedback };
