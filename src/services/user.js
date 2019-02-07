import { makeApiRequest } from 'services/base';

/**
 * Utility function to send the login POST request to the server.
 * @param {string} email - email to send in the update request.
 * @param {string} password - password to send in the update request.
 * @param {string} firstName - first name to send in the update request.
 * @param {string} lastName - last name to send in the update request.
 */
export function makeUpdateRequest(password, firstName, lastName) {
    const data = {
        first_name: firstName,
        last_name: lastName,
        ...(password.length !== 0 && { password }),
    };

    return makeApiRequest('user/profile/', 'PATCH', data);
}

/**
 * Utility function to fetch user details.
 */
export function makeFetchRequest() {
    return makeApiRequest('user/profile/', 'GET');
}
