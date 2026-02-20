const { DataTypes } = require("sequelize");
const sequelize = require("../Helper/Connect");

const Setting = sequelize.define("settings", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  home_screen_img: {
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
  firebase: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  entrance_img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mail_template: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  send_mail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  app_password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  signin_img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  signup_img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  privacy_Policy: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  terms_of_service: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Setting;
