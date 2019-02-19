import { makeApiRequest } from 'services/base';
import ApiConstants from 'constants/api';

const employeeApiUrls = ApiConstants.api.employee;

/**
 * Utility function to send the fetch employees request to the server.
 */
export function makeFetchAllRequest() {
    return makeApiRequest(employeeApiUrls.FETCH_ALL, 'GET');
}

export function makeFetchRequest(employeeId) {
    return makeApiRequest(`${employeeApiUrls.FETCH}${employeeId}/`, 'GET');
}

export function makeUpdateRequest(firstName, lastName, profilePhoto, designation, isAdmin, employeeId) {
    const data = {
        user: { first_name: firstName, last_name: lastName },
        designation,
        is_admin: isAdmin,
    };

    return makeApiRequest(employeeApiUrls.UPDATE + employeeId + '/', 'PATCH', data);
}

/**
 * Utility function to send the employee removal request.
 */
export function makeRemoveRequest(employeeId) {
    return makeApiRequest(employeeApiUrls.REMOVE + employeeId + '/', 'DELETE');
}

/**
 * Utility function to send the login POST request to the server.
 * @param {string} email - email to send in the invite request.
 * @param {string} firstName - first name to send in the invite request.
 * @param {string} lastName - last name to send in the invite request.
 * @param {string} designation - designation to send in the invite request.
 */
export function makeInviteRequest(email, firstName, lastName, designation) {
    const data = {
        user: { first_name: firstName, last_name: lastName, email },
        designation,
    };

    return makeApiRequest(employeeApiUrls.INVITE, 'POST', data);
}

export function makeCsvInviteRequest(csvFile) {
    const formData = new FormData();
    formData.append('csv_file', csvFile);

    return makeApiRequest(employeeApiUrls.INVITE_CSV, 'POST', formData, null);
}

export function makeFetchActiveEmployeeRequest() {
    return makeApiRequest(employeeApiUrls.FETCH_ACTIVE, 'GET');
}
