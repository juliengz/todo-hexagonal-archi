import { CommandHandlerInterface } from '../../../common/command/command_handler_interface';
import { IdGeneratorInterface } from '../../../common/services/id_generator_interface';
import { User } from '../../domain/entities/user';
import { HasherInterface } from '../../ports/hashers/hasher_interface';
import { UserRepositoryInterface } from '../../ports/persistence/user_repository_interface';

import { RegisterUserCommandInterface } from './register_list_command_interface';

export class RegisterUserCommandHandler implements CommandHandlerInterface<RegisterUserCommandInterface, void> {
    constructor(
        private useRepository: UserRepositoryInterface,
        private idGenerator: IdGeneratorInterface,
        private hasher: HasherInterface,
    ) {
        this.useRepository = useRepository;
        this.idGenerator = idGenerator;
        this.hasher = hasher;
    }

    async execute(
        payload: RegisterUserCommandInterface,
    ): Promise<void> {
        const user = User.create({
            id: this.idGenerator.generateId(),
            login: payload.login,
            cryptedPassword: this.hasher.hash(payload.password),
        });

        await this.useRepository.persist(user);
    }
}
