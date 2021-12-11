import { Entity } from '../../common/domain/entity';
import { Identifier } from '../../common/domain/indentifier';
import { TaskDescription } from './task_description';
import { TaskLabel } from './task_label';

export interface TaskPropsInterface {
    label: TaskLabel,
    description: TaskDescription,
    parentTaskId: Identifier<string>,
}

export class Task extends Entity<TaskPropsInterface> {
    private constructor(props: TaskPropsInterface, id: string) {
        super(props, id);
    }

    static create(props: TaskPropsInterface, id: string): Task {
        return new Task(props, id);
    }
}
