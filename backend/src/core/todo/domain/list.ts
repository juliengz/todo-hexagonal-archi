import { Entity } from '../../common/domain/entity';
import { Identifier } from '../../common/domain/indentifier';
import { ListLabel } from './list_label';
import { Task } from './task';

export interface ListPropsInterface {
    label: ListLabel
    tasks: Task[];
    listUserId: Identifier<string>;
}

export class List extends Entity<ListPropsInterface> {
    private constructor(props: ListPropsInterface, id: string) {
        super(props, id);
    }

    static create(props: ListPropsInterface, id: string): List {
        const defaultListProps: ListPropsInterface = {
            ...props,
            tasks: [],
        };

        return new List(defaultListProps, id);
    }

    // addTask(
    //     id: string,
    //     label: string,
    //     description: string,
    //     deadline: Date,
    // ) {
    //     const task = Task.create({
    //         id,
    //         listId: this.id,
    //         label,
    //         description,
    //         finished: false,
    //         deadline,
    //     });

    //     this.tasks.push(task);
    // }
}
