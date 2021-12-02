/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import { err, ok, Result } from 'neverthrow';
import { AuthDomainErrorInterface } from '../errors/auth_domain_error_interface';
import { InvalidUser } from '../errors/invalid_user';
import { UserValidator } from './user_validator';

const saltRounds = 10;

export class User {
    public static async create(
        id: String,
        login: string,
        password: string,
    ): Promise<Result<User, AuthDomainErrorInterface>> {
        const validator = new UserValidator({
            login,
            password,
        });
        const isValid = validator.validate();

        if (isValid) return ok(new User(id, login, bcrypt.hashSync(password, saltRounds)));

        const errors = validator.getErrors();

        return err(new InvalidUser(errors!));
    }

    constructor(
        private readonly id: String,
        private login: string,
        private cryptedPassword: string,
    ) {
        this.id = id;
        this.login = login;
        this.cryptedPassword = cryptedPassword;
    }

    async validPassword(passwordToTest: string): Promise<boolean> {
        const match = await bcrypt.compare(this.cryptedPassword, passwordToTest);

        return match;
    }
}
