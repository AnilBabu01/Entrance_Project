const { DataTypes } = require("sequelize");
const sequelize = require("../Helper/Connect");

const TestCategory = sequelize.define("testcategory", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  block: {
    type: DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull: true,
  },
});

module.exports = TestCategory;
