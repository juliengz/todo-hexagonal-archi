export class Notification {
    private errors: any = {};

    hasErrors(): boolean {
        return (
            Object.entries(this.errors).length > 0
        );
    }

    getErrors(): {}|null {
        console.info(this.hasErrors());

        return this.hasErrors()
            ? this.errors
            : null;
    }

    addError(key: string, errorLabel: String) {
        this.errors[key] = [...[errorLabel], ...((key in this.errors) ? this.errors[key] : [])];
    }
}
