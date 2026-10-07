/**
 * Simple seed script to create a demo tenant + vendor admin
 * Usage: set env vars (DATABASE_URL, JWT_SECRET) and run `node server/scripts/seed.js`
 */
const db = require('../config/db');
const bcrypt = require('bcrypt');

async function run(){
  try{
    console.log('Running seed...');
    // Create demo tenant
    const tRes = await db.query(`INSERT INTO tenants (business_name, subdomain) VALUES ($1,$2) ON CONFLICT (subdomain) DO UPDATE SET business_name = EXCLUDED.business_name RETURNING id`, ['Demo Vendor','demo']);
    const tenantId = tRes.rows[0].id;
    console.log('Created tenant id', tenantId);
    const passwordHash = await bcrypt.hash('password123',10);
    // Create vendor admin
    await db.query(`INSERT INTO users (tenant_id, name, email, password_hash, role) VALUES ($1,$2,$3,$4,$5)`, [tenantId,'Demo Admin','admin@demo.local', passwordHash, 'vendor_admin']).catch(()=>null);
    // Create a sample offering
    await db.query(`INSERT INTO offerings (tenant_id, title, description, price, duration_minutes) VALUES ($1,$2,$3,$4,$5)`, [tenantId,'Sample Consultation','A 30 minute sample consult',50,30]);
    console.log('Seed complete. Demo admin credentials: admin@demo.local / password123');
    process.exit(0);
  }catch(err){
    console.error('Seed error', err);
    process.exit(1);
  }
}
run();
