// @ts-check

/**
 * @param {HTMLFormElement} form
 * @returns {Promise<HTMLDocument>}
 */
export async function submitForm(form) {
    let response;
    try {
        response = await submitUsingFetch(form);
    } catch (error) {
        form.submit();
        return;
    }

    const responseDocument = new DOMParser().parseFromString(await response.text(), 'text/html');

    if (!response.ok) {
        throw responseDocument;
    }

    return responseDocument;
}

async function submitUsingFetch(form) {
    return fetch(form.action, {
        method: form.method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // @ts-ignore https://github.com/microsoft/TypeScript/issues/30584
        body: new URLSearchParams(new FormData(form).entries()).toString()
    });
}

/**
 * @param {HTMLInputElement} input 
 * @param {string} errorMessage 
 */
export function customizeValidationErrorMessage(input, errorMessage) {
    input.addEventListener('input', () => input.setCustomValidity(''));
    input.addEventListener('invalid', () => input.setCustomValidity(errorMessage));
}