/* eslint-disable no-console */

import { ListUser } from '../../../core/components/todo/domain/entities/list_user';
import { ListUserRepositoryInterface } from '../../../core/ports/persistence/list_user_repository_interface';

export class ListUserRepository implements ListUserRepositoryInterface {
    private listUsers: ListUser[];

    constructor() {
        this.listUsers = [];
    }

    async persist(listUser: ListUser): Promise<void> {
        this.listUsers.push(listUser);

        return Promise.resolve();
    }

    async findAll(): Promise<ListUser[]> {
        return Promise.resolve(this.listUsers);
    }

    async findById(id: string): Promise<ListUser | null> {
        const foundListUser = this.listUsers.find((listUser) => listUser.id === id);

        return foundListUser || null;
    }

    async exists(listUser: ListUser): Promise<boolean> {
        return (await this.findById(listUser.id)) != null;
    }

    import(listUsers: ListUser[]): void {
        this.listUsers = listUsers;
    }
}
