import { makeApiRequest } from 'services/base';

/**
 * Utility function to send the login POST request to the server.
 * @param {string} email - email to send in the update request.
 * @param {string} password - password to send in the update request.
 * @param {string} firstName - first name to send in the update request.
 * @param {string} lastName - last name to send in the update request.
 */
export function makeUpdateRequest(password, firstName, lastName, profilePhoto) {
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);

    if (password.length !== 0) {
        formData.append('password', password);
    }
    if (profilePhoto) {
        formData.append('profile_photo', profilePhoto);
    }

    return makeApiRequest('user/profile/', 'PATCH', formData, null);
}

/**
 * Utility function to fetch user details.
 */
export function makeFetchRequest() {
    return makeApiRequest('user/profile/', 'GET');
}
