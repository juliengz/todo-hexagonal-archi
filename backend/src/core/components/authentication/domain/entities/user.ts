export interface UserPropsInterface {
    id: string
    login: string
    cryptedPassword: string;
}

export class User {
    readonly #id: string

    #login: string

    #cryptedPassword: string;

    constructor(
        id: string,
        login: string,
        cryptedPassword: string,
    ) {
        this.#id = id;
        this.#login = login;
        this.#cryptedPassword = cryptedPassword;
    }

    static create(props: UserPropsInterface): User {
        return new User(
            props.id,
            props.login,
            props.cryptedPassword,
        );
    }

    toPrimitives(): UserPropsInterface {
        return {
            id: this.#id,
            login: this.#login,
            cryptedPassword: this.#cryptedPassword,
        };
    }
}
