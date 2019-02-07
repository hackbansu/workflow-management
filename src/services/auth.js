import { makeApiRequest } from 'services/base';


const apiUrl = 'https://44d1e408.ngrok.io';

/**
 * Utility function to send the login POST request to the server.
 * @param {string} email - email to send in the login request.
 * @param {string} password - password to send in the login request.
 */
export function makeLoginRequest(email, password) {
    return makeApiRequest(apiUrl + '/api/user/login/', 'POST', { email, password });
}

/**
 * Utility function to send the login POST request to the server.
 * @param {string} email - email to send in the update request.
 * @param {string} password - password to send in the update request.
 * @param {string} firstName - first name to send in the update request.
 * @param {string} lastName - last name to send in the update request.
 */
export function makeUpdateRequest(password, firstName, lastName, userId) {
    const data = {
        first_name: firstName,
        last_name: lastName,
        ...(password.length !== 0 && { password }),
    };

    return makeApiRequest(apiUrl + '/api/user/' + userId + '/', 'PATCH', data);
}

/**
 * Utility function to send the login POST request to the server.
 * @param {object} data - data to send in the signup request.
 */
export function makeSignupRequest(data) {
    console.log('data :', data);
    return makeApiRequest(apiUrl + '/api/company/', 'POST', data);
}

/**
 * Utility function to send the logout request to the server.
 */
export function makeLogoutRequest() {
    return makeApiRequest(apiUrl + '/api/user/logout/', 'DELETE');
}
