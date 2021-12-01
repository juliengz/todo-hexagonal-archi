/* eslint-disable no-console */

import { ListRepositoryInterface } from '../../../core/todo/application/ports/repositories/list_repository_interface';
import { List } from '../../../core/todo/domain/entities/list';

export class ListRepository implements ListRepositoryInterface {
    private lists: List[];

    constructor() {
        this.lists = [];
    }

    persist(list: List): Promise<void> {
        this.lists.push(list);

        return Promise.resolve();
    }

    findAll(): Promise<List[]> {
        return Promise.resolve(this.lists);
    }
}
