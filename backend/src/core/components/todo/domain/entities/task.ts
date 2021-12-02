export interface TaskPropsInterface {
    id: string,
    label: string,
    finished: boolean,
    deadline: Date,
    listId: string
}

export class Task {
    readonly id: string

    label: string;

    finished: boolean;

    deadline: Date;

    listId: string;

    constructor(
        id: string,
        listId: string,
        label: string,
        finished: boolean,
        deadline: Date,

    ) {
        this.id = id;
        this.listId = listId;
        this.label = label;
        this.finished = finished;
        this.deadline = deadline;
    }

    static create(props: TaskPropsInterface): Task {
        return new Task(
            props.id,
            props.listId,
            props.label,
            props.finished,
            props.deadline,
        );
    }

    toPrimitive(): TaskPropsInterface {
        return {
            id: this.id,
            label: this.label,
            finished: this.finished,
            deadline: this.deadline,
            listId: this.listId,
        };
    }
}
