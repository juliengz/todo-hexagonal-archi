/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import { CreateListCommandHandler } from '../../core/components/todo/application/commands/create_list_command_handler';
import {
    CreateListCommandInterface,
} from '../../core/components/todo/application/commands/create_list_command_interface';
import { List } from '../../core/components/todo/domain/entities/list';
import { MaxLengthError } from '../../core/components/todo/domain/errors/max_length_error';
import { RequiredError } from '../../core/components/todo/domain/errors/required_error';
import { UuidGeneratorStub, expectedId } from '../../providers/persistence/in_memory/iuid_generator_stub';
import { ListRepository } from '../../providers/persistence/in_memory/list_repository';

describe('I want to create a new List', () => {
    let listRepository: ListRepository;
    let idGenerator: UuidGeneratorStub;
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
            label: 'My perfect list',
            tasks: [],
            userId: 'uuid-user-1',
        };

        await createList.execute(payload);

        const lists: List[] = await listRepository.findAll();

        expect(lists[0]).toEqual({
            id: expectedId,
            label: payload.label,
            tasks: payload.tasks,
            userId: payload.userId,
        });
    });

    it('should throw "max length" error', async () => {
        const payload: CreateListCommandInterface = {
            id: idGenerator.generateId(),
            label: 'I have to think about writing less than 25 characters',
            tasks: [],
            userId: 'uuid-user-1',
        };

        await expect(
            createList.execute(payload),
        ).rejects.toThrowError(MaxLengthError);

        await expect(
            createList.execute(payload),
        ).rejects.toThrowError('List label must be less than 25 characters');
    });

    it('should throw "required" error', async () => {
        const payload: CreateListCommandInterface = {
            id: idGenerator.generateId(),
            label: '',
            tasks: [],
            userId: 'uuid-user-1',
        };

        await expect(
            createList.execute(payload),
        ).rejects.toThrowError(RequiredError);

        await expect(
            createList.execute(payload),
        ).rejects.toThrowError('List label is required');
    });
});
