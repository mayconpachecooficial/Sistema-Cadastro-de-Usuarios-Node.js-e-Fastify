const userController = require('../controllers/userController');

async function routes(fastify, options) {
  fastify.post('/register', userController.registerUser);
}

module.exports = routes;
