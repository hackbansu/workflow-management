import { makeApiRequest } from 'services/base';

/**
 * Utility function to send the fetch employees request to the server.
 */
export function makeFetchRequest() {
    return makeApiRequest('company/employees/', 'GET');
}
