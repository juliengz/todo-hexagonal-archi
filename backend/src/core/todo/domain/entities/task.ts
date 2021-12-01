export interface TaskPropsInterface {
    id: string,
    label: string,
    finished: boolean,
    deadline: Date,
}

export class Task {
    label: string;

    finished: boolean;

    deadline: Date;

    constructor(
        readonly id: string,
        label: string,
        deadline: Date,

    ) {
        this.id = id;
        this.label = label;
        this.deadline = deadline;
        this.finished = false;
    }

    static create(props: TaskPropsInterface): Task {
        return new Task(
            props.id,
            props.label,
            props.deadline,
        );
    }

    toPrimitive(): TaskPropsInterface {
        return {
            id: this.id,
            label: this.label,
            finished: this.finished,
            deadline: this.deadline,
        };
    }
}
