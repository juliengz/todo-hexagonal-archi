/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import { err, ok, Result } from 'neverthrow';
import { DtoInterface } from '../../../../ports/dto/dto_interface';
import { Uuid } from '../../../../ports/persistence/id_generator';
import { AuthDomainErrorInterface } from '../errors/auth_domain_error_interface';
import { InvalidUser } from '../errors/invalid_user';
import { UserDtoInterface } from './user_dto_interface';

const saltRounds = 10;

export class User implements DtoInterface {
    public static async create(
        id: Uuid,
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
            return ok(new User(id, login, bcrypt.hashSync(password, saltRounds)));
        }

        return err(new InvalidUser(errors));
    }

    constructor(
        private readonly id: Uuid,
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

    toDto(): UserDtoInterface {
        return { id: this.id, login: this.login };
    }
}
