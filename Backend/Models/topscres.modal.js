const { DataTypes } = require("sequelize");
const sequelize = require("../Helper/Connect");

const TopScres = sequelize.define("topscores", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  test_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secondLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thirdLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = TopScres;
