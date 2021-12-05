/* eslint-disable no-unused-vars */

import { RepositoryInterface } from '../../../shared_kernel/repositories/repository_interface';
import { User } from '../../domain/entities/user';

export interface UserRepositoryInterface extends RepositoryInterface<User> {
}
