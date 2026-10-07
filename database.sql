
CREATE TABLE IF NOT EXISTS tenants (
  id SERIAL PRIMARY KEY,
  business_name TEXT,
  vendor_type TEXT,
  subdomain TEXT UNIQUE,
  whatsapp_number TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER REFERENCES tenants(id),
  name TEXT,
  email TEXT UNIQUE,
  password_hash TEXT,
  role TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- offerings table for vendor products/services
CREATE TABLE IF NOT EXISTS offerings (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER REFERENCES tenants(id),
  title TEXT,
  description TEXT,
  price NUMERIC DEFAULT 0,
  duration_minutes INTEGER DEFAULT 30,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- appointments booked by customers
CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER REFERENCES tenants(id),
  offering_id INTEGER REFERENCES offerings(id),
  customer_name TEXT,
  customer_contact TEXT,
  start_at TIMESTAMP,
  end_at TIMESTAMP,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- simple transaction record
CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER REFERENCES tenants(id),
  user_id INTEGER REFERENCES users(id),
  offering_id INTEGER REFERENCES offerings(id),
  amount NUMERIC,
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- vendor-specific settings, one row per tenant
CREATE TABLE IF NOT EXISTS vendor_settings (
  tenant_id INTEGER PRIMARY KEY REFERENCES tenants(id),
  whatsapp_number TEXT,
  theme JSONB,
  working_hours JSONB,
  slot_duration_minutes INTEGER DEFAULT 30,
  updated_at TIMESTAMP DEFAULT NOW()
);
