const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('combined'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Tenant resolution middleware
app.use('/api', require('./middleware/tenant.middleware'));

// Auth routes
app.use('/api/auth', require('./routes/auth.routes'));

// Super Admin routes
app.use('/api/superadmin', require('./middleware/superadmin.middleware'), require('./routes/superadmin.routes'));

// Tenant routes
app.use('/api', require('./middleware/auth.middleware'), require('./routes/tenant.routes'));

// Error handling
app.use(require('./middleware/error.middleware'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
