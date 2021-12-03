import { Task, TaskPropsInterface } from '../../../core/components/todo/domain/entities/task';

describe('I instanciate a new Task class with create method', () => {
    const validParameters: TaskPropsInterface = {
        id: 'uuid-task-1',
        listId: 'uuid-list-1',
        label: 'My first task',
        description: 'My first task description',
        finished: false,
        deadline: new Date(),
    };

    describe('with valid parameters', () => {
        it('then it add 1 task with parameters', async () => {
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

    describe('Parameters are invalid', () => {
        it('should throw "max length" error for "label" attribute', () => {
            const invalidParameters = {
                ...validParameters,
                ...{ label: 'I have to think about writing less than 25 characters' },
            };

            expect(
                () => Task.create(invalidParameters),
            ).toThrowError('Task label must be less than 25 characters');
        });

        it('should throw "required" error for "label" attribute', () => {
            const invalidParameters = {
                ...validParameters,
                ...{ label: '' },
            };

            expect(
                () => Task.create(invalidParameters),
            ).toThrowError('Task label is required');
        });

        it('should throw "max length" error for "description" attribute', () => {
            const invalidParameters = {
                ...validParameters,
                ...{ description: 'x'.repeat(151) },
            };

            expect(
                () => Task.create(invalidParameters),
            ).toThrowError('Task description must be less than 150 characters');
        });

        it('should throw "required" error for "description" attribute', () => {
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
