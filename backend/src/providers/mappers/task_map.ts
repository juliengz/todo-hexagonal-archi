import { Mapper } from '../../core/common/mapper/mapper';
import { Task } from '../../core/todo/domain/task';

export class TaskMap implements Mapper<Task> {
    public static toPersistence(task: Task): any {
        return {
            label: task.label.value,
            description: task.description.value,
            list_id: task.listId.value,
            public: task.public,
            deadline: task.deadline?.toString(),
        };
    }
}
