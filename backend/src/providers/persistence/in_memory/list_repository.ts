/* eslint-disable no-console */

import { List } from '../../../core/components/todo/domain/entities/list';
import { ListRepositoryInterface } from '../../../core/ports/persistence/list_repository_interface';

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
