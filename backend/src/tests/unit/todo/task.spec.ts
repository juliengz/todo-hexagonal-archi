import { Identifier } from '../../../core/common/domain/indentifier';
import { Task, TaskPropsInterface } from '../../../core/todo/domain/task';
import { TaskDescription } from '../../../core/todo/domain/task_description';
import { TaskLabel } from '../../../core/todo/domain/task_label';

describe('GIVEN I want to create a new Task with List create method', () => {
    const validProps: TaskPropsInterface = {
        label: TaskLabel.create({ value: 'My first task' }),
        description: TaskDescription.create({ value: 'My first task description' }),
        parentTaskId: new Identifier('uuid-parent-task-1'),
    };

    describe('WHEN parameters are valid', () => {
        test('then it adds 1 task to task List owner', async () => {
            expect(
                Task.create(validProps, 'uuid-task-1'),
            ).toEqual({
                id: { value: 'uuid-task-1' },
                props: {
                    label: validProps.label,
                    description: validProps.description,
                    parentTaskId: validProps.parentTaskId,
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
