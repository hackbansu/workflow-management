import { makeApiRequest } from 'services/base';

/**
 * Utility function to send the fetch employees request to the server.
 */
export function makeFetchRequest() {
    return makeApiRequest('employees/', 'GET');
}

export function makeUpdateRequest(firstName, lastName, profilePhoto, designation, isAdmin, employeeId) {
    const data = {
        user: { first_name: firstName, last_name: lastName },
        designation,
        is_admin: isAdmin,
    };

    return makeApiRequest('employee/' + employeeId + '/', 'PATCH', data);
}

/**
 * Utility function to send the employee removal request.
 */
export function makeRemoveRequest(employeeId) {
    return makeApiRequest('employee/' + employeeId + '/', 'DELETE');
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

    return makeApiRequest('company/invite-employee/', 'POST', data);
}

export function makeCsvInviteRequest(csvFile) {
    const formData = new FormData();
    formData.append('csv_file', csvFile);

    return makeApiRequest('company/invite-employee-csv/', 'POST', formData, null);
}
