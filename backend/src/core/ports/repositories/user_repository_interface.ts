/* eslint-disable no-unused-vars */

import { User } from '../../components/authentication/domain/entities/user';

export interface UserRepositoryInterface {
    persist(user: User): Promise<void>;
}
