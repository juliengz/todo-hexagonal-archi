import { Result, ok, err } from 'neverthrow';
import { UserRepositoryInterface } from '../../../ports/persistence/user_repository_interface';
import { User } from '../domain/entities/user';
import { UserDtoInterface } from '../domain/entities/user_dto_interface';
import { AuthDomainErrorInterface } from '../domain/errors/auth_domain_error_interface';
import { AuthUseCaseErrorInterface } from '../errors/auth_use_case_error_interface';

export class CreateUser {
    constructor(private readonly userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async execute(
        login: string,
        password: string,
    ): Promise<Result<UserDtoInterface, AuthUseCaseErrorInterface|AuthDomainErrorInterface>> {
        const result = await User.create(login, password);

        if (result.isOk()) {
            await this.userRepository.persist(result.value);

            return ok(result.value.toDto());
        }

        return err(result.error);
    }
}
