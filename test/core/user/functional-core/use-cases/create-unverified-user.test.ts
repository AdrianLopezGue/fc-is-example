/* eslint-disable neverthrow/must-use-result */
import { createUnverifiedUseCase } from '../../../../../src/core/user/functional-core/use-cases/create-unverified-user';

describe('Create unverified user use case', () => {
  it('should return an unverified user', () => {
    // Arrange
    // Act
    const unverifiedUser = createUnverifiedUseCase('user@user.com', 'New name', 18);

    // Assert
    expect(unverifiedUser.isOk()).toBe(true);
  });

  it('should return error if age is negative', () => {
    // Arrange
    // Act
    const unverifiedUser = createUnverifiedUseCase('user@user.com', 'New name', -1);

    // Assert
    expect(unverifiedUser.isErr()).toBe(true);
  });
});
