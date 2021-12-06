import { err, ok } from 'neverthrow';
import { List, ListPropsInterface } from '../../../core/todo/domain/list';

describe('GIVEN I want to create a new List with List create method', () => {
    const validParameters: ListPropsInterface = {
        id: 'uuid-list-1',
        label: 'Owner list',
        tasks: [],
        listUserId: 'uuid-user-1',
    };

    describe('WHEN parameters are valid', () => {
        test('THEN it creates the List', async () => {
            const result = List.create(validParameters);

            expect(result).toEqual(
                ok({
                    id: 'uuid-list-1',
                    label: 'Owner list',
                    tasks: [],
                    listUserId: 'uuid-user-1',
                }),
            );
        });
    });

    describe('WHEN parameters are invalid', () => {
        test('THEN it throws "max length" error if label is too long', () => {
            const invalidParameters = {
                ...validParameters,
                ...{ label: 'x'.repeat(26) },
            };

            const result = List.create(invalidParameters);

            expect(result).toEqual(
                err({ label: ['label must have more than 25 characters'] }),
            );
        });

        test('THEN it throws "required" error if label empty', () => {
            const invalidParameters = {
                ...validParameters,
                ...{ label: '' },
            };

            const result = List.create(invalidParameters);

            expect(result).toEqual(
                err({ label: ['label is required'] }),
            );
        });
    });
});
