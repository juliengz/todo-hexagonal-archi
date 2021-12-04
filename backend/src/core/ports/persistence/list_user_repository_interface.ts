import { ListUser } from '../../components/todo/domain/entities/list_user';
import { RepositoryInterface } from '../../shared_kernel/persistence/repository_interface';

export interface ListUserRepositoryInterface extends RepositoryInterface<ListUser> {
}
