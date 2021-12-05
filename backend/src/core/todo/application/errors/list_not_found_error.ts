export class ListNotFoundError extends Error {
    constructor() {
        super('List not found');
    }
}
