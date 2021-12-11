import { CommandHandlerInterface } from '../../common/command/command_handler_interface';
import { Identifier } from '../../common/domain/indentifier';
import { IdGeneratorInterface } from '../../common/services/id_generator_interface';
import { List } from '../domain/list';
import { ListLabel } from '../domain/list_label';
import { ListUser } from '../domain/list_user';
import { ListUserRepositoryInterface } from '../repositories/list_user_repository_interface';
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
        let listUser = await this.listUserRepository.findById(payload.userId);

        if (!listUser) {
            listUser = new ListUser(payload.userId, []);
        }

        const listId = new Identifier(this.idGenerator.generateId());
        const listLabel = ListLabel.create({ value: payload.label });

        List.create({
            id: listId,
            label: listLabel,
            tasks: [],
            listUserId: listUser.id,
        });

        await this.listUserRepository.persist(listUser);
    }
}
