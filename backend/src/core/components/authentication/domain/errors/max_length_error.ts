export class MaxLengthError extends Error {
    constructor(propLabel: string, maxLength: number) {
        super(`${propLabel} must be less than ${maxLength} characters`);
    }
}
