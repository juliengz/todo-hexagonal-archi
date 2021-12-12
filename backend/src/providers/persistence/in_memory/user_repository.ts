import { User } from '../../../core/authentication/domain/user';
import {
    UserRepositoryInterface,
} from '../../../core/authentication/persistence/user_repository_interface';

export class UserRepository implements UserRepositoryInterface {
    private users: User[];

    constructor() {
        this.users = [];
    }

    async persist(user: User): Promise<void> {
        this.users.push(user);

        return Promise.resolve();
    }

    async findAll(): Promise<User[]> {
        return Promise.resolve(this.users);
    }

    async findById(id: string): Promise<User | null> {
        const founduser = this.users.find((user) => user.id === id);

        return founduser || null;
    }

    async exists(user: User): Promise<boolean> {
        return (await this.findById(user.id)) != null;
    }
}
