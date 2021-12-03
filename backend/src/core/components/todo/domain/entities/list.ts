import { MaxLengthError } from '../errors/max_length_error';
import { RequiredError } from '../errors/required_error';
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

        this.validate();
    }

    static create(props: ListPropsInterface): List {
        return new List(
            props.id,
            props.label,
            props.tasks,
            props.userId,
        );
    }

    validate() {
        if (this.label.length === 0) throw new RequiredError('List label');
        if (this.label.length > 25) throw new MaxLengthError('List label', 25);
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
