/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import { CreateListCommandHandler } from '../../core/components/todo/application/commands/create_list_command_handler';
import {
    CreateListCommandInterface,
} from '../../core/components/todo/application/commands/create_list_command_interface';
import { List } from '../../core/components/todo/domain/entities/list';
import { IdGeneratorInterface } from '../../core/ports/persistence/id_generator_interface';
import { ListRepositoryInterface } from '../../core/ports/persistence/list_repository_interface';
import { UuidGeneratorStub, expectedId } from '../../providers/persistence/in_memory/iuid_generator_stub';
import { ListRepository } from '../../providers/persistence/in_memory/list_repository';

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
        idGenerator = new UuidGeneratorStub();
        createList = new CreateListCommandHandler(
            listRepository,
            idGenerator,
        );
    });

    it('should create list with parameters', async () => {
        const payload: CreateListCommandInterface = {
            id: idGenerator.generateId(),
            label: 'reminder',
            tasks: [],
            userId: '0000',
        };

        await createList.execute(payload);

        const lists: List[] = await listRepository.findAll();

        expect(lists[0].toPrimitives()).toEqual({
            id: expectedId,
            label: payload.label,
            tasks: payload.tasks,
            userId: payload.userId,
        });
    });

    it('should throw validation errors', async () => {
        const payload: CreateListCommandInterface = {
            id: idGenerator.generateId(),
            label: 'il faut que je pense à mettre moins de 25 caractères',
            tasks: [],
            userId: '0000',
        };

        await expect(
            createList.execute(payload),
        ).rejects.toThrow('validation error');
    });
});
