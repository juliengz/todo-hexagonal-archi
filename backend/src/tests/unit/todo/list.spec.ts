import { List, ListPropsInterface } from '../../../core/components/todo/domain/entities/list';

describe('GIVEN I want to create a new List with List create method', () => {
    const validParameters: ListPropsInterface = {
        id: 'uuid-list-1',
        label: 'Owner list',
        tasks: [],
        listUserId: 'uuid-user-1',
    };

    describe('WHEN parameters are valid', () => {
        test('THEN it creates the List', async () => {
            expect(
                List.create(validParameters),
            ).toEqual({
                id: 'uuid-list-1',
                label: 'Owner list',
                tasks: [],
                listUserId: 'uuid-user-1',
            });
        });
    });

    describe('WHEN parameters are invalid', () => {
        test('THEN it throws "max length" error if label is too long', () => {
            const invalidParameters = {
                ...validParameters,
                ...{ label: 'x'.repeat(26) },
            };

            expect(
                () => List.create(invalidParameters),
            ).toThrowError('List label must be less than 25 characters');
        });

        test('THEN it throws "required" error if label empty', () => {
            const invalidParameters = {
                ...validParameters,
                ...{ label: '' },
            };

            expect(
                () => List.create(invalidParameters),
            ).toThrowError('List label is required');
        });
    });
});
