import { Task } from './task';

export interface ListPropsInterface {
    id: string
    label: string
    tasks: Task[];
    userId: string;
}

export class List {
    readonly id: string

    readonly label: string

    readonly tasks: Task[];

    readonly userId: string

    constructor(
        id: string,
        label: string,
        tasks: Task[],
        userId: string,
    ) {
        this.id = id;
        this.label = label;
        this.tasks = tasks;
        this.userId = userId;
    }

    static create(props: ListPropsInterface): List {
        return new List(
            props.id,
            props.label,
            props.tasks,
            props.userId,
        );
    }

    toPrimitives(): ListPropsInterface {
        return {
            id: this.id,
            label: this.label,
            tasks: this.tasks,
            userId: this.userId,
        };
    }

    addTask(
        id: string,
        label: string,
        deadline: Date,
    ) {
        const task = Task.create({
            id,
            listId: this.id,
            label,
            finished: false,
            deadline,
        });

        this.tasks.push(task);
    }
}
