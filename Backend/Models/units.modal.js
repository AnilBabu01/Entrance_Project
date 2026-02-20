const { DataTypes } = require("sequelize");
const sequelize = require("../Helper/Connect");

const Units = sequelize.define("units", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  course_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sem_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unit: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  block: {
    type: DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull: true,
  },
});

module.exports = Units;
