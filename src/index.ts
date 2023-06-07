import Fastify from 'fastify';
import { verifyUserProvider } from './core/user/imperative-shell/providers/verify-user.provider';
import { InMemoryUserRepository } from './core/user/imperative-shell/infrastructure/inmemory-user-repository';
import { Static, Type } from '@sinclair/typebox';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const server = Fastify().withTypeProvider<TypeBoxTypeProvider>();

const User = Type.Object({
  email: Type.String(),
  name: Type.String(),
});

const UserError = Type.String();

type UserType = Static<typeof User>;
type UserErrorType = Static<typeof UserError>;

server.put<{ Body: UserType; Reply: UserType | UserErrorType }>(
  '/verify',
  {
    schema: {
      body: User,
      response: {
        200: User,
        400: UserError,
      },
    },
  },
  async ({ body }, reply) => {
    const repository = new InMemoryUserRepository([]);

    const providerResult = await verifyUserProvider(repository, body.email, body.name);

    return providerResult.match(
      result => reply.status(200).send(result),
      result => reply.status(400).send(result.message),
    );
  },
);

server.listen({ port: 8080 }, (error, address) => {
  if (error) {
    console.error(error);
    throw new Error(error.toString());
  }
  console.log(`Server listening at ${address}`);
});
