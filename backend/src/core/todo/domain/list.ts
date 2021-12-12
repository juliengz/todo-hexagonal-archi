import { Entity } from '../../common/domain/entity';
import { ListLabel } from './list_label';
import { OwnerId } from './owner_id';
import { Task } from './task';

export interface ListPropsInterface {
    label: ListLabel
    tasks: Task[];
    ownerId: OwnerId;
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
