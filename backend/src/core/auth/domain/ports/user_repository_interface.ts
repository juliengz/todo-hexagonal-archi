/* eslint-disable no-unused-vars */

import { User } from '../entities/user';

export interface UserRepositoryInterface {
    persist(user: User): Promise<void>;
}
