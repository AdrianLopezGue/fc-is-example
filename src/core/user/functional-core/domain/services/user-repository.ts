import { ResultAsync } from 'neverthrow';
import { UnverifiedUser, User } from '../user';
import { Email } from '../email';

export interface UserRepository {
  findUnverifiedByEmail(_email: Email): ResultAsync<UnverifiedUser, Error>;
  save<T extends User>(_user: T): ResultAsync<T, Error>;
}
