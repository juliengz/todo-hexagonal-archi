import { Entity } from '../../common/domain/entity';
import { UserCryptedPassword } from './user_crypted_password';
import { UserLogin } from './user_login';

export interface UserPropsInterface {
    login: UserLogin
    cryptedPassword: UserCryptedPassword;
}

export class User extends Entity<UserPropsInterface> {
    private constructor(props: UserPropsInterface, id: string) {
        super(props, id);
    }

    static create(props: UserPropsInterface, id: string): User {
        return new User(props, id);
    }
}
