import { ListLabel } from '../value_objects/list_label';
import { Task } from './task';

export interface ListPropsInterface {
    id: string
    label: ListLabel
    tasks: Task[];
    listUserId: string;
}

export class List {
    readonly id: string

    readonly label: ListLabel

    readonly tasks: Task[];

    readonly listUserId: string

    private constructor(
        id: string,
        label: ListLabel,
        tasks: Task[],
        listUserId: string,
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

    addTask(
        id: string,
        label: string,
        description: string,
        deadline: Date,
    ) {
        const task = Task.create({
            id,
            listId: this.id,
            label,
            description,
            finished: false,
            deadline,
        });

        this.tasks.push(task);
    }
}
