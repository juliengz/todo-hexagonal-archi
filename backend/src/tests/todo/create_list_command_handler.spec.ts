import { CreateListCommandHandler } from '../../core/components/todo/application/commands/create_list_command_handler';
import {
    CreateListCommandInterface,
} from '../../core/components/todo/application/commands/create_list_command_interface';
import { List } from '../../core/components/todo/domain/entities/list';
import { UuidGeneratorStub, expectedId } from '../../providers/persistence/in_memory/iuid_generator_stub';
import { ListRepository } from '../../providers/persistence/in_memory/list_repository';

describe('GIVEN i want to create a new List', () => {
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

    describe('WHEN parameters are valid', () => {
        test('THEN the list should be created', async () => {
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
    });
});
