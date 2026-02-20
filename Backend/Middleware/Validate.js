const { check, body } = require("express-validator");
const { Validate } = require("./Validation");
const joi = require("joi");

const RegisterValidation = async (req, res, next) => {
  const schema = joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phone: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    studyIn:joi.string().optional()
   });
  await Validate(req, res, next, schema);
};

const LoginValidation = async (req, res, next) => {
  const schema = joi.object().keys({
    email: joi.string().required(),
    password: joi.string().min(6).required(),
  });
  await Validate(req, res, next, schema);
};

const AddressLinkValidation = async (req, res, next) => {
  const schema = joi.object().keys({
    label: joi.string().required(),
    address: joi.string().required(),
    coin_name: joi.string().required(),
    manageBy: joi.string().required(),
  });
  await Validate(req, res, next, schema);
};

const UpdateAddressLinkValidation = async (req, res, next) => {
  const schema = joi.object().keys({
    label: joi.string().required(),
    address: joi.string().required(),
    coin_name: joi.string().required(),
    manageBy: joi.string().required(),
    id: joi.number().required(),
  });
  await Validate(req, res, next, schema);
};

const RegisterAdminValidation = async (req, res, next) => {
  const schema = joi.object().keys({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  await Validate(req, res, next, schema);
};

const LoginAdminValidation = async (req, res, next) => {
  const schema = joi.object().keys({
    email: joi.string().required(),
    password: joi.string().min(6).required(),
  });
  await Validate(req, res, next, schema);
};

module.exports = {
  LoginValidation,
  RegisterValidation,
  LoginAdminValidation,
  RegisterAdminValidation,
  AddressLinkValidation,
  UpdateAddressLinkValidation,
};
