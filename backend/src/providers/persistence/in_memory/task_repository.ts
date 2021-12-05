/* eslint-disable no-console */

import { Task } from '../../../core/todo/domain/entities/task';
import { TaskRepositoryInterface } from '../../../core/todo/ports/repositories/task_repository_interface';

export class TaskRepository implements TaskRepositoryInterface {
    private tasks: Task[];

    constructor() {
        this.tasks = [];
    }

    async persist(task: Task): Promise<void> {
        this.tasks.push(task);

        return Promise.resolve();
    }

    async findAll(): Promise<Task[]> {
        return Promise.resolve(this.tasks);
    }

    async findById(id: string): Promise<Task | null> {
        const foundtask = this.tasks.find((task) => task.id === id);

        return foundtask || null;
    }

    async exists(task: Task): Promise<boolean> {
        return (await this.findById(task.id)) != null;
    }
}
