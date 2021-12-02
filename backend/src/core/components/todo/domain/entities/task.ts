export interface TaskPropsInterface {
    id: string,
    label: string,
    finished: boolean,
    deadline?: Date,
    listId: string
}

export class Task {
    readonly #id: string

    #label: string;

    #finished: boolean;

    #deadline?: Date;

    #listId: string;

    constructor(
        id: string,
        label: string,
        finished: boolean,
        deadline: Date,
        listId: string,

    ) {
        this.#id = id;
        this.#label = label;
        this.#finished = finished;
        this.#deadline = deadline;
        this.#listId = listId;
    }

    static create(props: TaskPropsInterface): Task {
        return new Task(
            props.id,
            props.label,
            false,
            props.deadline,
            props.listId,
        );
    }

    toPrimitive(): TaskPropsInterface {
        return {
            id: this.#id,
            label: this.#label,
            finished: this.#finished,
            deadline: this.#deadline,
            listId: this.#listId,
        };
    }
}
