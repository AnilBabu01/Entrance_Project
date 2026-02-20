const { DataTypes } = require("sequelize");
const sequelize = require("../Helper/Connect");

const Mission = sequelize.define("missions", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  block: {
    type: DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull: true,
  },
 
});

module.exports = Mission;
