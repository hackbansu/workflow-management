import { makeApiRequest } from 'services/base';

/**
 * Utility function to send the login POST request to the server.
 * @param {string} email - email to send in the login request.
 * @param {string} password - password to send in the login request.
 */
export function makeLoginRequest(email, password) {
    return makeApiRequest('auth/login/', 'POST', { email, password });
}


/**
 * Utility function to send the logout request to the server.
 */
export function makeLogoutRequest() {
    return makeApiRequest('auth/logout/', 'DELETE');
}


/**
 * Utility function to send the password reset POST request to the server.
 * @param {string} email - email to send in the login request.
 */
export function makePasswordResetRequest(email) {
    return makeApiRequest('auth/request-reset/', 'POST', { email });
}

/**
 * Utility function to send the password reset POST request to the server.
 * @param {string} email - email to send in the login request.
 */
export function makePasswordUpdateRequest(type, token, password = '') {
    if (type === 'GET') {
        return makeApiRequest(`auth/reset-password/${token}/`, type);
    }
    if (type === 'POST') {
        return makeApiRequest(`auth/reset-password/${token}/`, type, { password });
    }
    return null;
}

/**
 * Utility function to send the login POST request to the server.
 * @param {object} data - data to send in the signup request.
 */
export function makeSignupRequest(data) {
    return makeApiRequest('create-company/', 'POST', data);
}
