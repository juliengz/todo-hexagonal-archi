import { ListId } from '../../core/todo/domain/list_id';
import { Task, TaskPropsInterface } from '../../core/todo/domain/task';
import { TaskDescription } from '../../core/todo/domain/task_description';
import { TaskId } from '../../core/todo/domain/task_id';
import { TaskLabel } from '../../core/todo/domain/task_label';

describe('GIVEN I want to create a new Task with List create method', () => {
    const validProps: TaskPropsInterface = {
        label: TaskLabel.create({ value: 'My first task' }),
        description: TaskDescription.create({ value: 'My first task description' }),
        listId: ListId.create('uuid-parent-task-1'),
        public: false,
        deadline: null,
    };

    describe('WHEN parameters are valid', () => {
        test('then it adds 1 task to task List owner', async () => {
            expect(
                Task.create(validProps, TaskId.create('uuid-task-1')),
            ).toEqual({
                id: { value: 'uuid-task-1' },
                props: {
                    label: validProps.label,
                    description: validProps.description,
                    listId: validProps.listId,
                    public: validProps.public,
                    deadline: validProps.deadline,
                },
            });
        });
    });

    describe('WHEN parameters are invalid', () => {
        test('THEN it throws "max length" error if label is too long', () => {
            expect(
                () => TaskLabel.create({ value: 'x'.repeat(26) }),
            ).toThrow('Text is greater than 25 chars.');
        });

        test('THEN it throws "required" error if label is empty', () => {
            expect(
                () => TaskLabel.create({ value: '' }),
            ).toThrow('Text is not at least 2 chars.');
        });

        test('THEN it throws "max length" error if description is too long', () => {
            expect(
                () => TaskDescription.create({ value: 'x'.repeat(151) }),
            ).toThrow('Text is greater than 150 chars.');
        });

        test('THEN it throws "required" error if description is empty', () => {
            expect(
                () => TaskDescription.create({ value: '' }),
            ).toThrow('Text is not at least 2 chars.');
        });
    });
});
