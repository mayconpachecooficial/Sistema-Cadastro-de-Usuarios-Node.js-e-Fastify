const fastify = require('fastify')({ logger: true });
require('dotenv').config();

fastify.register(require('@fastify/formbody'));

fastify.register(require('./src/routes/userRoutes'));

fastify.get('/', async (request, reply) => {
  return { message: 'Bem-vindo ao sistema de cadastro de usuários!' };
});


const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
