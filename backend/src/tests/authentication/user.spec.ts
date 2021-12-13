import { UserPropsInterface } from '../../core/authentication/domain/user';

describe('GIVEN I want to create a new User with User create method', () => {
    const validParameters: UserPropsInterface = {
        id: 'uuid-user-1',
        login: 'admin',
        cryptedPassword: 'hash-password',
    };

    describe('WHEN parameters are valid', () => {
        test('THEN it creates the User', async () => {
            expect(
                User.create(validParameters),
            ).toEqual({
                id: validParameters.id,
                login: validParameters.login,
                cryptedPassword: validParameters.cryptedPassword,
            });
        });
    });

    describe('WHEN parameters are invalid', () => {
        test('THEN it throws "max length" error if login is too long', () => {
            const invalidParameters = {
                ...validParameters,
                ...{ login: 'x'.repeat(21) },
            };

            expect(
                () => User.create(invalidParameters),
            ).toThrowError('User login must be less than 20 characters');
        });

        test('THEN it throws "min length" error if login is too short', () => {
            const invalidParameters = {
                ...validParameters,
                ...{ login: 'ko' },
            };

            expect(
                () => User.create(invalidParameters),
            ).toThrowError('User login must have more than 4 characters');
        });

        test('THEN it throws "required" error if login empty', () => {
            const invalidParameters = {
                ...validParameters,
                ...{ login: '' },
            };

            expect(
                () => User.create(invalidParameters),
            ).toThrowError('User login is required');
        });
    });
});
