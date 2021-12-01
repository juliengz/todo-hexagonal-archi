/* eslint-disable class-methods-use-this */

import { v4 } from 'uuid';
import { IdGeneratorInterface, Uuid } from '../../../shared/id_generator';

export class UuidGenerator implements IdGeneratorInterface {
    generateId(): Uuid {
        return v4();
    }
}
