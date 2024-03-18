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
