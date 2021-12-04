import { MaxLengthError } from '../errors/max_length_error';
import { MinLengthError } from '../errors/min_length_error';
import { RequiredError } from '../errors/required_error';

export interface UserPropsInterface {
    id: string
    login: string
    cryptedPassword: string;
}

export class User {
    readonly id: string

    readonly login: string

    readonly cryptedPassword: string;

    private constructor(
        id: string,
        login: string,
        cryptedPassword: string,
    ) {
        this.id = id;
        this.login = login;
        this.cryptedPassword = cryptedPassword;

        this.validate();
    }

    static create(props: UserPropsInterface): User {
        return new User(
            props.id,
            props.login,
            props.cryptedPassword,
        );
    }

    validate() {
        if (this.login.length === 0) throw new RequiredError('User login');
        if (this.login.length > 20) throw new MaxLengthError('User login', 20);
        if (this.login.length < 4) throw new MinLengthError('User login', 4);
    }
}
