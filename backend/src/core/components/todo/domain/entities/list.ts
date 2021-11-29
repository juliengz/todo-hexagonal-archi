import { Uuid } from '../../../../ports/persistence/id_generator';
import { User } from '../../../auth/domain/entities/user';
import { Task } from './task';

export class List {
    private tasks: Task[];

    constructor(
        private readonly id: Uuid,
        private title: string,
        private user: User,
    ) {
        this.id = id;
        this.title = title;
        this.user = user;
        this.tasks = [];
    }
}
