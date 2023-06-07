import { ResultAsync, errAsync, okAsync } from 'neverthrow';
import { UserRepository } from '../../functional-core/domain/services/user-repository';
import { UnverifiedUser, User } from '../../functional-core/domain/user';
import { Email } from '../../functional-core/domain/email';

export class InMemoryUserRepository implements UserRepository {
  private users: User[];

  public constructor(users?: User[]) {
    this.users = users || [];
  }

  public findUnverifiedByEmail(email: Email): ResultAsync<UnverifiedUser, Error> {
    const user = this.users.find(u => u.email === email);

    if (!user) {
      return errAsync(new Error(`User with email ${email} not found`));
    }

    return okAsync(user);
  }

  public save<UserType extends User>(user: UserType): ResultAsync<UserType, Error> {
    const existingUserIndex = this.users.findIndex(u => u.email === user.email);

    if (existingUserIndex === -1) {
      this.users.push(user);
      return okAsync(user);
    }

    this.users[existingUserIndex] = user;
    return okAsync(user);
  }
}
