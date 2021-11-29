import { User } from '../../../auth/domain/entities/user';

export class Task {
    private title: string;

    private user: User;

    constructor(
        title: string,
        user: User,
    ) {
        this.title = title;
        this.user = user;
    }
}
