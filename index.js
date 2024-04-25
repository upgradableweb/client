/**
 * @module client
 */

/**
 * @typedef {object} RequestOptions
 * @property {object} [query] - Query parameters for the request.
 * @property {string} [authorization] - Authorization token for the request.
 * @property {() => void} [setLoading] - Function to set loading state.
 * @property {() => void} [onResponse] - Function to handle successful response.
 * @property {() => void} [onError] - Function to handle errors.
 * @property {() => void} [setError] - Function to handle errors.
 */

/**
 * @param {string} url - The URL to send the request to.
 * @param {object | string} body - The body to send the request to.
 * @param {RequestOptions} options - handling options for the request.
 * @returns {Promise} - A promise that resolves with the response data.
 */

export async function POST(url, body, options = {}) {
    return await FETCH(url, body, { method: 'POST', ...options })
}

/**
 * @param {string} url - The URL to send the request to.
 * @param {object | string} body - The body to send the request to.
 * @param {RequestOptions} options - handling options for the request.
 * @returns {Promise} - A promise that resolves with the response data.
 */

export async function PUT(url, body, options = {}) {
    return await FETCH(url, body, { method: 'PUT', ...options })
}

/**
 * @param {string} url - The URL to send the request to.
 * @param {object | string} body - The body to send the request to.
 * @param {RequestOptions} options - handling options for the request.
 * @returns {Promise} - A promise that resolves with the response data.
 */

export async function DELETE(url, body, options = {}) {
    return await FETCH(url, body, { ...options, method: 'DELETE' })
}

/**
 * @param {string} url - The URL to send the request to.
 * @param {object | string} body - The body to send the request to.
 * @param {RequestOptions} options - handling options for the request.
 * @returns {Promise} - A promise that resolves with the response data.
 */

export async function PATCH(url, body, options = {}) {
    return await FETCH(url, body, { ...options, method: 'PATCH' })
}

/**
 * @param {string} url - The URL to send the request to.
 * @param {object | string} body - The body to send the request to.
 * @param {RequestOptions} options - handling options for the request.
 * @returns {Promise} - A promise that resolves with the response data.
 */

export async function GET(url, body, options = {}) {
    return await FETCH(url, body, { ...options, method: 'GET' })
}

export const client = { baseUrl: '', authorization: '', fetcher: fetch }

const { baseUrl, authorization: auth, fetcher, ...others } = client

async function FETCH(url, body,
    {
        method,
        query,
        authorization = client.authorization,
        setLoading,
        setError,
        onResponse,
        onError,
        ...inits
    }) {

    if (baseUrl && !url.startsWith('http')) {
        url = baseUrl + url
    }

    if (typeof query == 'object') {
        url += '?' + Params(query)
    }
    let init = { ...others, headers: {}, method, body, ...inits }

    if (!(body instanceof FormData)) {
        init.body = JSON.stringify(body)
        init.headers['Content-Type'] = 'application/json'
    }

    if (authorization) {
        init.headers.authorization = authorization
    }
    setLoading && setLoading(true)
    let data, res
    try {
        res = await fetcher(url, init)
        data = await res.json()
        data.responseStatus = res.status
        data.responseText = res.statusText
    } catch (error) {
        data = error
    }

    setLoading && setLoading(false)

    if (!res || !res.ok) {
        if (onError) {
            onError(data)
            return
        } else if (setError) {
            setError(data.message)
            return
        } else if (!onResponse) {
            throw data
        }
    }

    if (onResponse) {
        onResponse(data)
    } else {
        return data
    }
}

export function Params(query = {}) {
    const q = Object.entries(query)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    return q
}