const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const Joi = require('joi');

const validateEmail = (email) => {
  return Joi.string().email().validate(email).error === undefined;
};

const validatePassword = (password) => {
  const schema = Joi.string().min(8).regex(/.*[A-Z].*/).regex(/.*\W.*/);
  return schema.validate(password).error === undefined;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generateUUID = () => {
  return uuid.v4();
};

module.exports = { validateEmail, validatePassword, hashPassword, generateUUID };
