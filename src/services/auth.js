import { makeApiRequest } from 'services/base';

/**
 * Utility function to send the login POST request to the server.
 * @param {string} email - email to send in the login request.
 * @param {string} password - password to send in the login request.
 */
export function makeLoginRequest(email, password) {
    return makeApiRequest('user/login/', 'POST', { email, password });
}

/**
 * Utility function to send the password reset POST request to the server.
 * @param {string} email - email to send in the login request.
 */
export function makePasswordResetRequest(email) {
    return makeApiRequest('user/request-reset/', 'POST', { email });
}

/**
 * Utility function to send the login POST request to the server.
 * @param {object} data - data to send in the signup request.
 */
export function makeSignupRequest(data) {
    console.log('data :', data);
    return makeApiRequest('company/', 'POST', data);
}

/**
 * Utility function to send the logout request to the server.
 */
export function makeLogoutRequest() {
    return makeApiRequest('user/logout/', 'DELETE');
}
