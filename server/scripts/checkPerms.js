/*
Check current user and table privileges.
Usage:
  node server/scripts/checkPerms.js
The script uses the DATABASE_URL from .env, so ensure it points to localpro_user.
*/
const pool = require('../config/db');

async function run() {
  try {
    const { rows } = await pool.query("SELECT current_user, has_table_privilege(current_user,'tenants','SELECT') AS can_select");
    console.log(rows);
  } catch (err) {
    console.error('permission check error', err);
  } finally {
    await pool.end();
  }
}
run();
