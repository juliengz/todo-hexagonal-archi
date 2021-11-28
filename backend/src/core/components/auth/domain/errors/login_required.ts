import { AuthDomainErrorInterface } from './auth_domain_error_interface';

export class LoginRequired implements AuthDomainErrorInterface {
    public readonly message = 'login_required';
}
