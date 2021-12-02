/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import { Task } from './task';

export interface ListPropsInterface {
    id: string
    label: string
    tasks: Task[];
}

export class List {
    readonly id: string

    label: string

    tasks: Task[];

    constructor(
        id: string,
        label: string,
        tasks: Task[],
    ) {
        this.id = id;
        this.label = label;
        this.tasks = tasks;
    }

    static create(props: ListPropsInterface): List {
        return new List(
            props.id,
            props.label,
            props.tasks,
        );
    }

    toPrimitives(): ListPropsInterface {
        return {
            id: this.id,
            label: this.label,
            tasks: this.tasks,
        };
    }
}
