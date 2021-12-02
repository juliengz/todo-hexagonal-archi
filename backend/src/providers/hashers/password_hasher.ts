/* eslint-disable class-methods-use-this */

import bcrypt from 'bcrypt';
import { HasherInterface } from '../../core/ports/hashers/hasher_interface';

export default class PasswordHasher implements HasherInterface {
    hash(plainValue: string): string {
        return bcrypt.hashSync(plainValue, 10);
    }

    async compare(plainValue: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plainValue, hash);
    }
}
