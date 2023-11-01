/**
 * @module client
 */

/**
 * @param {string} url - The URL to send the request to.
 * @param {object} body - The body to send the request to.
 * @param {{ query?: object, authorization?: string }} options - Other options for the request.
 * @returns {Promise} - A promise that resolves with the response data.
 */

export async function POST(url, body, options) {
    let ops = options || {}
    ops.method = 'POST'
    return await FETCH(url, body, ops)
}

/**
 * @param {string} url - The URL to send the request to.
 * @param {object} body - The body to send the request to.
 * @param {{ query?: object, authorization?: string }} options - Other options for the request.
 * @returns {Promise} - A promise that resolves with the response data.
 */

export async function PUT(url, body, options) {
    let ops = options || {}
    ops.method = 'PUT'
    return await FETCH(url, body, ops)
}

/**
 * @param {string} url - The URL to send the request to.
 * @param {object} body - The body to send the request to.
 * @param {{ query?: object, authorization?: string }} options - Other options for the request.
 * @returns {Promise} - A promise that resolves with the response data.
 */

export async function DELETE(url, body, options) {
    let ops = options || {}
    ops.method = 'DELETE'
    return await FETCH(url, body, ops)
}

/**
 * @param {string} url - The URL to send the request to.
 * @param {object} body - The body to send the request to.
 * @param {{ query?: object, authorization?: string }} options - Other options for the request.
 * @returns {Promise} - A promise that resolves with the response data.
 */

export async function PATCH(url, body, options) {
    let ops = options || {}
    ops.method = 'PATCH'
    return await FETCH(url, body, ops)
}

/**
 * @param {string} url - The URL to send the request to.
 * @param {object} body - The body to send the request to.
 * @param {{ query?: object, authorization?: string }} options - Other options for the request.
 * @returns {Promise} - A promise that resolves with the response data.
 */

export async function GET(url, body, options = { query, authorization }) {
    let ops = options || {}
    ops.method = 'GET'
    return await FETCH(url, body, ops)
}


/**
 * Configuration object for the fetch operation.
 * @property {Object} fetchConfig - default configs for fetch.
 * @property {string} cache - Should be one of "default", "force-cache", or "no-cache".
 * @property {Object} next - { revalidate: number, tags: [] } Additional properties for the next.
 */
export const fetchConfig = { baseUrl: '', headers: { authorization: '' } }

async function FETCH(url, body, { method, query, authorization }) {

    if (fetchConfig.baseUrl && !url.startsWith('http')) {
        url = fetchConfig.baseUrl + url
    }

    if (typeof query == 'object') {
        url += '?' + Params(query)
    }

    let hs = { 'Content-Type': 'application/json', ...fetchConfig.headers, }

    if (authorization) {
        hs.authorization = authorization
    }

    if (typeof body == 'object') {
        body = JSON.stringify(body)
    } else if (body) {
        body = body
    }

    let options = {}

    if (fetchConfig.cache) {
        options.cache = fetchConfig.cache
    }

    if (fetchConfig.next) {
        options.next = fetchConfig.next
    }

    let res = await fetch(url, { body, method, headers: hs, ...options, })
    let data = await res.json()
    data.responseStatus = res.status
    data.responseText = res.statusText
    if (!res.ok) {
        if (!data.message) {
            data.message = res.statusText
        }
        throw data
    }

    return data
}

export function Params(params = {}) {
    let url = ''
    for (const dat of Object.keys(params)) {
        if (params[dat]) {
            url += "&" + dat + "=" + params[dat]
        }
    }
    return url.slice(1)
}


