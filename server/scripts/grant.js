/*
Grant privileges to the application role.

Usage:
  - set SUPER_CONN environment variable or edit the connection string below
  - run: node server/scripts/grant.js

Example (PowerShell):
  $env:SUPER_CONN="postgres://postgres:yourpassword@localhost:5432/localpro"
  node server/scripts/grant.js
*/

const { Pool } = require("pg");

// prefer superuser connection string from env
const superConn = process.env.SUPER_CONN ||
  "postgres://postgres:yourpassword@localhost:5432/localpro";

async function run() {
  const pool = new Pool({ connectionString: superConn });
  try {
    console.log("Connecting as superuser...");
    await pool.query("SELECT 1");

    console.log("Granting privileges to localpro_user...");
    await pool.query("GRANT ALL PRIVILEGES ON DATABASE localpro TO localpro_user");
    await pool.query("GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO localpro_user");
    await pool.query("GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO localpro_user");
    await pool.query(
      "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO localpro_user"
    );
    // also ensure localpro_user owns existing tables
    console.log("Updating table ownership to localpro_user...");
    await pool.query("ALTER TABLE tenants OWNER TO localpro_user");
    await pool.query("ALTER TABLE users OWNER TO localpro_user");
    await pool.query("ALTER TABLE offerings OWNER TO localpro_user").catch(()=>{});
    await pool.query("ALTER TABLE appointments OWNER TO localpro_user").catch(()=>{});
    await pool.query("ALTER TABLE transactions OWNER TO localpro_user").catch(()=>{});
    await pool.query("ALTER TABLE vendor_settings OWNER TO localpro_user").catch(()=>{});
    // transfer ownership of sequences as well
    console.log("Updating sequence ownership...");
    await pool.query("ALTER SEQUENCE IF EXISTS tenants_id_seq OWNER TO localpro_user").catch(()=>{});
    await pool.query("ALTER SEQUENCE IF EXISTS users_id_seq OWNER TO localpro_user").catch(()=>{});
    await pool.query("ALTER SEQUENCE IF EXISTS offerings_id_seq OWNER TO localpro_user").catch(()=>{});
    await pool.query("ALTER SEQUENCE IF EXISTS appointments_id_seq OWNER TO localpro_user").catch(()=>{});
    await pool.query("ALTER SEQUENCE IF EXISTS transactions_id_seq OWNER TO localpro_user").catch(()=>{});


    console.log("Grants complete.");
  } catch (err) {
    console.error("Error running grants:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run();
