import { err, ok } from 'neverthrow';
import { LoginRequired } from '../../../../core/auth/domain/errors/login_required';
import { UserRepositoryInterface } from '../../../../core/auth/domain/ports/user_repository_interface';
import { CreateUser } from '../../../../core/auth/use_cases/create_user';
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

            const result = await new CreateUser(userRepository)
                .execute(params.login, params.password);
            expect(result).toEqual(ok({}));
        });
    });

    describe('And the new user is not valid', () => {
        test('User is not created', async () => {
            const params = {
                login: '',
                password: 'testPassword',
            };

            const result = await new CreateUser(userRepository)
                .execute(params.login, params.password);
            expect(result).toEqual(err(new LoginRequired()));
        });
    });
});
