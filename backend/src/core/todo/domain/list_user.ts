import { List } from './list';

export interface ListUserPropsInterface {
    id: string
    lists: List[]
}

export class ListUser {
    readonly id: string

    readonly lists: List[]

    constructor(
        id: string,
        lists: List[],
    ) {
        this.id = id;
        this.lists = lists;
    }

    addList(
        id: string,
        label: string,
    ) {
        const list = List.create({
            id,
            listUserId: this.id,
            label,
            tasks: [],
        });

        this.lists.push(list);
    }
}
