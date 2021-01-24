// @ts-check

/**
 * @param {HTMLInputElement} input 
 * @param {string} errorMessage 
 */
export function customizeValidationErrorMessage(input, errorMessage) {
    input.addEventListener('input', () => input.setCustomValidity(''));
    input.addEventListener('invalid', () => input.setCustomValidity(errorMessage));
}

/**
 * @typedef Violation
 * @type {object}
 * @property {string} field
 * @property {string} message
 */
