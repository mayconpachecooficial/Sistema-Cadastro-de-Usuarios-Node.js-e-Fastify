// O código define a função registerUser para registrar um novo usuário, 
// validando e-mail e senha antes de criptografar a senha e salvar os dados 
// do usuário com um UUID único no banco de dados. 
// Após o registro, envia um e-mail de confirmação ao usuário.

const { createUser } = require('../models/userModel');
const { sendConfirmationEmail } = require('../services/emailService');
const { hashPassword, validateEmail, validatePassword, generateUUID } = require('../utils/validation');

const registerUser = async (req, reply) => {
  const { name, lastName, email, password, document } = req.body;

  if (!validateEmail(email) || !validatePassword(password)) {
    return reply.status(400).send({ message: 'Invalid email or password.' });
  }

  const passwordHash = await hashPassword(password);
  const affiliatedId = generateUUID();

  const userId = await createUser({ name, lastName, email, passwordHash, document, affiliatedId });

  await sendConfirmationEmail(email);

  return reply.send({ userId, message: 'User registered successfully. Please check your email to confirm.' });
};

module.exports = { registerUser };
