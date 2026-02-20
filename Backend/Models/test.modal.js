const { DataTypes } = require("sequelize");
const sequelize = require("../Helper/Connect");

const Test = sequelize.define("tests", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marksPerQuestion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  physics_question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  math_question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  chemistry_question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  english_question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  computer_question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});


module.exports = Test;
