const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL || {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const Tenant = require('./tenant')(sequelize);
const User = require('./user')(sequelize);
const Offering = require('./offering')(sequelize);
const Appointment = require('./appointment')(sequelize);
const Transaction = require('./transaction')(sequelize);
const VendorSetting = require('./vendor_setting')(sequelize);

// Associations
User.belongsTo(Tenant, { foreignKey: 'tenant_id' });
Tenant.hasMany(User, { foreignKey: 'tenant_id' });

Offering.belongsTo(Tenant, { foreignKey: 'tenant_id' });
Tenant.hasMany(Offering, { foreignKey: 'tenant_id' });

Appointment.belongsTo(Tenant, { foreignKey: 'tenant_id' });
Appointment.belongsTo(Offering, { foreignKey: 'offering_id' });
Tenant.hasMany(Appointment, { foreignKey: 'tenant_id' });
Offering.hasMany(Appointment, { foreignKey: 'offering_id' });

Transaction.belongsTo(Tenant, { foreignKey: 'tenant_id' });
Tenant.hasMany(Transaction, { foreignKey: 'tenant_id' });

VendorSetting.belongsTo(Tenant, { foreignKey: 'tenant_id' });
Tenant.hasOne(VendorSetting, { foreignKey: 'tenant_id' });

module.exports = { sequelize, Tenant, User, Offering, Appointment, Transaction, VendorSetting };
