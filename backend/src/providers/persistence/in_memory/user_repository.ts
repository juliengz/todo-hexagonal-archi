/* eslint-disable no-console */

import { User } from '../../../core/components/authentication/domain/entities/user';
import { UserRepositoryInterface } from '../../../core/ports/persistence/user_repository_interface';

export class UserRepository implements UserRepositoryInterface {
    private users: User[];

    constructor() {
        this.users = [];
    }

    persist(user: User): Promise<void> {
        this.users.push(user);

        return Promise.resolve();
    }

    findAll(): Promise<User[]> {
        return Promise.resolve(this.users);
    }
}
