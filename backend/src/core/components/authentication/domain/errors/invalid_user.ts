import { AuthDomainErrorInterface } from './auth_domain_error_interface';

export class InvalidUser implements AuthDomainErrorInterface {
    public readonly message = 'invalid_user';

    public readonly errors: {};

    constructor(
        errors: {},
    ) {
        this.errors = errors;
    }
}
