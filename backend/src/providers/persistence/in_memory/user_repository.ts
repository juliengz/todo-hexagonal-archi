/* eslint-disable no-console */

import { User } from '../../../core/components/auth/domain/entities/user';
import { UserRepositoryInterface } from '../../../core/ports/persistence/user_repository_interface';

export class UserRepository implements UserRepositoryInterface {
    private users: User[] = [];

    persist(user: User): Promise<void> {
        this.users.push(user);
        console.log(this.users);

        return Promise.resolve();
    }
}
