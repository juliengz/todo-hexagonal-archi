/* eslint-disable prefer-destructuring */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import { CreateTaskCommandHandler } from '../../core/components/todo/application/commands/create_task_command_handler';
import {
    CreateTaskCommandInterface,
} from '../../core/components/todo/application/commands/create_task_command_interface';
import { ListNotFoundError } from '../../core/components/todo/application/errors/list_not_found_error';
import { List } from '../../core/components/todo/domain/entities/list';
import { expectedId, UuidGeneratorStub } from '../../providers/persistence/in_memory/iuid_generator_stub';
import { ListRepository } from '../../providers/persistence/in_memory/list_repository';

describe('GIVEN i want to add a new Task to a given List', () => {
    let listRepository: ListRepository;
    let idGenerator: UuidGeneratorStub;
    let createTask: CreateTaskCommandHandler;

    const taskOwnerList: List = List.create({
        id: 'uuid-list-1',
        label: 'Owner list',
        tasks: [],
        listUserId: 'uuid-user-1',
    });

    beforeEach(async () => {
        listRepository = new ListRepository();
        idGenerator = new UuidGeneratorStub();
        createTask = new CreateTaskCommandHandler(
            listRepository,
            idGenerator,
        );
    });
    describe('WHEN parameters are valid', () => {
        test('THEN it adds Task to the given List', async () => {
            listRepository.import([taskOwnerList]);

            const payload: CreateTaskCommandInterface = {
                id: idGenerator.generateId(),
                listId: taskOwnerList.id,
                label: 'My first task label',
                description: 'My first task description',
                deadline: new Date(),
            };

            const expectedTask = {
                id: expectedId,
                listId: payload.listId,
                label: payload.label,
                finished: false,
                description: payload.description,
                deadline: payload.deadline,
            };

            await createTask.execute(payload);

            expect(taskOwnerList.tasks.length).toEqual(1);
            expect(taskOwnerList.tasks[0]).toEqual(expectedTask);
        });
    });

    describe('WHEN the provided task list owner does not exist', () => {
        it('THEN it throws "list not found" error', async () => {
            const payload: CreateTaskCommandInterface = {
                id: idGenerator.generateId(),
                listId: 'uuid-not-found',
                label: 'My first task label',
                description: 'My first task description',
                deadline: new Date(),
            };

            await expect(
                createTask.execute(payload),
            ).rejects.toThrowError('List not found');
        });
    });
});
