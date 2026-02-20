const { DataTypes } = require("sequelize");
const sequelize = require("../Helper/Connect");

const Admin = sequelize.define("admins", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  follow_us: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  facebook_profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  instagram_Profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedln_Profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  youtube_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  about_us: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  about_img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hideText: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  hideTextStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: true,
  },
  footer_left: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: true,
  },
});

module.exports = Admin;
