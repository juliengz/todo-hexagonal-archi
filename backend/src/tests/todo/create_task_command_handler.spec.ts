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
import { UuidGeneratorStub, expectedId } from '../../providers/persistence/in_memory/iuid_generator_stub';
import { ListRepository } from '../../providers/persistence/in_memory/list_repository';

describe('I want to add a new Task to a List', () => {
    let listRepository: ListRepository;
    let idGenerator: UuidGeneratorStub;
    let createTask: CreateTaskCommandHandler;

    beforeEach(async () => {
        listRepository = new ListRepository();
        idGenerator = new UuidGeneratorStub();
        createTask = new CreateTaskCommandHandler(
            listRepository,
            idGenerator,
        );
    });
    describe('And the provided parameters are valid', () => {
        it('should add 1 task with parameters', async () => {
            const list = new List(
                'uuid-list-1',
                'Fake name',
                [],
                'uuid-user-1',
            );

            listRepository.import([list]);

            const payload: CreateTaskCommandInterface = {
                id: idGenerator.generateId(),
                listId: list.id,
                label: 'My first task label',
                description: 'My first task description',
                deadline: new Date(),
            };

            await createTask.execute(payload);

            expect(list.tasks.length).toEqual(1);
            expect(list.tasks[0].label).toEqual('My first task label');
        });
    });

    describe('And the provided task owner list does not exist', () => {
        it('should throw "list not found" error', async () => {
            const payload: CreateTaskCommandInterface = {
                id: idGenerator.generateId(),
                listId: 'uuid-not-found',
                label: 'My first task label',
                description: 'My first task description',
                deadline: new Date(),
            };

            await expect(
                createTask.execute(payload),
            ).rejects.toThrow(ListNotFoundError);
        });
    });
});
