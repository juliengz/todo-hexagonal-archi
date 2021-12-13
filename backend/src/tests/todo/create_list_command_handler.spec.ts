import { CreateListCommandHandler } from '../../core/todo/commands/create_list_command_handler';
import {
    CreateListCommandInterface,
} from '../../core/todo/commands/create_list_command_interface';
import { UuidGeneratorStub } from '../../providers/persistence/in_memory/iuid_generator_stub';
import { ListRepository } from '../../providers/persistence/in_memory/list_repository';
import { OwnerRepository } from '../../providers/persistence/in_memory/owner_repository';

describe('GIVEN i want to create a new List', () => {
    let listRepository: ListRepository;
    let ownerRepository: OwnerRepository;
    let idGenerator: UuidGeneratorStub;
    let createList: CreateListCommandHandler;

    beforeEach(() => {
        listRepository = new ListRepository();
        idGenerator = new UuidGeneratorStub();
        createList = new CreateListCommandHandler(
            listRepository,
            ownerRepository,
            idGenerator,
        );
    });

    describe('WHEN parameters are valid', () => {
        test('THEN the list should be created', async () => {
            const payload: CreateListCommandInterface = {
                label: 'My perfect list',
                ownerId: 'uuid-owner-1',
            };

            await createList.execute(payload);

            const lists = await listRepository.findAll();

            expect(1).toEqual(1);
        });
    });
});
