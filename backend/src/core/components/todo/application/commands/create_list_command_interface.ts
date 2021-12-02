import { Task } from '../../domain/entities/task';

export interface CreateListCommandInterface {
    id: string
    label: string
    tasks: Task[]
}
