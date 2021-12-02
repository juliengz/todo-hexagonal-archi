import { CommandHandlerInterface } from '../../../../shared_kernel/command_handler_interface';
import { IdGeneratorInterface } from '../../../../shared_kernel/id_generator';
import { List } from '../../domain/entities/list';
import { ListRepositoryInterface } from '../ports/repositories/list_repository_interface';
import { CreateListValidator } from '../validation/create_list_validator';
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
        const validator = new CreateListValidator();
        validator.validate(payload);

        if (validator.getErrors()) throw new Error('validation error');

        const list = List.create({
            id: this.idGenerator.generateId(),
            label: payload.label,
            tasks: [],
        });

        await this.listRepository.persist(list);
    }
}
