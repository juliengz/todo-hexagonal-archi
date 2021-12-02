/* eslint-disable no-unused-vars */

import { List } from '../../components/todo/domain/entities/list';
import { RepositoryInterface } from '../../shared_kernel/persistence/repository_interface';

export interface ListRepositoryInterface extends RepositoryInterface<List> {
}
