import { IdGeneratorInterface } from '../../../../ports/persistence/id_generator_interface';
import { ListRepositoryInterface } from '../../../../ports/persistence/list_repository_interface';
import { CommandHandlerInterface } from '../../../../shared_kernel/command/command_handler_interface';
import { List } from '../../domain/entities/list';
import { CreateListCommandInterface } from './create_list_command_interface';

export class CreateListCommandHandler implements CommandHandlerInterface<CreateListCommandInterface, void> {
    constructor(
        private listRepository: ListRepositoryInterface,
        private idGenerator: IdGeneratorInterface,
    ) {
        this.listRepository = listRepository;
        this.idGenerator = idGenerator;
    }

    async execute(
        payload: CreateListCommandInterface,
    ): Promise<void> {
        const list = List.create({
            id: this.idGenerator.generateId(),
            label: payload.label,
            tasks: payload.tasks,
            userId: payload.userId,
        });

        await this.listRepository.persist(list);
    }
}
