/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import { err, ok } from 'neverthrow';
import { List } from '../../../../core/components/todo/domain/entities/list';
import { Failure } from '../../../../core/components/todo/errors/failure';
import { CreateList } from '../../../../core/components/todo/use_cases/create_list';
import { IdGeneratorInterface } from '../../../../core/ports/persistence/id_generator';
import { ListRepositoryInterface } from '../../../../core/ports/persistence/list_repository_interface';
import { ListRepository } from '../../../../providers/persistence/in_memory/list_repository';
import { inMemoryUserData } from '../../../../providers/persistence/in_memory/user_repository';

class StubIdGenerator implements IdGeneratorInterface {
    generateId(): string {
        return '76fa3660-7d9a-4013-9f47-82ec2b8b1af1';
    }
}

class StubListRepository implements ListRepositoryInterface {
    persist(list: List): Promise<void> {
        throw new Error('test error');
    }
}

describe('I want to create a new List', () => {
    let listRepository: ListRepositoryInterface;
    let stubListRepository: ListRepositoryInterface;
    let idGenerator: IdGeneratorInterface;

    beforeEach(() => {
        listRepository = new ListRepository();
        stubListRepository = new StubListRepository();
        idGenerator = new StubIdGenerator();
    });

    describe('And the new List is valid', () => {
        test('List is created', async () => {
            const params = {
                title: 'testList',
                user: inMemoryUserData[0],
            };

            const expectedList = new List('76fa3660-7d9a-4013-9f47-82ec2b8b1af1', 'testList', inMemoryUserData[0]);

            const result = await new CreateList(listRepository, idGenerator).execute(params);
            expect(result).toEqual(ok(expectedList));
        });
    });

    describe('And an error has been throw', () => {
        test('List is not created', async () => {
            const params = {
                title: 'testList',
                user: inMemoryUserData[0],
            };

            const result = await new CreateList(stubListRepository, idGenerator).execute(params);
            expect(result).toEqual(err(new Failure()));
        });
    });
});
