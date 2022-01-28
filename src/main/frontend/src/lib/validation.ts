export interface ConstraintViolation {
    type: 'https://zalando.github.io/problem/constraint-violation',
    status: 422,
    violations: Violation[],
    title: string
}

export const isConstraintViolation = (error: unknown): error is ConstraintViolation => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'type' in error &&
        // @ts-ignore
        error['type'] === 'https://zalando.github.io/problem/constraint-violation'
    )
}


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