/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import { err, ok, Result } from 'neverthrow';
import { AuthDomainErrorInterface } from '../errors/auth_domain_error_interface';
import { InvalidUser } from '../errors/invalid_user';
import { UserDtoInterface } from './user_dto_interface';

const saltRounds = 10;

export class User {
    public static async create(
        login: string,
        password: string,
    ): Promise<Result<User, AuthDomainErrorInterface>> {
        let errors = {};
        const loginErrors = [];
        const passwordErrors = [];

        if (login.length === 0) loginErrors.push('required');
        if (password.length === 0) passwordErrors.push('required');

        if (loginErrors.length > 0) errors = { login: loginErrors, ...errors };
        if (passwordErrors.length > 0) errors = { password: passwordErrors, ...errors };

        if (Object.entries(errors).length === 0 && errors.constructor === Object) {
            return ok(new User(login, bcrypt.hashSync(password, saltRounds)));
        }

        return err(new InvalidUser(errors));
    }

    private constructor(
        private login: string,
        private cryptedPassword: string,
    ) {
        this.login = login;
        this.cryptedPassword = cryptedPassword;
    }

    async validPassword(passwordToTest: string): Promise<boolean> {
        const match = await bcrypt.compare(this.cryptedPassword, passwordToTest);

        return match;
    }

    getLogin(): string {
        return this.login;
    }

    toDto(): UserDtoInterface {
        return { login: this.login };
    }
}
