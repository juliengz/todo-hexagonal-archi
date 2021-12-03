/* eslint-disable prefer-destructuring */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import { CreateListCommandHandler } from '../../core/components/todo/application/commands/create_list_command_handler';
import { CreateListCommandInterface } from '../../core/components/todo/application/commands/create_list_command_interface';
import { CreateTaskCommandHandler } from '../../core/components/todo/application/commands/create_task_command_handler';
import {
    CreateTaskCommandInterface,
} from '../../core/components/todo/application/commands/create_task_command_interface';
import { List } from '../../core/components/todo/domain/entities/list';
import { ListNotFoundError } from '../../core/components/todo/domain/errors/list_not_found_error';
import { UuidGeneratorStub, expectedId } from '../../providers/persistence/in_memory/iuid_generator_stub';
import { ListRepository } from '../../providers/persistence/in_memory/list_repository';

describe('I want to add a new Task to List', () => {
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
            label: 'My first task',
            deadline: new Date(),
        };

        await createTask.execute(payload);

        expect(list.tasks.length).toEqual(1);
        expect(list.tasks[0].label).toEqual('My first task');
    });

    it('should throw "list not found" error', async () => {
        const payload: CreateTaskCommandInterface = {
            id: idGenerator.generateId(),
            listId: 'not-existing-list',
            label: 'my first task',
            deadline: new Date(),
        };

        await expect(
            createTask.execute(payload),
        ).rejects.toThrow(ListNotFoundError);
    });
});
