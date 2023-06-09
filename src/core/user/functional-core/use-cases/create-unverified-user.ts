import { Result } from 'neverthrow';
import { UnverifiedUser, createUnverifiedUser } from '../domain/user';

export const createUnverifiedUseCase = (
  email: string,
  age: number,
): Result<UnverifiedUser, Error> => createUnverifiedUser({ email, age });
