/* eslint-disable no-unused-vars */

import { Task } from '../../components/todo/domain/entities/task';
import { RepositoryInterface } from '../../shared_kernel/persistence/repository_interface';

export interface TaskRepositoryInterface extends RepositoryInterface<Task> {
}
