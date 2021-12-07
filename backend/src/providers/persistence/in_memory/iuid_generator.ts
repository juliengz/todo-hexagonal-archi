/* eslint-disable class-methods-use-this */

import { v4 } from 'uuid';
import { IdGeneratorInterface } from '../../../core/common/services/id_generator_interface';

export class UuidGenerator implements IdGeneratorInterface {
    generateId(): string {
        return v4();
    }
}
