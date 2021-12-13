import { List, ListPropsInterface } from '../../core/todo/domain/list';
import { ListId } from '../../core/todo/domain/list_id';
import { ListLabel } from '../../core/todo/domain/list_label';
import { OwnerId } from '../../core/todo/domain/owner_id';

describe('GIVEN I want to create a new List with List create method', () => {
    const validProps: ListPropsInterface = {
        label: ListLabel.create({ value: 'owner list' }),
        tasks: [],
        ownerId: OwnerId.create('uuid-owner-1'),
    };

    describe('WHEN parameters are valid', () => {
        test('THEN it creates the List', () => {
            console.info(List.create(validProps, ListId.create('uuid-list-1')));
            expect(true).toEqual(true);

            expect(
                List.create(validProps, ListId.create('uuid-list-1')),
            ).toEqual({
                id: { value: 'uuid-list-1' },
                props: {
                    label: validProps.label,
                    tasks: validProps.tasks,
                    ownerId: validProps.ownerId,
                },
            });
        });
    });

    describe('WHEN parameters are invalid', () => {
        test('THEN it throws "max length" error if label is too long', () => {
            expect(
                () => ListLabel.create({ value: 'x'.repeat(26) }),
            ).toThrow('Text is greater than 25 chars.');
        });

        test('THEN it throws "required" error if label is empty', () => {
            expect(
                () => ListLabel.create({ value: '' }),
            ).toThrow('Text is not at least 2 chars.');
        });
    });
});
