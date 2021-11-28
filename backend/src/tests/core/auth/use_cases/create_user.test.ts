import { err, ok } from 'neverthrow';
import { InvalidUser } from '../../../../core/components/auth/domain/errors/invalid_user';
import { CreateUser } from '../../../../core/components/auth/use_cases/create_user';
import { UserRepositoryInterface } from '../../../../core/ports/persistence/user_repository_interface';
import { UserRepository } from '../../../../providers/persistence/in_memory/user_repository';

describe('I want to create a new user', () => {
    let userRepository: UserRepositoryInterface;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    describe('And the new user is valid', () => {
        test('User is created', async () => {
            const params = {
                login: 'testUser',
                password: 'testPassword',
            };

            const expectedUser = {
                login: 'testUser',
            };

            const result = await new CreateUser(userRepository)
                .execute(params.login, params.password);
            expect(result).toEqual(ok(expectedUser));
        });
    });

    describe('And the new user have empty login', () => {
        test('User is not created, errors are returned', async () => {
            const params = {
                login: '',
                password: 'testPassword',
            };

            const result = await new CreateUser(userRepository)
                .execute(params.login, params.password);
            expect(result).toEqual(err(new InvalidUser({ login: ['required'] })));
        });
    });

    describe('And the new user have empty password', () => {
        test('User is not created, errors are returned', async () => {
            const params = {
                login: 'testUser',
                password: '',
            };

            const result = await new CreateUser(userRepository)
                .execute(params.login, params.password);
            expect(result).toEqual(err(new InvalidUser({ password: ['required'] })));
        });
    });

    describe('And the new user have empty login and password', () => {
        test('User is not created, errors are returned', async () => {
            const params = {
                login: '',
                password: '',
            };

            const result = await new CreateUser(userRepository)
                .execute(params.login, params.password);
            expect(result).toEqual(err(new InvalidUser({ login: ['required'], password: ['required'] })));
        });
    });
});
