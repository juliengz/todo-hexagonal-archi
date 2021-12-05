import { CommandHandlerInterface } from '../../../shared_kernel/command/command_handler_interface';
import { IdGeneratorInterface } from '../../../shared_kernel/services/id_generator_interface';
import { ListRepositoryInterface } from '../../ports/repositories/list_repository_interface';
import { ListNotFoundError } from '../errors/list_not_found_error';
import { CreateTaskCommandInterface } from './create_task_command_interface';

export class CreateTaskCommandHandler implements CommandHandlerInterface<CreateTaskCommandInterface, void> {
    constructor(
        private listRepository: ListRepositoryInterface,
        private idGenerator: IdGeneratorInterface,
    ) {
        this.listRepository = listRepository;
        this.idGenerator = idGenerator;
    }

    async execute(
        payload: CreateTaskCommandInterface,
    ): Promise<void> {
        // validate payload and test it

        const list = await this.listRepository.findById(payload.listId);

        if (!list) throw new ListNotFoundError();

        list.addTask(
            this.idGenerator.generateId(),
            payload.label,
            payload.description,
            payload.deadline,
        );

        await this.listRepository.persist(list);
    }
}
