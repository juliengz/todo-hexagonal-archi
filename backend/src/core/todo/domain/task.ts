import { Entity } from '../../common/domain/entity';
import { Identifier } from '../../common/domain/indentifier';
import { ListId } from './list_id';
import { TaskDescription } from './task_description';
import { TaskId } from './task_id';
import { TaskLabel } from './task_label';

export interface TaskPropsInterface {
    label: TaskLabel,
    description: TaskDescription,
    listId: ListId,
    public: boolean,
    deadline: Date|null|undefined
}

export class Task extends Entity<TaskPropsInterface> {
    private constructor(props: TaskPropsInterface, id: Identifier<string>) {
        super(props, id);
    }

    get taskId(): ListId {
        return TaskId.create(this.id.toValue());
    }

    get listId(): ListId {
        return this.props.listId;
    }

    get label(): TaskLabel {
        return this.props.label;
    }

    get description(): TaskDescription {
        return this.props.description;
    }

    get public(): boolean {
        return this.public;
    }

    get deadline(): Date|null|undefined {
        return this.deadline;
    }

    static create(props: TaskPropsInterface, id: Identifier<string>): Task {
        return new Task(props, id);
    }
}
