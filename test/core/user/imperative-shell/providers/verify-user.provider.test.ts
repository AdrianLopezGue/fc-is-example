import { InMemoryUserRepository } from '../../../../../src/core/user/imperative-shell/infrastructure/inmemory-user-repository';
import { verifyUserProvider } from '../../../../../src/core/user/imperative-shell/providers/verify-user.provider';

describe('Verify user provider', () => {
  it('should verify unverified user', async () => {
    // Arrange
    const unverifiedUser = {
      email: 'user@user.com',
      age: 1,
      isDeleted: false,
    };
    const repository = new InMemoryUserRepository([unverifiedUser]);

    // Act
    const result = await verifyUserProvider(repository, unverifiedUser.email, 'New name');

    // Assert
    expect(result.isOk()).toBe(true);
  });

  it('should return error if user is not found', async () => {
    // Arrange
    const repository = new InMemoryUserRepository();

    // Act
    const result = await verifyUserProvider(repository, 'random@user.com', 'New name');

    // Assert
    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr()).toBeInstanceOf(Error);
  });
});
