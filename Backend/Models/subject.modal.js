const { DataTypes } = require("sequelize");
const sequelize = require("../Helper/Connect");

const Subject = sequelize.define("subject", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  subject_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sem_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  block: {
    type: DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull: true,
  },
});

module.exports = Subject;
