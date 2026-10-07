module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define('Tenant', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    business_name: DataTypes.STRING,
    vendor_type: DataTypes.ENUM('restaurant', 'salon', 'repair', 'service', 'retail'),
    subdomain: { type: DataTypes.STRING, unique: true },
    logo_url: DataTypes.STRING,
    banner_url: DataTypes.STRING,
    whatsapp_number: DataTypes.STRING,
    subscription_plan: DataTypes.ENUM('free', 'pro', 'enterprise'),
    status: DataTypes.ENUM('active', 'suspended', 'inactive')
  });
  return Tenant;
};
