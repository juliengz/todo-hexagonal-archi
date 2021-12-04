/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import {
    RegisterUserCommandHandler,
} from '../../core/components/authentication/application/commands/register_user_command_handler';
import { HasherInterface } from '../../core/ports/hashers/hasher_interface';
import { IdGeneratorInterface } from '../../core/ports/persistence/id_generator_interface';
import { UserRepositoryInterface } from '../../core/ports/persistence/user_repository_interface';
import PasswordHasherStub from '../../providers/hashers/password_hasher_stub';
import { UuidGeneratorStub, expectedId } from '../../providers/persistence/in_memory/iuid_generator_stub';
import { UserRepository } from '../../providers/persistence/in_memory/user_repository';

describe('I want to register a new user', () => {
    let userRepository: UserRepositoryInterface;
    let idGenerator: IdGeneratorInterface;
    let registerUser: RegisterUserCommandHandler;
    let hasher: HasherInterface;

    beforeEach(() => {
        userRepository = new UserRepository();
        idGenerator = new UuidGeneratorStub();
        hasher = new PasswordHasherStub();
        registerUser = new RegisterUserCommandHandler(
            userRepository,
            idGenerator,
            hasher,
        );
    });

    it('should register user with parameters', async () => {
        const payload = {
            id: idGenerator.generateId(),
            login: 'admin',
            password: 'admin',
        };

        await registerUser.execute(payload);

        const users = await userRepository.findAll();

        expect(users[0]).toEqual({
            id: expectedId,
            login: payload.login,
            cryptedPassword: payload.password,
        });
    });
});
