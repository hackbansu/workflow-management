import { makeApiRequest } from 'services/base';
import ApiConstants from 'constants/api';

const authApiUrls = ApiConstants.api.auth;

/**
 * Utility function to send the login POST request to the server.
 * @param {string} email - email to send in the login request.
 * @param {string} password - password to send in the login request.
 */
export function makeLoginRequest(email, password) {
    return makeApiRequest(authApiUrls.LOGIN, 'POST', { email, password });
}

/**
 * Utility function to send the logout request to the server.
 */
export function makeLogoutRequest() {
    return makeApiRequest(authApiUrls.LOGOUT, 'DELETE');
}

/**
 * Utility function to send the password reset POST request to the server.
 * @param {string} email - email to send in the login request.
 */
export function makePasswordResetRequest(email) {
    return makeApiRequest(authApiUrls.FORGOT_PASSWORD, 'POST', { email });
}

/**
 * Utility function to send the password reset POST request to the server.
 */
export function makePasswordUpdateRequest(type, token, password = '') {
    if (type === 'GET') {
        return makeApiRequest(`${authApiUrls.UPDATE_PASSWORD}${token}/`, type);
    }
    if (type === 'PATCH') {
        return makeApiRequest(`${authApiUrls.UPDATE_PASSWORD}${token}/`, 'PATCH', { password });
    }
    return null;
}

/**
 * Utility function to send the login POST request to the server.
 * @param {object} data - data to send in the signup request.
 */
export function makeSignupRequest(data) {
    return makeApiRequest(authApiUrls.USER_COMPANY_SIGNUP, 'POST', data);
}

/**
 * Utility function to send the invitation acceptance GET or POST request to the server.
 */
export function makeInviteAcceptRequest(type, token, password = '') {
    if (type === 'GET') {
        return makeApiRequest(`${authApiUrls.ACCEPT_INVITE}${token}/`, type);
    }
    if (type === 'PATCH') {
        return makeApiRequest(`${authApiUrls.ACCEPT_INVITE}${token}/`, type, { password });
    }
    return null;
}
