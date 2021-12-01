/* eslint-disable no-console */

import { User } from '../../../core/auth/domain/entities/user';
import { UserRepositoryInterface } from '../../../core/auth/ports/repositories/user_repository_interface';

export const inMemoryUserData: User[] = [
    new User(
        '76fa3660-7d9a-4013-9f47-00000000001',
        'admin',
        '$2b$10$BD7IRCVrc5ck1O70COve3uVLyYrElW1SX210InAYZ9gn4J/oUqUS.',
    ),
    new User(
        '76fa3660-7d9a-4013-9f47-00000000002',
        'user',
        '$2b$10$BD7IRCVrc5ck1O70COve3uVLyYrElW1SX210InAYZ9gn4J/oUqUS.',
    ),
];

export class UserRepository implements UserRepositoryInterface {
    private users: User[];

    constructor() {
        this.users = inMemoryUserData;
    }

    persist(user: User): Promise<void> {
        this.users.push(user);

        return Promise.resolve();
    }
}
