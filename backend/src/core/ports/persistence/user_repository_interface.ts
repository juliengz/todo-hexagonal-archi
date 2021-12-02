/* eslint-disable no-unused-vars */

import { User } from '../../components/authentication/domain/entities/user';
import { RepositoryInterface } from '../../shared_kernel/persistence/repository_interface';

export interface UserRepositoryInterface extends RepositoryInterface<User> {
}
