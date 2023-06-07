import { Result, err, ok } from 'neverthrow';
import { Age, makeAge } from './age';
import { Name } from './name';
import { Email } from './email';

export type UnverifiedUser = {
  email: Email;
  age: Age;
  isDeleted: boolean;
};

export type VerifiedUser = {
  email: Email;
  name: Name;
  age: Age;
  isDeleted: boolean;
};

export type User = UnverifiedUser | VerifiedUser;

export const createUnverifiedUser = (user: {
  email: string;
  name: string | undefined;
  age: number;
}): Result<UnverifiedUser, Error> => {
  return makeAge(user.age).map(age => ({
    email: user.email,
    name: user.name,
    age: age,
    isDeleted: false,
  }));
};

export const verifyUser = (
  user: UnverifiedUser,
  name: string,
): Result<VerifiedUser, Error> =>
  user.isDeleted
    ? err(new Error('Deleted user cannot be verified'))
    : ok({
        ...user,
        name,
      });
