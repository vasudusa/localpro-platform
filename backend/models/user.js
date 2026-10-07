module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    tenant_id: {
      type: DataTypes.UUID,
      references: { model: 'Tenants', key: 'id' }
    },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password_hash: DataTypes.STRING,
    role: DataTypes.ENUM('super_admin', 'vendor_admin', 'vendor_staff', 'customer')
  });
  return User;
};
