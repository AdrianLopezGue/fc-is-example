import fastify from 'fastify';

const server = fastify();

server.get('/ping', (_request, _reply) => {
  return 'pong\n';
});

server.listen({ port: 8080 }, (error, address) => {
  if (error) {
    console.error(error);
    throw new Error(error.toString());
  }
  console.log(`Server listening at ${address}`);
});
