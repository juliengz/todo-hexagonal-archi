import { CommandHandlerInterface } from '../../../common/command/command_handler_interface';
import { IdGeneratorInterface } from '../../../common/services/id_generator_interface';
import { ListLabel } from '../../domain/list_label';
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
        const label = ListLabel.create({ value: payload.label });

        let listUser = await this.listUserRepository.findById(payload.userId);

        if (!listUser) {
            listUser = new ListUser(payload.userId, []);
        }

        listUser.addList(
            this.idGenerator.generateId(),
            label.value,
        );

        await this.listUserRepository.persist(listUser);
    }
}
