/* eslint-disable no-console */
type Fields = {
    login?: any,
    password?: string,
}

export class UserValidator {
    private fields: Fields = {};

    private errors: {} = {};

    constructor(fields: Fields) {
        this.fields = fields;
    }

    validate(): boolean {
        let isValid = true;
        if (this.fields.login || this.fields.login === '') {
            const errs = this.validateLogin(this.fields.login);

            if (errs.length > 0) {
                this.addErrors('login', errs);
                isValid = false;
            }
        }

        if (this.fields.password || this.fields.password === '') {
            const errs = this.validatePassword(this.fields.password);

            if (errs.length > 0) {
                this.addErrors('password', errs);
                isValid = false;
            }
        }

        return isValid;
    }

    getErrors(): {}|null {
        return (Object.entries(this.errors).length === 0 && this.errors.constructor === Object) ? null : this.errors;
    }

    addErrors(key: string, fieldErrors: String[]) {
        this.errors = { [key]: fieldErrors, ...this.errors };
    }

    validateLogin = (login: string):string[] => {
        const errors: string[] = [];

        if (login.length === 0) errors.push('required');

        return errors;
    };

    validatePassword = (plainPassword: string) => {
        const errors: string[] = [];

        if (plainPassword.length === 0) errors.push('required');

        return errors;
    };
}
