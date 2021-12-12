import { Entity } from '../../common/domain/entity';
import { ListId } from './list_id';
import { TaskDescription } from './task_description';
import { TaskLabel } from './task_label';

export interface TaskPropsInterface {
    label: TaskLabel,
    description: TaskDescription,
    listId: ListId,
    public: boolean,
    deadline: Date|null|undefined
}

export class Task extends Entity<TaskPropsInterface> {
    private constructor(props: TaskPropsInterface, id: string) {
        super(props, id);
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

    static create(props: TaskPropsInterface, id: string): Task {
        return new Task(props, id);
    }
}
