import { CommandHandlerInterface } from '../../../shared_kernel/command/command_handler_interface';
import { IdGeneratorInterface } from '../../../shared_kernel/services/id_generator_interface';
import { ListUser } from '../../domain/entities/list_user';
import { ListLabel } from '../../domain/value_objects/list_label';
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
        const label = ListLabel.create({ value: payload.label });

        let listUser = await this.listUserRepository.findById(payload.userId);

        if (!listUser) {
            listUser = new ListUser(payload.userId, []);
        }

        if (label.isOk()) {
            listUser.addList(
                this.idGenerator.generateId(),
                label.value,
            );
        }

        await this.listUserRepository.persist(listUser);
    }
}
