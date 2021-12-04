export class MinLengthError extends Error {
    constructor(propLabel: string, minLength: number) {
        super(`${propLabel} must have more than ${minLength} characters`);
    }
}
