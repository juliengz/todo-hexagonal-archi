import { Entity } from '../../common/domain/entity';
import { Identifier } from '../../common/domain/indentifier';
import { ListId } from './list_id';
import { ListLabel } from './list_label';
import { OwnerId } from './owner_id';
import { Task } from './task';

export interface ListPropsInterface {
    label: ListLabel
    tasks?: Task[];
    ownerId: OwnerId;
}

export class List extends Entity<ListPropsInterface> {
    private constructor(props: ListPropsInterface, id: Identifier<string>) {
        super(props, id);
    }

    get listId(): ListId {
        return ListId.create(this.id.toValue());
    }

    get label(): ListLabel {
        return this.props.label;
    }

    get ownerId(): OwnerId {
        return this.props.ownerId;
    }

    get tasks(): Task[] {
        return this.tasks;
    }

    static create(props: ListPropsInterface, id: Identifier<string>): List {
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
