/* eslint-disable neverthrow/must-use-result */
import { InMemoryUserRepository } from '../../../../../src/core/user/imperative-shell/infrastructure/inmemory-user-repository';
import { createUnverifiedUserProvider } from '../../../../../src/core/user/imperative-shell/providers/create-unverified-user.provider';

describe('Create unverified user provider', () => {
  it('should create unverified user', async () => {
    // Arrange
    const email = 'user@user.com';
    const repository = new InMemoryUserRepository([]);

    // Act
    const result = await createUnverifiedUserProvider(repository, email, 'User name', 1);

    // Assert
    expect(result.isOk()).toBe(true);

    const userFound = await repository.findUnverifiedByEmail(email);
    expect(userFound).not.toBeUndefined();
  });
});
