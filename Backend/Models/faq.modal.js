const { DataTypes } = require("sequelize");
const sequelize = require("../Helper/Connect");

const FAQ = sequelize.define("faqs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ans: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  block: {
    type: DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull: true,
  },
});

module.exports = FAQ;
