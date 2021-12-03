import { List } from '../../../core/components/todo/domain/entities/list';

describe('I want to instanciate a new List class with create method', () => {
    describe('Parameters are valid', () => {
        it('should add 1 task with parameters', async () => {
            expect(
                List.create({
                    id: 'uuid-list-1',
                    label: 'Owner list',
                    tasks: [],
                    userId: 'uuid-user-1',
                }),
            ).toEqual({
                id: 'uuid-list-1',
                label: 'Owner list',
                tasks: [],
                userId: 'uuid-user-1',
            });
        });
    });

    describe('Parameters are invalid', () => {
        it('should throw "max length" error for "label" attribute', () => {
            expect(
                () => List.create({
                    id: 'uuid-list-1',
                    label: 'I have to think about writing less than 25 characters',
                    tasks: [],
                    userId: 'uuid-user-1',
                }),
            ).toThrowError('List label must be less than 25 characters');
        });

        it('should throw "required" error for "label" attribute', () => {
            expect(
                () => List.create({
                    id: 'uuid-list-1',
                    label: '',
                    tasks: [],
                    userId: 'uuid-user-1',
                }),
            ).toThrowError('List label is required');
        });
    });
});
