// @ts-check

/**
 * @param {HTMLFormElement} form
 * @returns {Promise<object>}
 */
export async function submitForm(form) {
    let response;
    try {
        response = await submitUsingFetch(form);
    } catch (error) {
        form.submit();
        return;
    }

    const responseBody = await response.json();

    if (!response.ok) {
        throw responseBody;
    }

    return responseBody;
}

/**
 * @param {HTMLFormElement} form
 * @returns {Promise<Response>}
 */
async function submitUsingFetch(form) {
    const response = await fetch(form.action, {
        method: form.method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toJson(new FormData(form)))
    });

    if (is201ResponseWithRedirect(response)) {
        return followRedirect(response);
    }

    return response;
}

/**
 * @param {Response} response 
 */
const is201ResponseWithRedirect = response => response.status === 201 && response.headers.get('Location') !== null;

async function followRedirect(response) {
    return fetch(response.headers.get('Location'), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

/**
 * @param {FormData} formData 
 * @returns {object}
 */
function toJson(formData) {
    return Array.from(formData.entries())
        .reduce(
            (obj, [key, value]) => {
                if (key.endsWith('[]')) {
                    key = key.replace(/\[\]$/, '')
                    if (obj[key] === undefined) {
                        obj[key] = [];
                    }
                    obj[key].push(value);
                } else {
                    obj[key] = value;
                }
                return obj;
            },
            {}
        )
}
