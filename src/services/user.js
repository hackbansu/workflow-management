import { makeApiRequest } from 'services/base';
import ApiConstants from 'constants/api';

const userApiUrls = ApiConstants.api.user;

/**
 * Utility function to send the login POST request to the server.
 * @param {string} email - email to send in the update request.
 * @param {string} password - password to send in the update request.
 * @param {string} firstName - first name to send in the update request.
 * @param {string} lastName - last name to send in the update request.
 */
export function makeUpdateRequest(firstName, lastName, profilePhoto) {
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);

    if (profilePhoto) {
        formData.append('profile_photo', profilePhoto);
    }

    return makeApiRequest(userApiUrls.UPDATE, 'PATCH', formData, null);
}

/**
 * @function makeFetchRequest {fetch user}
 * @return {type} {promist of fetch request}
 */
export function makeFetchRequest() {
    return makeApiRequest(userApiUrls.FETCH, 'GET');
}

/**
 * @function makeCreateCompanyRequest {create company for the user}
 * @param  {type} data {data to sent the request}
 * @return {type} {promist of fetch request}
 */
export function makeCreateCompanyRequest(data) {
    return makeApiRequest(userApiUrls.CREATE_COMPANY, 'POST', data);
}
