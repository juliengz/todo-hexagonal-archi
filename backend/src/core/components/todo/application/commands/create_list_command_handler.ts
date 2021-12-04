import { IdGeneratorInterface } from '../../../../ports/persistence/id_generator_interface';
import { ListUserRepositoryInterface } from '../../../../ports/persistence/list_user_repository_interface';
import { CommandHandlerInterface } from '../../../../shared_kernel/command/command_handler_interface';
import { ListUser } from '../../domain/entities/list_user';
import { CreateListCommandInterface } from './create_list_command_interface';

export class CreateListCommandHandler implements CommandHandlerInterface<CreateListCommandInterface, void> {
    constructor(
        private listUserRepository: ListUserRepositoryInterface,
        private idGenerator: IdGeneratorInterface,
    ) {
        this.listUserRepository = listUserRepository;
        this.idGenerator = idGenerator;
    }

    async execute(
        payload: CreateListCommandInterface,
    ): Promise<void> {
        // validation

        let listUser = await this.listUserRepository.findById(payload.userId);

        if (!listUser) {
            listUser = new ListUser(payload.userId, []);
        }

        listUser.addList(
            this.idGenerator.generateId(),
            payload.label,
        );

        await this.listUserRepository.persist(listUser);
    }
}
