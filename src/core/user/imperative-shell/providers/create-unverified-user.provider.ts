import { ResultAsync } from 'neverthrow';
import { Email } from '../../functional-core/domain/email';
import { UserRepository } from '../../functional-core/domain/services/user-repository';
import { UnverifiedUser } from '../../functional-core/domain/user';
import { Age } from '../../functional-core/domain/age';
import { createUnverifiedUseCase } from '../../functional-core/use-cases/create-unverified-user';

export const createUnverifiedUserProvider = (
  userRepository: UserRepository,
  email: Email,
  age: Age,
): ResultAsync<UnverifiedUser, Error> => {
  return createUnverifiedUseCase(email, age).asyncAndThen(user =>
    userRepository.save(user),
  );
};
