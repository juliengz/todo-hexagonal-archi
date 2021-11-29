/* eslint-disable class-methods-use-this */
import { err } from 'neverthrow';
import { InvalidUser } from '../../../../core/components/auth/domain/errors/invalid_user';
import { CreateUser } from '../../../../core/components/auth/use_cases/create_user';
import { IdGeneratorInterface } from '../../../../core/ports/persistence/id_generator';
import { UserRepositoryInterface } from '../../../../core/ports/persistence/user_repository_interface';
import { UserRepository } from '../../../../providers/persistence/in_memory/user_repository';

class StubIdGenerator implements IdGeneratorInterface {
    generateId(): string {
        return '76fa3660-7d9a-4013-9f47-82ec2b8b1af1';
    }
}

describe('I want to create a new user', () => {
    let userRepository: UserRepositoryInterface;
    let idGenerator: IdGeneratorInterface;

    beforeEach(() => {
        userRepository = new UserRepository();
        idGenerator = new StubIdGenerator();
    });

    describe('And the new user is valid', () => {
        test('User is created', async () => {
            const params = {
                login: 'testUser',
                password: 'testPassword',
            };

            const result = await new CreateUser(userRepository, idGenerator)
                .execute(params.login, params.password);
            expect(true).toEqual(result.isOk());
        });
    });

    describe('And the new user have empty login', () => {
        test('User is not created, errors are returned', async () => {
            const params = {
                login: '',
                password: 'testPassword',
            };

            const result = await new CreateUser(userRepository, idGenerator)
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

            const result = await new CreateUser(userRepository, idGenerator)
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

            const result = await new CreateUser(userRepository, idGenerator)
                .execute(params.login, params.password);
            expect(result).toEqual(err(new InvalidUser({ login: ['required'], password: ['required'] })));
        });
    });
});
