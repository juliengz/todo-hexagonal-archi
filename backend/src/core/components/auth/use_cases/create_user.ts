import { Result, ok, err } from 'neverthrow';
import { IdGeneratorInterface } from '../../../ports/persistence/id_generator';
import { UserRepositoryInterface } from '../../../ports/persistence/user_repository_interface';
import { User } from '../domain/entities/user';
import { AuthDomainErrorInterface } from '../domain/errors/auth_domain_error_interface';
import { AuthUseCaseErrorInterface } from '../errors/auth_use_case_error_interface';

export class CreateUser {
    constructor(
        private userRepository: UserRepositoryInterface,
        private idGenerator: IdGeneratorInterface,
    ) {
        this.userRepository = userRepository;
        this.idGenerator = idGenerator;
    }

    async execute(
        login: string,
        password: string,
    ): Promise<Result<User, AuthUseCaseErrorInterface|AuthDomainErrorInterface>> {
        const result = await User.create(this.idGenerator.generateId(), login, password);

        if (result.isOk()) {
            await this.userRepository.persist(result.value);

            return ok(result.value);
        }

        return err(result.error);
    }
}
