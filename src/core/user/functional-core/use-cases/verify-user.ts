import { Result } from 'neverthrow';
import { UnverifiedUser, VerifiedUser, verifyUser } from '../domain/user';

export const verifyUserUseCase = (
  user: UnverifiedUser,
  name: string,
): Result<VerifiedUser, Error> => verifyUser(user, name);
