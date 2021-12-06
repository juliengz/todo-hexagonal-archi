import { CommandHandlerInterface } from '../../../shared_kernel/command/command_handler_interface';
import { IdGeneratorInterface } from '../../../shared_kernel/services/id_generator_interface';
import { ListUser } from '../../domain/list_user';
import { ListUserRepositoryInterface } from '../../ports/repositories/list_user_repository_interface';
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
