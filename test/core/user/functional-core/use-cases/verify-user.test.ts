import { UnverifiedUser } from '../../../../../src/core/user/functional-core/domain/user';
import { verifyUserUseCase } from '../../../../../src/core/user/functional-core/use-cases/verify-user';

describe('Verify user use case', () => {
  it('should return a verified user', () => {
    // Arrange
    const unverifiedUser: UnverifiedUser = {
      email: 'user@user.com',
      age: 1,
      isDeleted: false,
    };

    // Act
    const verifiedUser = verifyUserUseCase(unverifiedUser, 'New name');

    // Assert
    expect(verifiedUser.isOk()).toBe(true);
  });

  it('should throw error if user is deleted', () => {
    // Arrange
    const unverifiedUser: UnverifiedUser = {
      email: 'user@user.com',
      age: 1,
      isDeleted: true,
    };

    // Act
    const verifiedUser = verifyUserUseCase(unverifiedUser, 'New name');

    // Assert
    expect(verifiedUser.isErr()).toBe(true);
  });
});
