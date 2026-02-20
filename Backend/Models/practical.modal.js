const { DataTypes } = require("sequelize");
const sequelize = require("../Helper/Connect");

const Practical = sequelize.define("practical", {
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
  pdf_practical: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  block: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
});

module.exports = Practical;
