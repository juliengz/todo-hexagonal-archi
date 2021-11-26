/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import { err, ok, Result } from 'neverthrow';
import { AuthDomainErrorInterface } from '../errors/auth_domain_error_interface';
import { LoginRequired } from '../errors/login_required';
import { UserDtoInterface } from './user_dto_interface';

const saltRounds = 10;

export class User {
    public static async create(
        login: string,
        password: string,
    ): Promise<Result<User, AuthDomainErrorInterface>> {
        const user = new User(login, bcrypt.hashSync(password, saltRounds));

        if (!user.validLogin()) {
            return err(new LoginRequired());
        }

        return ok(user);
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

    validLogin(): boolean {
        return this.login.trim().length !== 0;
    }

    getLogin(): string {
        return this.login;
    }

    toDto(): UserDtoInterface {
        return { login: this.login };
    }
}
