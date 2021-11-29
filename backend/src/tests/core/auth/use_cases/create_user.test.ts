import { err, ok } from 'neverthrow';
import { InvalidUser } from '../../../../core/components/auth/domain/errors/invalid_user';
import { CreateUser } from '../../../../core/components/auth/use_cases/create_user';
import { IdGeneratorInterface } from '../../../../core/ports/persistence/id_generator';
import { UserRepositoryInterface } from '../../../../core/ports/persistence/user_repository_interface';
import { UuidGenerator } from '../../../../providers/persistence/in_memory/iuid_generator';
import { UserRepository } from '../../../../providers/persistence/in_memory/user_repository';

describe('I want to create a new user', () => {
    let userRepository: UserRepositoryInterface;
    let idGenerator: IdGeneratorInterface;

    beforeEach(() => {
        userRepository = new UserRepository();
        idGenerator = new UuidGenerator();
    });

    describe('And the new user is valid', () => {
        test('User is created', async () => {
            const params = {
                id: '76fa3660-7d9a-4013-9f47-82ec2b8b1af1',
                login: 'testUser',
                password: 'testPassword',
            };

            const expectedUser = {
                id: '76fa3660-7d9a-4013-9f47-82ec2b8b1af1',
                login: 'testUser',
            };

            const result = await new CreateUser(userRepository, idGenerator)
                .execute(params.login, params.password);
            expect(result).toEqual(ok(expectedUser));
        });
    });

    describe('And the new user have empty login', () => {
        test('User is not created, errors are returned', async () => {
            const params = {
                id: '76fa3660-7d9a-4013-9f47-82ec2b8b1af1',
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
                id: '76fa3660-7d9a-4013-9f47-82ec2b8b1af1',
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
                id: '76fa3660-7d9a-4013-9f47-82ec2b8b1af1',
                login: '',
                password: '',
            };

            const result = await new CreateUser(userRepository, idGenerator)
                .execute(params.login, params.password);
            expect(result).toEqual(err(new InvalidUser({ login: ['required'], password: ['required'] })));
        });
    });
});
