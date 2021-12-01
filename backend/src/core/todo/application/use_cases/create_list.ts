import { err, ok, Result } from 'neverthrow';
import { IdGeneratorInterface } from '../../../../shared/id_generator';
import { List, ListCreationPropsInterface } from '../../domain/entities/list';
import { InvalidList } from '../../domain/errors/invalid_list';
import { TodoUseCaseErrorInterface } from '../errors/todo_use_case_error_interface';
import { ListRepositoryInterface } from '../ports/repositories/list_repository_interface';
import { CreateListValidator } from '../validation/create_list_validator';

export class CreateList {
    constructor(
        private listRepository: ListRepositoryInterface,
        private idGenerator: IdGeneratorInterface,
    ) {
        this.listRepository = listRepository;
        this.idGenerator = idGenerator;
    }

    async execute(
        payload: ListCreationPropsInterface,
    ): Promise<void> {
        const validator = new CreateListValidator();
        validator.validate(payload);

        if (validator.getErrors()) throw new Error('validation error');

        const list = List.create({
            id: this.idGenerator.generateId(),
            label: payload.label,
        });

        await this.listRepository.persist(list);
    }
}
