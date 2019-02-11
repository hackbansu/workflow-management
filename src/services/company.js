import { makeApiRequest } from 'services/base';

/**
 * Utility function to send the company PATCH request to the server.
 * @param {string} address - address to send in the update request.
 * @param {string} city - city to send in the update request.
 * @param {string} state - state to send in the update request.
 * @param {string} links - links to send in the update request.
 */
export function makeUpdateRequest(address, city, state, links, companyId) {
    const data = {
        address,
        city,
        state,
        links,
    };

    return makeApiRequest('update-company/' + companyId.toString() + '/', 'PATCH', data);
}

export function makeFetchRequest() {
    return makeApiRequest('employee/my-company/', 'GET');
}
