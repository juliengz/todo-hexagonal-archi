/* eslint-disable class-methods-use-this */

import { IdGeneratorInterface } from '../../../core/common/services/id_generator_interface';

export const expectedId = '0000000-0000-0000-0000-000000000000';

export class UuidGeneratorStub implements IdGeneratorInterface {
    generateId(): string {
        return expectedId;
    }
}
