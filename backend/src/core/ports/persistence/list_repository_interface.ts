/* eslint-disable no-unused-vars */

import { List } from '../../components/todo/domain/entities/list';

export interface ListRepositoryInterface {
    persist(user: List): Promise<void>;
    findAll(): Promise<List[]>
}
