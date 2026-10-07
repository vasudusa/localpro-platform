module.exports = (sequelize, DataTypes) => {
  const Offering = sequelize.define('Offering', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    tenant_id: { type: DataTypes.UUID, references: { model: 'Tenants', key: 'id' } },
    type: DataTypes.ENUM('product', 'service', 'appointment'),
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    stock: DataTypes.INTEGER,
    duration: DataTypes.INTEGER // minutes
  });
  return Offering;
};
