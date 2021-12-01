/* eslint-disable no-unused-vars */

import { User } from '../../domain/entities/user';

export interface UserRepositoryInterface {
    persist(user: User): Promise<void>;
}
