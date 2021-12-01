/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import { Task } from './task';

export interface ListPropsInterface {
    id: string
    label: string
    tasks: Task[];
}

export interface ListCreationPropsInterface {
    id: string
    label: string
}

export class List {
    readonly id: string

    label: string

    tasks: Task[];

    constructor(
        id: string,
        label: string,
    ) {
        this.id = id;
        this.label = label;
        this.tasks = [];
    }

    static create(props: ListCreationPropsInterface): List {
        return new List(
            props.id,
            props.label,
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
