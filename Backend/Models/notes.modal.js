const { DataTypes } = require("sequelize");
const sequelize = require("../Helper/Connect");

const Notes = sequelize.define("notes", {
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
  unit_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  block: {
    type: DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull: true,
  },
});

module.exports = Notes;
