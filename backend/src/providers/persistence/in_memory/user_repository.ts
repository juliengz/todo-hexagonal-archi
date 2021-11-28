/* eslint-disable no-console */

import { User } from '../../../core/components/auth/domain/entities/user';
import { UserRepositoryInterface } from '../../../core/ports/persistence/user_repository_interface';

export class UserRepository implements UserRepositoryInterface {
    private users: Map<string, User> = new Map();

    persist(user: User): Promise<void> {
        this.users.set(user.getLogin(), user);
        console.log(this.users);

        return Promise.resolve();
    }
}
