import { CommandHandlerInterface } from '../../common/command/command_handler_interface';
import { IdGeneratorInterface } from '../../common/services/id_generator_interface';
import { List } from '../domain/list';
import { ListId } from '../domain/list_id';
import { ListLabel } from '../domain/list_label';
import { Owner } from '../domain/owner';
import { OwnerId } from '../domain/owner_id';
import { ListRepositoryInterface } from '../repositories/list_repository_interface';
import { OwnerRepositoryInterface } from '../repositories/owner_repository_interface';

import { CreateListCommandInterface } from './create_list_command_interface';

export class CreateListCommandHandler implements CommandHandlerInterface<CreateListCommandInterface, void> {
    constructor(
        private listRepository: ListRepositoryInterface,
        private ownerRepository: OwnerRepositoryInterface,
        private idGenerator: IdGeneratorInterface,
    ) {
        this.listRepository = listRepository;
        this.ownerRepository = ownerRepository;
        this.idGenerator = idGenerator;
    }

    async execute(
        payload: CreateListCommandInterface,
    ): Promise<void> {
        let owner = await this.ownerRepository.findById(payload.ownerId);

        if (!owner) {
            owner = Owner.create({}, OwnerId.create(payload.ownerId));
        }

        const listId = ListId.create(this.idGenerator.generateId());
        const listLabel = ListLabel.create({ value: payload.label });

        const list = List.create({
            label: listLabel,
            ownerId: owner.ownerId,
        }, listId);

        await this.listRepository.persist(list);
    }
}
