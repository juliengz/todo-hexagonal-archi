/* eslint-disable class-methods-use-this */

import { HasherInterface } from '../../core/authentication/ports/hashers/hasher_interface';

export default class PasswordHasherStub implements HasherInterface {
    hash(plainValue: string): string {
        return plainValue;
    }

    async compare(plainValue: string, hash: string): Promise<boolean> {
        return plainValue === hash;
    }
}
