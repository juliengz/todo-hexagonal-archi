/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import { CreateListCommandHandler } from '../../core/todo/application/commands/create_list_command_handler';
import { ListRepositoryInterface } from '../../core/todo/application/ports/repositories/list_repository_interface';
import { ListRepository } from '../../providers/persistence/in_memory/list_repository';
import { IdGeneratorInterface } from '../../shared/id_generator';

class StubIdGenerator implements IdGeneratorInterface {
    generateId(): string {
        return '76fa3660-7d9a-4013-9f47-82ec2b8b1af1';
    }
}

describe('I want to create a new List', () => {
    let listRepository: ListRepositoryInterface;
    let idGenerator: IdGeneratorInterface;
    let createList: CreateListCommandHandler;

    beforeEach(() => {
        listRepository = new ListRepository();
        idGenerator = new StubIdGenerator();
        createList = new CreateListCommandHandler(
            listRepository,
            idGenerator,
        );
    });

    it('should create list with parameters', async () => {
        await createList.execute({
            id: idGenerator.generateId(),
            label: 'reminder',
            tasks: [],
        });

        const lists = await listRepository.findAll();

        expect(lists[0].toPrimitives()).toEqual({
            id: '76fa3660-7d9a-4013-9f47-82ec2b8b1af1',
            label: 'reminder',
            tasks: [],
        });
    });

    it('should throw validation errors', async () => {
        await expect(
            createList.execute({
                id: idGenerator.generateId(),
                label: 'il faut que je pense à mettre moins de 25 caractères',
                tasks: [],
            }),
        ).rejects.toThrow('validation error');
    });
});
