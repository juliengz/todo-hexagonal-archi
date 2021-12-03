export class RequiredError extends Error {
    constructor(propLabel: string) {
        super(`${propLabel} is required`);
    }
}
