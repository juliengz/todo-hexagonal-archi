import { Task } from './task';

export interface ListPropsInterface {
    id: string
    label: string
    tasks: Task[];
    userId: string;
}

export class List {
    readonly #id: string

    #label: string

    #tasks: Task[];

    #userId: string

    constructor(
        id: string,
        label: string,
        tasks: Task[],
        userId: string,
    ) {
        this.#id = id;
        this.#label = label;
        this.#tasks = tasks;
        this.#userId = userId;
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
            id: this.#id,
            label: this.#label,
            tasks: this.#tasks,
            userId: this.#userId,
        };
    }
}
