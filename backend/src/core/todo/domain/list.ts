import { Identifier } from '../../common/domain/indentifier';
import { ListLabel } from './list_label';
import { Task } from './task';

export interface ListPropsInterface {
    id: Identifier<string>
    label: ListLabel
    tasks: Task[];
    listUserId: Identifier<string>;
}

export class List {
    readonly id: Identifier<string>

    readonly label: ListLabel

    readonly tasks: Task[];

    readonly listUserId: Identifier<string>

    private constructor(
        id: Identifier<string>,
        label: ListLabel,
        tasks: Task[],
        listUserId: Identifier<string>,
    ) {
        this.id = id;
        this.label = label;
        this.tasks = tasks;
        this.listUserId = listUserId;
    }

    static create(props: ListPropsInterface): List {
        return new List(
            props.id,
            props.label,
            props.tasks,
            props.listUserId,
        );
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
