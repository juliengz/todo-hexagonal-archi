import { Task, TaskPropsInterface } from '../../../core/components/todo/domain/entities/task';

describe('GIVEN I want to create a new Task with List create method', () => {
    const validParameters: TaskPropsInterface = {
        id: 'uuid-task-1',
        listId: 'uuid-list-1',
        label: 'My first task',
        description: 'My first task description',
        finished: false,
        deadline: new Date(),
    };

    describe('WHEN parameters are valid', () => {
        test('then it adds 1 task to task List owner', async () => {
            expect(
                Task.create(validParameters),
            ).toEqual({
                id: validParameters.id,
                listId: validParameters.listId,
                label: validParameters.label,
                description: validParameters.description,
                finished: validParameters.finished,
                deadline: validParameters.deadline,
            });
        });
    });

    describe('WHEN parameters are invalid', () => {
        test('THEN it throws "max length" error if "label" is too long', () => {
            const invalidParameters = {
                ...validParameters,
                ...{ label: 'I have to think about writing less than 25 characters' },
            };

            expect(
                () => Task.create(invalidParameters),
            ).toThrowError('Task label must be less than 25 characters');
        });

        test('THEN it throws "required" error if "label" is empty', () => {
            const invalidParameters = {
                ...validParameters,
                ...{ label: '' },
            };

            expect(
                () => Task.create(invalidParameters),
            ).toThrowError('Task label is required');
        });

        test('THEN it throws "max length" error if "description" is too long', () => {
            const invalidParameters = {
                ...validParameters,
                ...{ description: 'x'.repeat(151) },
            };

            expect(
                () => Task.create(invalidParameters),
            ).toThrowError('Task description must be less than 150 characters');
        });

        test('THEN it throws "required" error if "description" is empty', () => {
            const invalidParameters = {
                ...validParameters,
                ...{ description: '' },
            };

            expect(
                () => Task.create(invalidParameters),
            ).toThrowError('Task description is required');
        });
    });
});
