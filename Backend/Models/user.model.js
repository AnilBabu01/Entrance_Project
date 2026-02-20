const { DataTypes } = require("sequelize");
const sequelize = require("../Helper/Connect");

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  state: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  district: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  city: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  collegeName: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  studyIn: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  otp:{
    type:DataTypes.TEXT,
    allowNull: true,
  },
  resetOtp:{
    type:DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = User;
