import { InvalidArgument } from "./errors/invalid_argument";

export interface TaskPropsInterface {
    id: string,
    label: string,
    description: string,
    finished: boolean,
    deadline: Date,
    listId: string
}

export class Task {
    readonly id: string

    readonly listId: string;

    readonly label: string;

    readonly description: string;

    readonly finished: boolean;

    readonly deadline: Date;

    private constructor(
        id: string,
        listId: string,
        label: string,
        description: string,
        finished: boolean,
        deadline: Date,

    ) {
        this.id = id;
        this.listId = listId;
        this.label = label;
        this.description = description;
        this.finished = finished;
        this.deadline = deadline;

        this.validate();
    }

    static create(props: TaskPropsInterface): Task {
        return new Task(
            props.id,
            props.listId,
            props.label,
            props.description,
            props.finished,
            props.deadline,
        );
    }

    validate() {
        if (this.label.length === 0) throw new InvalidArgument('Task label');
        if (this.label.length > 25) throw new InvalidArgument('Task label');
        if (this.description.length === 0) throw new InvalidArgument('Task description');
        if (this.description.length > 150) throw new InvalidArgument('Task description');
    }
}