/* eslint-disable no-unused-vars */
import { List } from '../../../domain/entities/list';

export interface ListRepositoryInterface {
    persist(list: List): Promise<void>;
    findAll(): Promise<List[]>;
}
