/* eslint-disable no-console */

import { List } from '../../../core/todo/domain/list';
import { ListRepositoryInterface } from '../../../core/todo/repositories/list_repository_interface';
import { ListMap } from '../../mappers/list_map';

export class ListRepository implements ListRepositoryInterface {
    private lists: List[];

    constructor() {
        this.lists = [];
    }

    async persist(list: List): Promise<void> {
        this.lists.push(ListMap.toPersistence(list));

        return Promise.resolve();
    }

    async findAll(): Promise<List[]> {
        return Promise.resolve(this.lists);
    }

    async findById(id: string): Promise<List | null> {
        const foundlist = this.lists.find((list) => list.id === id);

        return foundlist || null;
    }

    async exists(list: List): Promise<boolean> {
        return (await this.findById(list.id)) != null;
    }

    import(lists: List[]): void {
        this.lists = lists;
    }
}
