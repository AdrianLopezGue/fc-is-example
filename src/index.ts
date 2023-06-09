import Fastify from 'fastify';
import { verifyUserProvider } from './core/user/imperative-shell/providers/verify-user.provider';
import { InMemoryUserRepository } from './core/user/imperative-shell/infrastructure/inmemory-user-repository';
import { Static, Type } from '@sinclair/typebox';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { createUnverifiedUserProvider } from './core/user/imperative-shell/providers/create-unverified-user.provider';

const server = Fastify().withTypeProvider<TypeBoxTypeProvider>();

const VerifyUserRequest = Type.Object({
  email: Type.String(),
  name: Type.String(),
});

const UnverifiedUser = Type.Object({
  email: Type.String(),
  age: Type.Number(),
});

const VerifiedUser = Type.Object({
  email: Type.String(),
  name: Type.String(),
  age: Type.Number(),
});

const UserError = Type.String();

type VerifyUserRequestType = Static<typeof VerifyUserRequest>;
type VerifiedUserType = Static<typeof VerifiedUser>;
type UnverifiedUserType = Static<typeof UnverifiedUser>;
type UserErrorType = Static<typeof UserError>;

server.put<{ Body: VerifyUserRequestType; Reply: VerifiedUserType | UserErrorType }>(
  '/verify',
  {
    schema: {
      body: VerifyUserRequest,
      response: {
        200: VerifiedUser,
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

server.post<{
  Body: UnverifiedUserType;
  Reply: UnverifiedUserType | UserErrorType;
}>(
  '/create',
  {
    schema: {
      body: UnverifiedUser,
      response: {
        200: UnverifiedUser,
        400: UserError,
      },
    },
  },
  async ({ body }, reply) => {
    const repository = new InMemoryUserRepository([]);

    const providerResult = await createUnverifiedUserProvider(
      repository,
      body.email,
      body.age,
    );

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
