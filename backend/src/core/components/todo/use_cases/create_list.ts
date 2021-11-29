import { Result, ok, err } from 'neverthrow';
import { IdGeneratorInterface } from '../../../ports/persistence/id_generator';
import { ListRepositoryInterface } from '../../../ports/persistence/list_repository_interface';
import { User } from '../../auth/domain/entities/user';
import { List } from '../domain/entities/list';
import { TodoDomainErrorInterface } from '../domain/errors/todo_domain_error_interface';
import { Failure } from '../errors/failure';
import { TodoUseCaseErrorInterface } from '../errors/todo_use_case_error_interface';

type ListParams = {
    title: string;
    user: User;
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
        listParams: ListParams,
    ): Promise<Result<List, TodoDomainErrorInterface|TodoUseCaseErrorInterface>> {
        const newList = new List(this.idGenerator.generateId(), listParams.title, listParams.user);

        try {
            await this.listRepository.persist(newList);

            return ok(newList);
        } catch (error) {
            // console.log(error);

            return err(new Failure());
        }
    }
}
