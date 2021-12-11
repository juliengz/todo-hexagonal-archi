import { CreateListCommandHandler } from '../../core/todo/commands/create_list_command_handler';
import {
    CreateListCommandInterface,
} from '../../core/todo/commands/create_list_command_interface';
import { UuidGeneratorStub } from '../../providers/persistence/in_memory/iuid_generator_stub';
import { ListUserRepository } from '../../providers/persistence/in_memory/list_user_repository';

describe('GIVEN i want to create a new List', () => {
    let listUserRepository: ListUserRepository;
    let idGenerator: UuidGeneratorStub;
    let createList: CreateListCommandHandler;

    beforeEach(() => {
        listUserRepository = new ListUserRepository();
        idGenerator = new UuidGeneratorStub();
        createList = new CreateListCommandHandler(
            listUserRepository,
            idGenerator,
        );
    });

    describe('WHEN parameters are valid', () => {
        test('THEN the list should be created', async () => {
            const payload: CreateListCommandInterface = {
                id: idGenerator.generateId(),
                label: 'My perfect list',
                userId: 'uuid-user-1',
            };

            await createList.execute(payload);

            const listUser = await listUserRepository.findById('uuid-user-1');

            expect(listUser?.lists.length).toEqual(1);
        });
    });
});
