export interface Violation {
    field: string;
    message: string;
}

export class ValidationError extends Error {
    constructor(
        public readonly violations: Violation[]
    ) {
        super('ValidationError');
    }
}

export function getInvalidFormControlCssClass(violations: Violation[] | undefined) {
    if (violations === undefined) {
        return '';
    }

    return (violations.length > 0) ? 'is-invalid' : 'is-valid';
}