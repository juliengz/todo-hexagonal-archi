import { AuthDomainErrorInterface } from './auth_domain_error_interface';

export class InvalidPassword implements AuthDomainErrorInterface {
    public readonly message = 'invalid_password';
}
