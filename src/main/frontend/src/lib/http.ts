type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const isBrowser = typeof window !== 'undefined';

export async function get(url: string) {
    const response = await fetch(toApiUrl(`/api${url}`), {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    return response.json();
}

export async function submit<T = any>(url: string, method: Method, jsonBody: T) {
    let response = await submitUsingFetch(url, method, jsonBody);

    const responseBody = await response.json();

    if (!response.ok) {
        throw responseBody;
    }

    return responseBody;
}

const toApiUrl = (url: string) => isBrowser ? url : `http://localhost:8080${url}`

async function submitUsingFetch<T = any>(url: string, method: Method, jsonBody: T) {
    const response = await fetch(toApiUrl(`/api${url}`), {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBody)
    });

    if (is201ResponseWithRedirect(response)) {
        return followRedirect(response);
    }

    return response;
}


async function followRedirect(response: ResponseWithRedirect) {
    return fetch(response.headers.get('Location'), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

interface ResponseWithRedirect extends Response {
    headers: Response['headers'] & {
        get(arg: 'Location'): string;
    }
}

const is201ResponseWithRedirect = (response: Response): response is ResponseWithRedirect => (
    response.status === 201 &&
    response.headers.get('Location') !== null
);