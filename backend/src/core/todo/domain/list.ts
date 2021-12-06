import { err, ok, Result } from 'neverthrow';
import { Notification } from '../../shared_kernel/validation/notification';
import { MaxLengthError } from './errors/max_length_error';
import { RequiredError } from './errors/required_error';
import { Task } from './task';

export interface ListPropsInterface {
    id: string
    label: string
    tasks: Task[];
    listUserId: string;
}

export class List {
    readonly id: string

    readonly label: string

    readonly tasks: Task[];

    readonly listUserId: string

    private constructor(
        id: string,
        label: string,
        tasks: Task[],
        listUserId: string,
    ) {
        this.id = id;
        this.label = label;
        this.tasks = tasks;
        this.listUserId = listUserId;

        // this.validate();
    }

    static create(props: ListPropsInterface): Result<List, {}> {
        const notification: Notification = new Notification();

        if (props.label.length === 0) notification.addError('label', 'label is required');
        if (props.label.length > 25) notification.addError('label', 'label must have more than 25 characters');

        if (notification.hasErrors()) {
            return err(notification.getErrors()!);
        }

        return ok(new List(
            props.id,
            props.label,
            props.tasks,
            props.listUserId,
        ));
    }

    public validate() {
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
