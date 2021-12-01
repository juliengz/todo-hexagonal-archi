import { IdGeneratorInterface } from '../../../../shared/id_generator';
import { List } from '../../domain/entities/list';
import { ListRepositoryInterface } from '../ports/repositories/list_repository_interface';

type ListParams = {
    id: string;
    label: string;
}

export class CreateList {
    constructor(
        private listRepository: ListRepositoryInterface,
        private idGenerator: IdGeneratorInterface,
    ) {
        this.listRepository = listRepository;
        this.idGenerator = idGenerator;
    }

    async execute(
        payload: ListParams,
    ): Promise<void> {
        const list = List.create({
            id: this.idGenerator.generateId(),
            label: payload.label,
        });

        await this.listRepository.persist(list);
    }
}
