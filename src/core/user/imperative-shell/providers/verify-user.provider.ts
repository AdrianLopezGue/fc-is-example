import { ResultAsync } from 'neverthrow';
import { Email } from '../../functional-core/domain/email';
import { Name } from '../../functional-core/domain/name';
import { UserRepository } from '../../functional-core/domain/services/user-repository';
import { VerifiedUser } from '../../functional-core/domain/user';
import { verifyUserUseCase } from '../../functional-core/use-cases/verify-user';

export const verifyUserProvider = async (
  userRepository: UserRepository,
  email: Email,
  name: Name,
): Promise<ResultAsync<VerifiedUser, Error>> => {
  const unverifiedUser = await userRepository.findUnverifiedByEmail(email);

  return unverifiedUser
    .andThen(user => verifyUserUseCase(user, name))
    .asyncAndThen(user => userRepository.save(user));
};
